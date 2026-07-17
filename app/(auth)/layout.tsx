import { Button } from "@/components/ui/button"
import { MousePointer2, Bot, Cpu, Users, BookOpen } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[65%_35%]">
      {/* Left Panel - Product Info (Hidden on small screens) */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-zinc-950 p-12 text-zinc-50 lg:flex">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_110%)]" />


        {/* Top Header */}
        <div className="relative z-20 flex items-center gap-3 text-6xl font-bold tracking-tight">

            <img src="/forgeflow.svg" alt="ForgeFlow" className="size-18 object-contain" />

          <span className="-ml-4!">orgeFlow</span>
        </div>

        {/* Center Content */}
        <div className="relative z-20 flex flex-col gap-10">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">
              A collaborative visual workflow builder for browser automation.
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl">
              Compose browser automation steps on a shared canvas, run them durably in the background, and seamlessly integrate AI agents.
            </p>
          </div>

          {/* Features Bento Grid */}
          <div className="grid grid-cols-2 gap-4 max-w-4xl">
            <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-6 backdrop-blur-sm">
              <MousePointer2 className="size-6 text-primary" />
              <h3 className="text-lg font-medium text-zinc-200">Visual Authoring</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                React Flow canvas with connection-aware field tokens, graph validation, and seamless node connections.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-6 backdrop-blur-sm">
              <Bot className="size-6 text-primary" />
              <h3 className="text-lg font-medium text-zinc-200">Browser & AI Automation</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Built on Stagehand & Browserbase. Use atomic browser actions or hand over control to an autonomous AI agent.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-6 backdrop-blur-sm">
              <Cpu className="size-6 text-primary" />
              <h3 className="text-lg font-medium text-zinc-200">Durable Execution</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Powered by Trigger.dev. Workflows execute as durable background tasks with live metadata subscriptions.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-6 backdrop-blur-sm">
              <Users className="size-6 text-primary" />
              <h3 className="text-lg font-medium text-zinc-200">Live Collaboration</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Multiplayer editing powered by Liveblocks. See your teammates' cursors and edit workflows together in realtime.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Tech Stack & Learnings Link */}
        <div className="relative z-20 flex w-full items-center justify-between gap-8">
          <div className="flex items-center gap-4 text-sm font-medium text-zinc-500 overflow-hidden flex-1 relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex items-center gap-2 shrink-0 z-10 bg-zinc-950 pr-4">
              <span className="h-px w-8 bg-zinc-800" />
              <span className="whitespace-nowrap">Built with</span>
            </div>
            {/* Marquee container */}
            <div className="flex flex-1 overflow-hidden">
              <div className="flex shrink-0 animate-[marquee_20s_linear_infinite] items-center gap-8 pr-8 text-base">
                <span className="text-white font-semibold cursor-default">Next.js</span>
                <span className="text-[#FF0099] font-semibold cursor-default">Liveblocks</span>
                <span className="text-[#22c55e] font-semibold cursor-default">Trigger.dev</span>
                <span className="text-[#F03603] font-semibold cursor-default">Browserbase</span>
                <span className="text-[#00E599] font-semibold cursor-default">Neon</span>
                <span className="text-[#6C47FF] font-semibold cursor-default">Clerk</span>
                {/* Duplicate for seamless loop */}
                <span className="text-white font-semibold cursor-default">Next.js</span>
                <span className="text-[#FF0099] font-semibold cursor-default">Liveblocks</span>
                <span className="text-[#22c55e] font-semibold cursor-default">Trigger.dev</span>
                <span className="text-[#F03603] font-semibold cursor-default">Browserbase</span>
                <span className="text-[#00E599] font-semibold cursor-default">Neon</span>
                <span className="text-[#6C47FF] font-semibold cursor-default">Clerk</span>
              </div>
            </div>
          </div>

          <Button asChild variant="default" className="hover:scale-102! transition-transform">
            <Link href="/learnings">
              <BookOpen className="size-4" />
              What I learned building ForgeFlow
            </Link>
          </Button>
        </div>
      </div>

      {/* Right Panel - Auth Content */}
      <div className="relative flex flex-col items-center justify-center overflow-hidden bg-background p-8 sm:px-12">
        {/* Animated background blobs behind Clerk module */}
        <div className="absolute -top-[10%] -left-[10%] h-[50vh] w-[50vh] rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40vh] w-[40vh] rounded-full bg-primary/20 blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
