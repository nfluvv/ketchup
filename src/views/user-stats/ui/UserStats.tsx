import { getCurrentUser } from "@/entities/user/api/queries"
import { getTranslations } from "next-intl/server"
import { Container, SettingsGroup } from "@/shared/client/ui"
import { Streak } from "@/widgets/streak-widget"
import { Learnt } from '@/widgets/learnt-widget'
import { AuthGate } from "@/features/telegram-auth"
import { Activity } from "@/widgets/activity-widget"

export async function UserStatsView() {
  const profile = await getCurrentUser()
  const t = await getTranslations("profile")

  if (!profile) return <AuthGate />

  return (
    <main>
      <Container>
        <div className="mt-8 flex flex-col gap-8">
          <SettingsGroup title={t("stats")}>
            <Streak />
            <Learnt />
            <Activity />
          </SettingsGroup>
        </div>
      </Container>
    </main>
  )
}
