"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/shared/server/db/prisma"
import { getCurrentUser } from "@/entities/user/api/queries"
import { getCardsLimit, getDecksLimit } from "@/shared/config/decks"
import { isPremium } from "@/entities/user/lib/is-premium"

export async function cloneDeck(sourceDeckId: string) {
  const user = await getCurrentUser()
  if (!user) return { success: false as const, error: "unauthorized" }

  const decksCount = await prisma.deck.count({ where: { userId: user.id } })
  if (decksCount >= getDecksLimit(isPremium(user))) {
    return { success: false as const, error: "decksLimitReached" }
  }

  const source = await prisma.deck.findFirst({
    where: {
      id: sourceDeckId,
      OR: [{ status: "PUBLIC" }, { userId: user.id }],
    },
    select: {
      title: true,
      description: true,
      cards: { select: { term: true, definition: true } },
    },
  })
  if (!source) return { success: false as const, error: "deckNotFound" }

  if (source.cards.length > getCardsLimit(isPremium(user))) {
    return { success: false as const, error: "cardsLimitReached" }
  }

  const deck = await prisma.deck.create({
    data: {
      title: source.title,
      description: source.description,
      status: "PRIVATE",
      userId: user.id,
      cards: { create: source.cards },
    },
    select: { id: true },
  })

  revalidatePath("/[locale]", "page")
  return { success: true as const, deck }
}