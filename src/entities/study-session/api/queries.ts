import "server-only"
import { cache } from "react"
import { auth } from "@/auth"
import { prisma } from "@/shared/server/db/prisma"
import { getLocalDateKey } from "@/shared/server/lib/timezone"

export type ActivityDay = { date: string; count: number }

const getUserWithTimezone = cache(async () => {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return null

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { timezone: true },
  })
  return { userId, timezone: user?.timezone ?? "UTC" }
})

export const getRecentStudiedDecks = cache(async (limit = 3) => {
  const session = await auth()
  if (!session?.user?.id) return []

  const sessions = await prisma.studySession.findMany({
    where: { userId: session.user.id },
    orderBy: { completedAt: "desc" },
    take: 20,
    include: {
      deck: { include: { _count: { select: { cards: true } } } },
    },
  })

  const seen = new Set<string>()
  const result: (typeof sessions)[number]["deck"] extends infer D
    ? Array<{ deck: D; lastStudiedAt: Date }>
    : never = []

  for (const s of sessions) {
    if (seen.has(s.deckId)) continue
    seen.add(s.deckId)
    result.push({ deck: s.deck, lastStudiedAt: s.completedAt })
    if (result.length >= limit) break
  }

  return result
})

export const getLearnedWordsCount = cache(async () => {
  const session = await auth()
  if (!session?.user?.id) return 0

  return prisma.cardProgress.count({
    where: { userId: session.user.id, interval: { gt: 21 } },
  })
})

export const getStreak = cache(async () => {
  const ctx = await getUserWithTimezone()
  if (!ctx) return 0

  const since = new Date()
  since.setUTCDate(since.getUTCDate() - 400)

  const sessions = await prisma.studySession.findMany({
    where: { userId: ctx.userId, completedAt: { gte: since } },
    select: { completedAt: true },
  })

  return computeStreak(
    sessions.map((s) => s.completedAt),
    ctx.timezone
  )
})

function computeStreak(dates: Date[], timezone: string): number {
  const days = new Set(dates.map((d) => getLocalDateKey(d, timezone)))

  let streak = 0
  const cursor = new Date()

  if (!days.has(getLocalDateKey(cursor, timezone))) {
    cursor.setUTCDate(cursor.getUTCDate() - 1)
  }

  while (days.has(getLocalDateKey(cursor, timezone))) {
    streak++
    cursor.setUTCDate(cursor.getUTCDate() - 1)
  }

  return streak
}

export const getActivity = cache(async (days = 182): Promise<ActivityDay[]> => {
  const ctx = await getUserWithTimezone()
  if (!ctx) return []

  const since = new Date()
  since.setUTCDate(since.getUTCDate() - days - 1)

  const sessions = await prisma.studySession.findMany({
    where: { userId: ctx.userId, completedAt: { gte: since } },
    select: { completedAt: true },
  })

  const counts = new Map<string, number>()
  for (const s of sessions) {
    const key = getLocalDateKey(s.completedAt, ctx.timezone)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }

  const result: ActivityDay[] = []
  const cursor = new Date()
  for (let i = 0; i < days; i++) {
    const key = getLocalDateKey(cursor, ctx.timezone)
    result.push({ date: key, count: counts.get(key) ?? 0 })
    cursor.setUTCDate(cursor.getUTCDate() - 1)
  }

  return result.reverse()
})