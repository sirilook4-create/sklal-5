import { describe, it, expect } from 'vitest'
import { parseGuestPrice } from './guestPrice'

describe('parseGuestPrice', () => {
  it('empty string returns null', () => {
    expect(parseGuestPrice('')).toEqual({ ok: true, value: null })
  })

  it('spaces only returns null', () => {
    expect(parseGuestPrice('   ')).toEqual({ ok: true, value: null })
  })

  it('integer', () => {
    expect(parseGuestPrice('12')).toEqual({ ok: true, value: 12 })
  })

  it('decimal with dot', () => {
    expect(parseGuestPrice('12.5')).toEqual({ ok: true, value: 12.5 })
  })

  it('decimal with comma', () => {
    expect(parseGuestPrice('12,5')).toEqual({ ok: true, value: 12.5 })
  })

  it('trims spaces', () => {
    expect(parseGuestPrice('  12  ')).toEqual({ ok: true, value: 12 })
  })

  it('trims spaces around decimal', () => {
    expect(parseGuestPrice('  12.5  ')).toEqual({ ok: true, value: 12.5 })
  })

  it('rounds to 2 decimal places (up)', () => {
    expect(parseGuestPrice('12.567')).toEqual({ ok: true, value: 12.57 })
  })

  it('rounds to 2 decimal places (down)', () => {
    expect(parseGuestPrice('12.564')).toEqual({ ok: true, value: 12.56 })
  })

  it('rejects negative', () => {
    expect(parseGuestPrice('-5')).toEqual({ ok: false })
  })

  it('rejects non-number', () => {
    expect(parseGuestPrice('abc')).toEqual({ ok: false })
  })

  it('rejects value over 1e9', () => {
    expect(parseGuestPrice('1000000001')).toEqual({ ok: false })
  })

  it('accepts exactly 1e9', () => {
    expect(parseGuestPrice('1000000000')).toEqual({ ok: true, value: 1000000000 })
  })

  it('rejects multiple dots', () => {
    expect(parseGuestPrice('12.5.5')).toEqual({ ok: false })
  })

  it('rejects scientific notation', () => {
    expect(parseGuestPrice('1e5')).toEqual({ ok: false })
  })

  it('accepts zero', () => {
    expect(parseGuestPrice('0')).toEqual({ ok: true, value: 0 })
  })

  it('accepts leading zeros', () => {
    expect(parseGuestPrice('007')).toEqual({ ok: true, value: 7 })
  })

  it('accepts comma with spaces', () => {
    expect(parseGuestPrice('  12,5  ')).toEqual({ ok: true, value: 12.5 })
  })
})
