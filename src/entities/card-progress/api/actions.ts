"use server"

import { auth } from "@/auth"
import { prisma } from "@/shared/server/db/prisma"
import { calculateNextReview, addDays, type Quality } from "../lib/sm2"

export async function reviewCardAction(cardId: string, quality: Quality) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")
  const userId = session.user.id

  const card = await prisma.card.findFirst({
    where: {
      id: cardId,
      deck: { OR: [{ userId }, { status: "PUBLIC" }] },
    },
    select: { id: true },
  })
  if (!card) throw new Error("Forbidden")

  const existing = await prisma.cardProgress.findUnique({
    where: { userId_cardId: { userId, cardId } },
  })

  const currentState = existing
    ? {
        easeFactor: existing.easeFactor,
        interval: existing.interval,
        repetitions: existing.repetitions,
      }
    : { easeFactor: 2.5, interval: 0, repetitions: 0 }

  const nextState = calculateNextReview(currentState, quality)
  const now = new Date()
  const dueDate = addDays(now, nextState.interval)

  const [progress] = await prisma.$transaction([
    prisma.cardProgress.upsert({
      where: { userId_cardId: { userId, cardId } },
      create: {
        userId,
        cardId,
        ...nextState,
        dueDate,
        lastReviewedAt: now,
      },
      update: {
        ...nextState,
        dueDate,
        lastReviewedAt: now,
      },
    }),
    prisma.reviewLog.create({
      data: { userId, cardId, quality, reviewedAt: now },
    }),
  ])

  return progress
}
