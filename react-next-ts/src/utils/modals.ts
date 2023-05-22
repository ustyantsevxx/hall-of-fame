import { Variants } from 'framer-motion'

type VariantsWithMousePositionOptions = {
  variants: Variants
  mousePosition: { x: number; y: number }
  buttonSize: number
}

export const variantsWithMousePosition = ({
  mousePosition,
  variants,
  buttonSize
}: VariantsWithMousePositionOptions) => {
  return Object.fromEntries(
    Object.entries(variants).map(([variantName, variantConfig]) => {
      // offset is needed because otherwise cursor would be in the middle of the button and would cover the icon
      const halfButtonSizeWithOffset = buttonSize / 1.6

      return [
        variantName,
        {
          ...variantConfig,
          x: mousePosition.x - halfButtonSizeWithOffset,
          y: mousePosition.y - halfButtonSizeWithOffset
        }
      ]
    })
  )
}
