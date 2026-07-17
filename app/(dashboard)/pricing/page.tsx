import { PricingTable } from "@clerk/nextjs"

export default function PricingPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8 bg-background">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Upgrade to Pro</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Unlock premium features like the Agent node and more.
        </p>
      </div>
      <div className="w-full max-w-5xl">
        <PricingTable for="organization" />
      </div>
    </div>
  )
}
