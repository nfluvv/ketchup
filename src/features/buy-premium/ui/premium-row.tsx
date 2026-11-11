"use client"

import { useState } from "react"
import { Crown } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { useFormatter, useTranslations } from "next-intl"

import { SettingsRow } from "@/shared/client/ui"

import { createStarsInvoice } from "../api/create-stars-invoice"

type PremiumRowProps = {
  premiumUntil: Date | string | null
  active: boolean
}

export function PremiumRow({ premiumUntil, active }: PremiumRowProps) {
  const t = useTranslations("profile")
  const format = useFormatter()
  const router = useRouter()

  const until = premiumUntil ? new Date(premiumUntil) : null

  const handleClick = async () => {
    const tg = window.Telegram?.WebApp
    if (!tg) return toast.error(t("openInTelegram"))

    const res = await createStarsInvoice("premium_month")
    if (!res.success) {
      return toast.error(res.error)
    }

    tg.openInvoice(res.url, (status) => {
      if (status === "paid") {
        toast.success(t("premiumActivated"))
        ;[500, 2000, 5000].forEach((ms) =>
          setTimeout(() => router.refresh(), ms)
        )
      } else if (status === "failed") {
        toast.error(t("paymentFailed"))
      }
    })
  }

  return (
    <SettingsRow
      icon={<Crown className="size-5" />}
      label={t("subscription")}
      value={
        active && until ? (
          <span className="text-amber-500">
            {t("statusPremium", {
              date: format.dateTime(until, {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })
            })}
          </span>
        ) : (
          t("statusFree")
        )
      }
      onClick={handleClick}
    />
  )
}