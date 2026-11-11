"use client"

import { useLayoutEffect, useRef } from "react"

export function ScrollToEnd({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (el) el.scrollLeft = el.scrollWidth
  }, [])

  return (
    <div ref={ref} className="min-w-0 flex-1 overflow-x-auto pb-1">
      {children}
    </div>
  )
}