import type { Deck } from "@prisma/client"

export type RecentStudiedDeck = {
  deck: Deck
  lastStudiedAt: Date
}

export type ActivityDay = { date: string; count: number }