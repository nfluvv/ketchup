// hardcode

"use client"

import { useState, useTransition } from "react"
import { Star } from "lucide-react"

type PlanId = "1m" | "1y" | "lifetime"

interface Plan {
  id: PlanId
  title: string
  subtitle: string
  stars: number
  badge?: string
}

const PLANS: Plan[] = [
  {
    id: "1m",
    title: "1 месяц",
    subtitle: "Попробовать безлимит",
    stars: 79,
  },
  {
    id: "1y",
    title: "1 год",
    subtitle: "Оптимально для учебы",
    stars: 199,
  },
  {
    id: "lifetime",
    title: "Навсегда",
    subtitle: "Плати один раз",
    stars: 249,
    badge: "Выбор 80%",
  },
]

export function PaywallPlans() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("lifetime")
  const [isPending, startTransition] = useTransition()

  const activePlan = PLANS.find((p) => p.id === selectedPlan)!

  const handleBuy = () => {
    startTransition(async () => {
      console.log("Покупка тарифа:", selectedPlan)
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        {PLANS.map((plan) => {
          const isSelected = plan.id === selectedPlan

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                isSelected
                  ? "border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                  : "border-white/10 bg-zinc-900/40 hover:border-white/20"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-2.5 right-4 rounded-full bg-purple-600 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  {plan.badge}
                </span>
              )}

              <div>
                <div className="font-semibold text-white">{plan.title}</div>
                <div className="text-xs text-zinc-400 mt-0.5">{plan.subtitle}</div>
              </div>

              <div className="flex items-center gap-1 font-bold text-white">
                <span>{plan.stars}</span>
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              </div>
            </button>
          )
        })}
      </div>

      <button
        type="button"
        disabled={isPending}
        onClick={handleBuy}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3.5 px-4 font-semibold text-white transition-all hover:bg-purple-500 active:scale-[0.98] disabled:opacity-50"
      >
        <span>
          {isPending ? "Создаем счет..." : `Оплатить ${activePlan.stars}`}
        </span>
        {!isPending && <Star className="h-4 w-4 fill-white text-white" />}
      </button>
    </div>
  )
}
