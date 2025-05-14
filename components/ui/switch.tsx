"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
        ref={ref}
        {...props}
        className={cn(
            // 트랙
            "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border transition-colors",
            // 상태별 배경색
            "data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-300",
            // 포커스
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
            // 비활성화
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
    >
      <SwitchPrimitives.Thumb
          className={cn(
              // 원형 thumb
              "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-md ring-0 transition-transform",
              // 상태별 위치
              "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1"
          )}
      />
    </SwitchPrimitives.Root>
))

Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
