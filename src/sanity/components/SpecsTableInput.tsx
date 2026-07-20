import { useCallback, type CSSProperties } from 'react'
import { set, type ArrayOfObjectsInputProps, type ObjectItem } from 'sanity'

type SpecRow = ObjectItem & { key?: string; value?: string }

// 스펙 필드를 Attribute / Property 2열 표로 편집하는 커스텀 입력 컴포넌트.
// Sanity 기본 array-of-object 입력(팝업으로 열리는 카드형)은 여러 스펙을 한눈에
// 훑어보기 어려워서, 표 형태로 모든 행을 동시에 보여주고 바로 수정할 수 있게 한다.
export function SpecsTableInput(props: ArrayOfObjectsInputProps<SpecRow>) {
  const { value = [], onChange, onItemAppend, onItemRemove } = props

  const handleFieldChange = useCallback(
    (itemKey: string, field: 'key' | 'value', text: string) => {
      onChange(set(text, [{ _key: itemKey }, field]))
    },
    [onChange]
  )

  const handleAddRow = useCallback(() => {
    onItemAppend({ _key: crypto.randomUUID(), _type: 'specItem', key: '', value: '' } as SpecRow)
  }, [onItemAppend])

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Attribute</th>
            <th style={headerCellStyle}>Property</th>
            <th style={{ ...headerCellStyle, width: 32 }} />
          </tr>
        </thead>
        <tbody>
          {value.map((item) => (
            <tr key={item._key}>
              <td style={cellStyle}>
                <input
                  value={item.key ?? ''}
                  onChange={(e) => handleFieldChange(item._key, 'key', e.target.value)}
                  placeholder="예: 최대 토출량"
                  style={inputStyle}
                />
              </td>
              <td style={cellStyle}>
                <textarea
                  value={item.value ?? ''}
                  onChange={(e) => handleFieldChange(item._key, 'value', e.target.value)}
                  placeholder="예: 0.01–50 mL/min"
                  rows={1}
                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                />
              </td>
              <td style={{ ...cellStyle, textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => onItemRemove(item._key)}
                  aria-label="행 삭제"
                  style={removeButtonStyle}
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleAddRow} style={addButtonStyle}>
        + 행 추가
      </button>
    </div>
  )
}

const headerCellStyle: CSSProperties = {
  textAlign: 'left',
  padding: '6px 8px',
  borderBottom: '2px solid var(--card-border-color, #e2e2e2)',
  fontWeight: 600,
  color: 'var(--card-muted-fg-color, #6b7280)',
}

const cellStyle: CSSProperties = {
  padding: '4px 8px',
  borderBottom: '1px solid var(--card-border-color, #eee)',
  verticalAlign: 'top',
}

const inputStyle: CSSProperties = {
  width: '100%',
  border: '1px solid transparent',
  borderRadius: 4,
  padding: '6px 8px',
  font: 'inherit',
  background: 'transparent',
  color: 'inherit',
}

const removeButtonStyle: CSSProperties = {
  border: 'none',
  background: 'transparent',
  color: 'var(--card-muted-fg-color, #9ca3af)',
  cursor: 'pointer',
  fontSize: 14,
  padding: 4,
}

const addButtonStyle: CSSProperties = {
  marginTop: 8,
  padding: '6px 12px',
  border: '1px solid var(--card-border-color, #e2e2e2)',
  borderRadius: 4,
  background: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  fontSize: 13,
}
