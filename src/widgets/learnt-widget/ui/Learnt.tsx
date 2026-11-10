import { getLearnedWordsCount } from "@/entities/study-session/api/queries"
import { getTranslations } from "next-intl/server"
import { SettingsRow } from "@/shared/client/ui"
import { Brain } from "lucide-react"

export async function Learnt() {
  const learnedWordsCount = await getLearnedWordsCount()
  const t = await getTranslations("profile")

  return (
    <div className="flex items-center justify-between">
      <SettingsRow
        icon={<Brain className="size-5" />}
        label={t("learnedWords")}
        showChevron={false}
      >
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold tracking-tight">{learnedWordsCount}</span>
        </p>
      </SettingsRow>
    </div>
  )
}
