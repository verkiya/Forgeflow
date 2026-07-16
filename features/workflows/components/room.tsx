"use client"

import { ReactNode } from "react"
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense"

import Loading from "@/app/(dashboard)/workflows/[id]/loading"

export function Room({
  children,
  roomId,
}: {
  roomId: string
  children: ReactNode
}) {
  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint="/api/liveblocks/auth"
      resolveUsers={async ({ userIds }) => {
        try {
          const response = await fetch("/api/liveblocks/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userIds }),
          })

          if (!response.ok) {
            throw new Error("Failed to resolve users")
          }

          return await response.json()
        } catch (error) {
          console.error(error)
          return undefined
        }
      }}
    >
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<Loading />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
