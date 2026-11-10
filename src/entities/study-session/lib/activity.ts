import { getLocalDateKey } from "@/shared/server/lib/timezone"
import type { ActivityDay } from "../model/types"

export function buildActivityDays(
  dates: Date[],
  timezone: string,
  days: number
): ActivityDay[] {
  const counts = new Map<string, number>()
  for (const d of dates) {
    const key = getLocalDateKey(d, timezone)
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
}