import { uniqueNamesGenerator, animals, colors } from "unique-names-generator"

export function generateSlug(): string {
  return uniqueNamesGenerator({
    dictionaries: [colors, animals],
    separator: "-",
    length: 2,
  })
}
