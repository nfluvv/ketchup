import type { Order, Prisma } from "@prisma/client"

type Fulfill = (tx: Prisma.TransactionClient, order: Order) => Promise<void>

const grantPremium =
  (days: number): Fulfill =>
  async (tx, order) => {
    const user = await tx.user.findUniqueOrThrow({
      where: { id: order.userId },
      select: { premiumUntil: true },
    })

    const now = new Date()
    const base =
      user.premiumUntil && user.premiumUntil > now ? user.premiumUntil : now

    await tx.user.update({
      where: { id: order.userId },
      data: { premiumUntil: new Date(base.getTime() + days * 86_400_000) },
    })
  }

export const PRODUCTS = {
  premium_month: {
    title: "1 month Premium",
    description: "30 days of unlimited decks, smart import and stats",
    stars: 149,
    fulfill: grantPremium(30),
  },
  premium_year: {
    title: "1 year Premium",
    description: "365 days of full Ketchup+ access (save 72%)",
    stars: 499,
    fulfill: grantPremium(365),
  },
  premium_lifetime: {
    title: "Lifetime Premium",
    description: "Permanent access to all Ketchup+ features forever",
    stars: 799,
    fulfill: grantPremium(36500),
  },
} satisfies Record<
  string,
  { title: string; description: string; stars: number; fulfill: Fulfill }
>


export type ProductId = keyof typeof PRODUCTS