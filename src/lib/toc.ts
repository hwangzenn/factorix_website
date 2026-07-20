import type { PortableTextBlock } from "@portabletext/react"

export type Heading = { id: string; text: string }

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
    .filter((block) => block.style === "h2")
    .map((block) => ({ id: slugifyHeading(blockText(block)), text: blockText(block) }))
    .filter((h) => h.text.trim().length > 0)
}
