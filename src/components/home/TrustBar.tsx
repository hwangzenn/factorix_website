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
    <div className="bg-white border-b border-gray-100 py-8 px-8">
      <div className="max-w-[1440px] mx-auto">
        <p className="text-center text-xs font-semibold text-gray-400 tracking-widest uppercase mb-6">
          {en ? "Trusted by leading manufacturers" : "다양한 산업의 고객사가 팩토릭스를 선택했습니다"}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {items.map((item, i) => (
            <img
              key={i}
              src={item.image!.asset.url}
              alt={item.alt ?? (en ? "Customer logo" : "고객사 로고")}
              className="h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
