import { getUserDecks } from "@/entities/deck/api/queries"
import { getRecentStudiedDecks } from "@/entities/study-session/api/queries"

import { getCurrentUser } from "@/entities/user/api/queries"

import { Container } from "@/shared/client/ui"

import { DashboardHeader } from "@/widgets/dashboard-header"
import { RecentStudiedDecks } from "@/widgets/recent-studied-decks"
import { DashboardSidebar } from "@/widgets/dashboard-sidebar/ui/DashboardSidebar"
import { MyDecks } from "@/widgets/my-decks"
import { AuthGate } from "@/features/telegram-auth"
import { isPremium } from "@/entities/user/lib/is-premium"

interface DashboardProps {
  searchParams: Promise<{
    query?: string
    filter?: string
    savedQuery?: string
    savedPage?: string
  }>
}

export async function DashboardView({ searchParams }: DashboardProps) {
  const { query = "", filter = "all" } = await searchParams

  const [decks, recentStudied, user] = await Promise.all([
    getUserDecks(),
    getRecentStudiedDecks(),
    getCurrentUser(),
  ])

  if (!user) return <AuthGate />

  const currentDecksCount = decks?.length ?? 0

  return (
    <main className="bg-background text-foreground">
      <Container className="py-4">
        <DashboardHeader />

        <RecentStudiedDecks items={recentStudied} />

        <section>
          <MyDecks
            currentDecksCount={currentDecksCount}
            filter={filter}
            query={query}
            decks={decks ?? []}
          />

          <DashboardSidebar
            currentDecksCount={currentDecksCount}
            isPremium={isPremium(user)}
          />
        </section>
      </Container>
    </main>
  )
}
