import { cn } from "@/shared/client/lib/utils"

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-md px-4 text-foreground",
        className
      )}
    >
      {children}
    </div>
  )
}