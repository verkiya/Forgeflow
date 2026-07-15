export default function TestPage() {
  return (
    <div className="flex min-h-svh p-6 items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Protected Test Page</h1>
        <p className="text-muted-foreground">
          If you can see this, you are successfully authenticated!
        </p>
      </div>
    </div>
  )
}
