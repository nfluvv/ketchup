// hardcode

import { Container } from "@/shared/client/ui"
import { PaywallPlans } from "./PaywallPlans"
import { Check, Sparkles } from "lucide-react"

const FEATURES = [
  "До 100 колод и 100 карточек в каждой",
  "Умный текстовый импорт и экспорт колод",
  "Расширенная аналитика и поиск слабых слов",
  "Приоритетный доступ к новым режимам",
]

export async function PaywallView() {
  return (
    <main className="pb-12">
      <Container>
        <div className="mt-8 flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-medium text-purple-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ketchup+</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Прокачай свой словарный запас на максимум
            </h1>
            <p className="text-sm text-zinc-400 max-w-xs">
              Сними все ограничения и используй приложение как полноценный инструмент для языка.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5 flex flex-col gap-3.5">
            {FEATURES.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm text-zinc-200 leading-snug">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <PaywallPlans />
        </div>
      </Container>
    </main>
  )
}
