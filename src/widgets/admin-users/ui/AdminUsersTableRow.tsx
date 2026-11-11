import Link from "next/link"

// import { PremiumToggle } from "@/features/toggle-premium"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  TableCell,
  TableRow,
} from "@/shared/client/ui"

import type { AdminUsersResponse } from "../api/use-admin-users-query"

type AdminUsersTableRowProps = {
  user: AdminUsersResponse["users"][number]
  onPremiumChangeSuccess: () => void
}

export function AdminUsersTableRow({
  user,
  onPremiumChangeSuccess,
}: AdminUsersTableRowProps) {
  const label = user.name ?? user.username ?? String(user.telegramId)
  const initial = label.charAt(0).toUpperCase()

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src={user.image ?? undefined} alt={user.name ?? ""} />

            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>

          {user.username ? (
            <Link
              href={`/u/${user.username}/decks`}
              className="font-medium hover:underline"
            >
              {user.name ?? user.username}
            </Link>
          ) : (
            <span className="font-medium">{user.name ?? "—"}</span>
          )}
        </div>
      </TableCell>

      <TableCell className="font-mono text-xs text-muted-foreground">
        {user.username}
      </TableCell>

      <TableCell className="font-mono text-xs text-muted-foreground">
        {user.telegramId}
      </TableCell>
{/* 
      <TableCell>
        <PremiumToggle
          userId={user.id}
          userLabel={label}
          isPremium={user.isPremium}
          onSuccess={onPremiumChangeSuccess}
        />
      </TableCell> */}
    </TableRow>
  )
}