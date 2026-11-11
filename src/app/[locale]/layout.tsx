import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"

import { AppProviders } from "@/app/providers"
import { Navigation } from "@/widgets/navigation"
import { routing } from "@/shared/i18n/routing"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <AppProviders>
        <div className="flex min-h-dvh flex-col">
          <div className="flex flex-1 flex-col">{children}</div>
          <Navigation />
        </div>
      </AppProviders>
    </NextIntlClientProvider>
  )
}
