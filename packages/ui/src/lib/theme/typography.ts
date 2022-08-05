enum HedvigFont {
  HEDVIG_LETTERS_BIG = 'HedvigLetters-Big',
  HEDVIG_LETTERS_SMALL = 'HedvigLetters-Small',
  HEDVIG_LETTERS_STANDARD = 'HedvigLetters-Standard',
}

const FONT_STANDARD = `'${HedvigFont.HEDVIG_LETTERS_STANDARD}', sans-serif`
export const fonts = {
  standard: FONT_STANDARD,
  small: `'${HedvigFont.HEDVIG_LETTERS_SMALL}', serif`,
  big: `'${HedvigFont.HEDVIG_LETTERS_BIG}', serif`,

  body: FONT_STANDARD,
  heading: FONT_STANDARD,
}

export const getCDNFonts = () => {
  return Object.values(HedvigFont).map((fontName) => ({
    family: fontName,
    style: 'normal',
    weight: 400,
    src: `https://cdn.hedvig.com/identity/fonts/${fontName}.woff2`,
    format: 'woff2',
  }))
}

export const fontSizes: Record<number | string, string> = {
  0: '0.75rem',
  1: '0.875rem',
  2: '1rem',
  3: '1.125rem',
  4: '1.25rem',
  5: '1.5rem',
  6: '2rem',
  7: '2.5rem',
  8: '3rem',
  9: '3.5rem',
  10: '4.5rem',
  11: '6rem',
}

// Add more alaises when we have more hi-fi designs
fontSizes.body = fontSizes[2]
