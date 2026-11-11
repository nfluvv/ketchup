// "use server"

// import { revalidatePath } from "next/cache"

// import { auth } from "@/auth"
// import { prisma } from "@/shared/server/db/prisma"

// type TogglePremiumResult =
//   | { success: true }
//   | { success: false; error: string }

// export const togglePremium = async (
//   userId: string,
//   isPremium: boolean
// ): Promise<TogglePremiumResult> => {
//   const session = await auth()
//   if (!session?.user?.id) {
//     return { success: false, error: "Unauthorized" }
//   }

//   const caller = await prisma.user.findUnique({
//     where: { id: session.user.id },
//     select: { role: true },
//   })
//   if (caller?.role !== "ADMIN") {
//     return { success: false, error: "Insufficient permissions" }
//   }

//   const target = await prisma.user.findUnique({
//     where: { id: userId },
//     select: { isPremium: true },
//   })
//   if (!target) {
//     return { success: false, error: "User not found" }
//   }

//   if (target.isPremium === isPremium) {
//     return { success: false, error: "Value is already set" }
//   }

//   await prisma.user.update({
//     where: { id: userId },
//     data: { isPremium },
//   })

//   revalidatePath("/admin")

//   return { success: true }
// }