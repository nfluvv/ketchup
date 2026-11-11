import { useTranslations } from "next-intl"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/client/ui"

import type { AdminUsersResponse } from "../api/use-admin-users-query"

import { AdminUsersTableRow } from "./AdminUsersTableRow"

type AdminUsersTableProps = {
  users: AdminUsersResponse["users"]
  isPending: boolean
  onPremiumChangeSuccess: () => void
}

export function AdminUsersTable({
  users,
  isPending,
  onPremiumChangeSuccess,
}: AdminUsersTableProps) {
  const t = useTranslations("adminUsers")

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("columnUser")}</TableHead>
          <TableHead>{t("columnUsername")}</TableHead>
          <TableHead>{t("columnTelegramId")}</TableHead>
          {/* <TableHead>{t("columnPremium")}</TableHead> */}
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={3}
              className="h-24 text-center text-sm text-muted-foreground"
            >
              {isPending ? t("loading") : t("empty")}
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <AdminUsersTableRow
              key={user.id}
              user={user}
              onPremiumChangeSuccess={onPremiumChangeSuccess}
            />
          ))
        )}
      </TableBody>
    </Table>
  )
}
