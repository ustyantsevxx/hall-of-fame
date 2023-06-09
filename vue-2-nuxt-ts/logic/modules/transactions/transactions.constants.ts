export const TRANSACTION_TYPES = {
  FUEL_REFILL: 1,
  GOODS_AND_SERVICES: 2,
  OTHER: 3
}

export const STATISTICS_COLORS = [
  '#4F4382',
  '#5390BE',
  '#9ACFE6',
  '#ABB953',
  '#B9536C',
  '#E9CB2E',
  '#53B994',
  '#BA72C6'
]

export const STATISTICS_COLORS_BY_TYPE = {
  FUELS: {
    1: STATISTICS_COLORS[0],
    2: STATISTICS_COLORS[1],
    3: STATISTICS_COLORS[2],
    4: STATISTICS_COLORS[3],
    5: STATISTICS_COLORS[4],
    6: STATISTICS_COLORS[5]
  },
  OTHER: {
    2: STATISTICS_COLORS[6],
    3: STATISTICS_COLORS[7]
  }
}
