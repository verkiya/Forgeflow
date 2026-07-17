import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Workflow",
}

export default function WorkflowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
