import { notFound } from "next/navigation"
import { getOwnedDeckById } from "@/entities/deck/api/queries"
import { EditDeckView } from "@/views/edit-deck-view"
import { getCurrentUser } from "@/entities/user/api/queries"
import { getCardsLimit } from "@/shared/config/decks"
import { isPremium } from "@/entities/user/lib/is-premium"

type Props = {
  params: Promise<{ locale: string; id: string }>
}

export default async function EditDeckPage({ params }: Props) {
  const { id } = await params
  const deck = await getOwnedDeckById(id)

  if (!deck) notFound()

  const currentUser = await getCurrentUser()
  if (currentUser?.id !== deck.userId) notFound()

  return (
    <EditDeckView
      initialDeck={deck}
      cardsLimit={getCardsLimit(isPremium(currentUser))}
    />
  )
}
