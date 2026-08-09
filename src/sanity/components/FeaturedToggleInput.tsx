import { useCallback } from 'react'
import { set, useClient, useFormValue, type BooleanInputProps } from 'sanity'
import { apiVersion } from '../env'

// 대표콘텐츠(featuredOnMain) 토글 — 켜면 같은 industries를 가진 다른 적용사례의
// featuredOnMain을 자동으로 꺼서, 산업군당 대표콘텐츠가 항상 1개만 유지되도록 한다.
export function FeaturedToggleInput(props: BooleanInputProps) {
  const { value, onChange } = props
  const client = useClient({ apiVersion })
  const industries = useFormValue(['industries']) as string | undefined
  const rawId = useFormValue(['_id']) as string | undefined

  const handleChange = useCallback(
    async (checked: boolean) => {
      onChange(set(checked))
      if (!checked || !industries || !rawId) return

      const publishedId = rawId.replace(/^drafts\./, '')
      const draftId = `drafts.${publishedId}`
      const others = await client.fetch<string[]>(
        `*[_type == "caseStudy" && industries == $industries && featuredOnMain == true && !(_id in [$publishedId, $draftId])]._id`,
        { industries, publishedId, draftId }
      )
      if (others.length === 0) return

      const tx = client.transaction()
      others.forEach((id) => tx.patch(id, { set: { featuredOnMain: false } }))
      await tx.commit()
    },
    [onChange, client, industries, rawId]
  )

  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={!!value}
        onChange={(e) => handleChange(e.currentTarget.checked)}
        style={{ width: 16, height: 16 }}
      />
      <span style={{ fontSize: 13, color: 'var(--card-muted-fg-color, #6b7280)' }}>
        {value ? '대표콘텐츠로 지정 — 같은 산업군의 다른 대표콘텐츠는 자동으로 꺼집니다' : '꺼짐'}
      </span>
    </label>
  )
}
