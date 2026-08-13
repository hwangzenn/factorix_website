type IndustryLogo = {
  category: string
  logos: { image: { asset: { url: string } } | null; alt: string | null }[] | null
}

type Props = {
  logos: IndustryLogo[]
  locale?: "ko" | "en"
}

export default function TrustBar({ logos, locale = "ko" }: Props) {
  const en = locale === "en"
  const items = Array.from(
    new Map(
      logos
        .flatMap((l) => l.logos ?? [])
        .filter((item) => item.image?.asset?.url)
        .map((item) => [item.image!.asset.url, item])
    ).values()
  )

  if (items.length === 0) return null

  return (
    <div className="bg-white border-b border-gray-100 py-10">
      <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex w-max items-center gap-16 animate-marquee group-hover:[animation-play-state:paused]">
          {[...items, ...items].map((item, i) => (
            <img
              key={i}
              src={item.image!.asset.url}
              alt={item.alt ?? (en ? "Customer logo" : "고객사 로고")}
              className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
