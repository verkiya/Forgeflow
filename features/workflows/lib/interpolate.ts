export function getByPath(obj: any, path: string): any {
  const keys = path.split(/[\.\[\]\'\"]+/).filter(Boolean)
  let current = obj
  for (const key of keys) {
    if (current === null || current === undefined) return undefined
    current = current[key]
  }
  return current
}

export function interpolate(
  template: string,
  outputs: Record<string, any>
): string {
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
