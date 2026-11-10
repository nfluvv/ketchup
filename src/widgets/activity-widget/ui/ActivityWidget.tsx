import { getLocale, getTranslations } from "next-intl/server"
import { ActivityHeatmap } from "@/entities/study-session"
import { getActivity } from "@/entities/study-session/api/queries"

export const Activity = async () => {
  const [activity, t, locale] = await Promise.all([
    getActivity(),
    getTranslations("activity"),
    getLocale(),
  ])

  const totalSessions = activity.reduce((sum, d) => sum + d.count, 0)
  const activeDays = activity.filter((d) => d.count > 0).length

  return (
    <section className="flex flex-col gap-4 bg-card p-4">
      <header className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold leading-none">{t("title")}</h2>
          <p className="text-xs text-muted-foreground">{t("period")}</p>
        </div>

        <dl className="flex gap-4 text-right">
          <div>
            <dt className="text-[11px] text-muted-foreground">{t("sessions")}</dt>
            <dd className="text-lg font-semibold leading-tight tabular-nums">
              {totalSessions}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] text-muted-foreground">{t("activeDays")}</dt>
            <dd className="text-lg font-semibold leading-tight tabular-nums">
              {activeDays}
            </dd>
          </div>
        </dl>
      </header>

      <ActivityHeatmap
        days={activity}
        locale={locale}
        labels={{
          less: t("less"),
          more: t("more"),
          title: (d) => `${d.date}: ${t("sessionsCount", { count: d.count })}`,
        }}
      />
    </section>
  )
}