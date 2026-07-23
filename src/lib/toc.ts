import type { PortableTextBlock } from "@portabletext/react"

export type HeadingLevel = "h2" | "h3" | "h4"
export type Heading = { id: string; text: string; level: HeadingLevel }

export function slugifyHeading(text: string): string {
  return (
    text
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/(^-|-$)/g, "") || "section"
  )
}

export function blockText(block: PortableTextBlock): string {
  return (block.children ?? [])
    .map((child) => (typeof (child as { text?: unknown }).text === "string" ? (child as { text: string }).text : ""))
    .join("")
}

export function extractHeadings(body: PortableTextBlock[] | null | undefined): Heading[] {
  if (!body) return []
  return body
    .filter((block) => block.style === "h2" || block.style === "h3" || block.style === "h4")
    .map((block) => ({
      id: slugifyHeading(blockText(block)),
      text: blockText(block),
      level: block.style as HeadingLevel,
    }))
    .filter((h) => h.text.trim().length > 0)
}
