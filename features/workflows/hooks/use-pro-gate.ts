"use client"

import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export function useProGate() {
  const { has, isLoaded } = useAuth()
  const router = useRouter()

  // For orgs, it's typically checking the plan: 'pro' (since we enabled it for orgs)
  // has() evaluates the active entity (user or org)
  const isPro = isLoaded ? has?.({ plan: "pro" }) : false

  const upgrade = () => {
    router.push("/pricing")
  }

  return {
    isPro,
    isLoaded,
    upgrade,
  }
}
