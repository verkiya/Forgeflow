export type NodeOutputs = Record<string, unknown>

export function getByPath(obj: unknown, path: string): unknown {
  const keys = path.split(/[\.\[\]\'\"]+/).filter(Boolean)
  let current: unknown = obj
  for (const key of keys) {
    if (current === null || typeof current !== "object") return undefined
    current = (current as Record<string, unknown>)[key]
  }
  return current
}

export function interpolate(template: string, outputs: NodeOutputs): string {
  if (!template) return template
  return template.replace(/\{\{\s*(.+?)\s*\}\}/g, (match, path) => {
    const value = getByPath(outputs, path)
    if (value === undefined || value === null) {
      return ""
    }
    if (typeof value === "object") {
      return JSON.stringify(value)
    }
    return String(value)
  })
}
