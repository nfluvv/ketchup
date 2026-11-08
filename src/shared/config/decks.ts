export const MAX_CARDS_PER_DECK = 30
export const MAX_CARDS_PER_DECK_PREMIUM = 100

export const DECKS_LIMIT = 3
export const DECKS_LIMIT_PREMIUM = 100

export const getDecksLimit = (isPremium: boolean) =>
  isPremium ? DECKS_LIMIT_PREMIUM : DECKS_LIMIT
export const getCardsLimit = (isPremium: boolean) =>
  isPremium ? MAX_CARDS_PER_DECK_PREMIUM : MAX_CARDS_PER_DECK
