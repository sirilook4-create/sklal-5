export type ParseResult = { ok: true; value: number | null } | { ok: false }

export function parseGuestPrice(input: string): ParseResult {
  const trimmed = input.trim()
  if (trimmed === '') return { ok: true, value: null }
  const normalized = trimmed.replace(',', '.')
  if (!/^\d+(\.\d+)?$/.test(normalized)) return { ok: false }
  const num = Number(normalized)
  if (num > 1e9) return { ok: false }
  return { ok: true, value: Math.round(num * 100) / 100 }
}
