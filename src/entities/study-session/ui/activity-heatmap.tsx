import type { ActivityDay } from "../api/queries"

const LEVELS = [
  "bg-muted",
  "bg-primary/25",
  "bg-primary/50",
  "bg-primary/75",
  "bg-primary",
]

function getLevel(count: number) {
  if (count === 0) return 0
  if (count === 1) return 1
  if (count === 2) return 2
  if (count <= 4) return 3
  return 4
}

type Props = {
  days: ActivityDay[]
  locale: string
  labels: {
    less: string
    more: string
    title: (day: ActivityDay) => string
  }
}

export function ActivityHeatmap({ days, locale, labels }: Props) {
  if (days.length === 0) return null
  const offset = (new Date(`${days[0].date}T00:00:00Z`).getUTCDay() + 6) % 7
  const weeksCount = Math.ceil((days.length + offset) / 7)

  const monthFmt = new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" })
  const monthLabels: { col: number; text: string }[] = []
  let prevMonth = -1
  for (let w = 0; w < weeksCount; w++) {
    const day = days[Math.max(w * 7, offset) - offset]
    if (!day) continue
    const month = Number(day.date.slice(5, 7))
    if (month === prevMonth) continue
    prevMonth = month

    const last = monthLabels[monthLabels.length - 1]
    if (last && w - last.col < 3) monthLabels.pop()

    monthLabels.push({
      col: w,
      text: monthFmt.format(new Date(`${day.date}T00:00:00Z`)),
    })
  }

  const weekdayFmt = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" })
  const weekdayLabels = [0, 2, 4].map((i) => ({
    row: i,
    text: weekdayFmt.format(new Date(Date.UTC(2024, 0, 1 + i))),
  }))

  return (
    <div className="flex flex-col gap-3">
      <div
        className="grid gap-0.75"
        style={{
          gridTemplateColumns: `auto repeat(${weeksCount}, minmax(0, 1fr))`,
        }}
      >
        {monthLabels.map((m) => (
          <div
            key={`m-${m.col}`}
            className="mb-0.5 whitespace-nowrap text-[10px] leading-none text-muted-foreground"
            style={{ gridRow: 1, gridColumn: m.col + 2 }}
          >
            {m.text}
          </div>
        ))}

        {weekdayLabels.map((w) => (
          <div
            key={`w-${w.row}`}
            className="flex items-center pr-1.5 text-[10px] leading-none text-muted-foreground"
            style={{ gridRow: w.row + 2, gridColumn: 1 }}
          >
            {w.text}
          </div>
        ))}

        {days.map((d, i) => {
          const idx = i + offset
          return (
            <div
              key={d.date}
              title={labels.title(d)}
              className={`aspect-square rounded-[3px] ${LEVELS[getLevel(d.count)]}`}
              style={{
                gridRow: (idx % 7) + 2,
                gridColumn: Math.floor(idx / 7) + 2,
              }}
            />
          )
        })}
      </div>

      <div className="flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
        <span>{labels.less}</span>
        {LEVELS.map((cls) => (
          <div key={cls} className={`size-2.5 rounded-[3px] ${cls}`} />
        ))}
        <span>{labels.more}</span>
      </div>
    </div>
  )
}