"use client"

import { useState, type ReactNode } from "react"
import Image from "next/image"

type ImageBlock = {
  asset: { url: string }
  alt: string | null
  caption: string | null
}

type Props = {
  images?: ImageBlock[] | null
  title: string
  description?: string | null
  actions: ReactNode
}

export default function ProductHero({ images, title, description, actions }: Props) {
  const list = images ?? []
  const [selected, setSelected] = useState(0)
  const activeImage = list[selected]

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-10">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
        {activeImage?.asset?.url ? (
          <Image
            src={activeImage.asset.url}
            alt={activeImage.alt ?? title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-300 font-bold text-4xl tracking-wide">FX</span>
          </div>
        )}
      </div>
      <div>
        <h1 className="text-4xl font-bold text-primary-800 mb-3">{title}</h1>
        {description && <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">{description}</p>}
      </div>

      {list.length > 1 ? (
        <div className="grid grid-cols-4 gap-2">
          {list.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelected(idx)}
              aria-label={`${idx + 1}번째 이미지 보기`}
              className={`relative aspect-square rounded-lg overflow-hidden bg-gray-100 ring-2 transition-colors ${
                idx === selected ? "ring-primary-700" : "ring-transparent hover:ring-gray-300"
              }`}
            >
              <Image
                src={img.asset.url}
                alt={img.alt ?? ""}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : (
        <div />
      )}

      <div className="flex items-start -mt-[200px]">{actions}</div>
    </div>
  )
}
