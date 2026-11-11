// "use client"

// import { useState } from "react"
// import { useMutation } from "@tanstack/react-query"
// import { toast } from "react-hot-toast"
// import { useTranslations } from "next-intl"

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   Switch,
// } from "@/shared/client/ui"

// import { togglePremium } from "../api/toggle-premium"

// type PremiumToggleProps = {
//   userId: string
//   userLabel: string
//   isPremium: boolean
//   disabled?: boolean
//   onSuccess?: () => void
// }

// export const PremiumToggle = ({
//   userId,
//   userLabel,
//   isPremium,
//   disabled,
//   onSuccess,
// }: PremiumToggleProps) => {
//   const t = useTranslations("premiumToggle")
//   const tCommon = useTranslations("common")
//   const [checked, setChecked] = useState(isPremium)
//   const [confirmRevoke, setConfirmRevoke] = useState(false)
  
//   const mutation = useMutation({
//     mutationFn: (next: boolean) => togglePremium(userId, next),
//     onMutate: (next) => {
//       setChecked(next)
//     },
//     onSuccess: (result, next) => {
//       if (!result.success) {
//         setChecked(!next)
//         toast.error(result.error)
//         return
//       }
//       toast.success(t(next ? "granted" : "revoked"))
//       onSuccess?.()
//     },
//     onError: (_error, next) => {
//       setChecked(!next)
//       toast.error(tCommon("error"))
//     },
//   })

//   const handleChange = (next: boolean) => {
//     if (!next) {
//       setConfirmRevoke(true)
//       return
//     }
//     mutation.mutate(true)
//   }

//   return (
//     <>
//       <Switch
//         checked={checked}
//         onCheckedChange={handleChange}
//         disabled={disabled || mutation.isPending}
//         aria-label={t("label", { userLabel })}
//       />

//       <AlertDialog open={confirmRevoke} onOpenChange={setConfirmRevoke}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>{t("confirmTitle")}</AlertDialogTitle>
//             <AlertDialogDescription>
//               {t("confirmDescription", { userLabel })}
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>{tCommon("cancel")}</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={() => {
//                 mutation.mutate(false)
//                 setConfirmRevoke(false)
//               }}
//             >
//               {t("revokeAccess")}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   )
// }