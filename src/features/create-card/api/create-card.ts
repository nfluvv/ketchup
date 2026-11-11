"use server"

import { prisma } from "@/shared/server/db/prisma"
import { getCurrentUser } from "@/entities/user/api/queries"
import { getCardsLimit } from "@/shared/config/decks"
import { createCardSchema, type CreateCardInput } from "../model/schema"
import { isPremium } from "@/entities/user/lib/is-premium"

export async function createCardAction(rawInput: CreateCardInput) {
  const user = await getCurrentUser()
  if (!user) return { success: false as const, error: "unauthorized" }

  const parsed = createCardSchema.safeParse(rawInput)
  if (!parsed.success) return { success: false as const, error: "invalidInput" }

  const { deckId, term, definition } = parsed.data

  const deck = await prisma.deck.findFirst({
    where: { id: deckId, userId: user.id },
    select: { _count: { select: { cards: true } } },
  })
  if (!deck) return { success: false as const, error: "notFound" }

  if (deck._count.cards >= getCardsLimit(isPremium(user))) {
    return { success: false as const, error: "cardsLimitReached" }
  }

  const card = await prisma.card.create({ data: { deckId, term, definition } })
  return { success: true as const, card }
}
