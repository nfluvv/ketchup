import "server-only"
import { cache } from "react"
import { auth } from "@/auth"
import { prisma } from "@/shared/server/db/prisma"
import { getLocalDateKey } from "@/shared/server/lib/timezone"

export type ActivityDay = { date: string; count: number }

export const getActivity = cache(async (days = 182): Promise<ActivityDay[]> => {
  const session = await auth()
  if (!session?.user?.id) return []

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { timezone: true },
  })
  const timezone = user?.timezone ?? "UTC"

  const since = new Date()
  since.setUTCDate(since.getUTCDate() - days - 1)

  const sessions = await prisma.studySession.findMany({
    where: { userId: session.user.id, completedAt: { gte: since } },
    select: { completedAt: true },
  })

  const counts = new Map<string, number>()
  for (const s of sessions) {
    const key = getLocalDateKey(s.completedAt, timezone)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }

  const result: ActivityDay[] = []
  const cursor = new Date()
  for (let i = 0; i < days; i++) {
    const key = getLocalDateKey(cursor, timezone)
    result.push({ date: key, count: counts.get(key) ?? 0 })
    cursor.setUTCDate(cursor.getUTCDate() - 1)
  }

  return result.reverse()
})