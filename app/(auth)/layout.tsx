import { Workflow } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="bg-muted relative hidden flex-col justify-between border-r p-10 md:flex">
        <div className="relative z-20 flex items-center gap-2 text-lg font-bold">
          <Workflow className="text-primary size-6" />
          <span>ForgeFlow</span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "ForgeFlow has completely transformed how our team automates browser tasks. The visual builder is intuitive and incredibly powerful."
            </p>
            <footer className="text-sm">Sofia Davis, Lead Engineer</footer>
          </blockquote>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-muted/50" />
      </div>
      <div className="flex items-center justify-center p-8">
        {children}
      </div>
    </div>
  )
}
