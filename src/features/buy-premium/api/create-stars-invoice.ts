"use server"

import { auth } from "@/auth"
import { prisma } from "@/shared/server/db/prisma"
import { tgApi } from "@/shared/server/telegram/bot-api"
import { PRODUCTS, type ProductId } from "@/entities/order/config/products"

export async function createStarsInvoice(productId: ProductId) {
  const session = await auth()
  if (!session?.user?.id)
    return { success: false as const, error: "unauthorized" }

  const product = PRODUCTS[productId]
  if (!product) return { success: false as const, error: "invalidProduct" }

  const order = await prisma.order.create({
    data: { userId: session.user.id, productId, stars: product.stars },
  })

  const url = await tgApi<string>("createInvoiceLink", {
    title: product.title,
    description: product.description,
    payload: order.id,
    currency: "XTR",
    prices: [{ label: product.title, amount: product.stars }],
  })

  return { success: true as const, url, orderId: order.id }
}