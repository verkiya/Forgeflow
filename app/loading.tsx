const ForgeflowIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 71 81"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M0 31.369C0 19.567 9.567 10 21.369 10H71C71 21.802 61.433 31.369 49.631 31.369H0Z"
      fill="oklch(0.8545 0.1675 159.6564)"
    />
    <path
      d="M0 53.423C0 45.047 6.79 38.258 15.165 38.258H49.631C49.631 46.633 42.841 53.423 34.466 53.423H0Z"
      fill="oklch(0.74 0.15 159)"
    />
    <path
      d="M0 70.66C0 64.95 4.63 60.32 10.34 60.32H33.777C33.777 66.03 29.147 70.66 23.437 70.66H0Z"
      fill="oklch(0.63 0.13 159)"
    />
  </svg>
)

export default function Loading() {
  return (
    <div className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-background">
      {/* ── Subtle Ambient Glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="size-64 animate-pulse rounded-full bg-primary/10 blur-[64px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* ── Glowing Spinner Logo ── */}
        <div className="relative flex size-20 items-center justify-center">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 rounded-2xl border-2 border-border" />
          <div className="absolute inset-0 animate-[spin_3s_linear_infinite] rounded-2xl border-2 border-primary border-t-transparent" />
          <div className="absolute inset-0 animate-[spin_4s_linear_infinite_reverse] rounded-2xl border-2 border-chart-1/50 border-b-transparent opacity-50" />

          {/* Inner Logo */}
          <div className="flex size-14 items-center justify-center rounded-xl bg-card shadow-lg ring-1 ring-border">
            <ForgeflowIcon className="size-8 animate-pulse text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
          </div>
        </div>

        {/* ── Shimmering Text ── */}
        <div className="flex flex-col items-center gap-1">
          <h2 className="bg-gradient-to-r from-foreground/80 via-foreground to-foreground/80 bg-clip-text text-lg font-bold tracking-tight text-transparent">
            ForgeFlow
          </h2>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <span className="flex gap-0.5">
              <span
                className="size-1.5 animate-bounce rounded-full bg-primary/60"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="size-1.5 animate-bounce rounded-full bg-primary/60"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="size-1.5 animate-bounce rounded-full bg-primary/60"
                style={{ animationDelay: "300ms" }}
              />
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
