import dayjs from 'dayjs'

import { TRUE_FALSE_ONLY_ITEMS } from '~/logic/constants'
import { LOG_TYPES } from '~/logic/constants/request-types'
import { notUndefinedOrNull } from '~/logic/utils'
import { minMax } from '~/logic/utils/arrays'

const _chartColors = [
  '#47A7FF',
  '#FFD233',
  '#36E0B7',
  '#D336E0',
  '#F48C2B',
  '#561EF3',
  '#6FB23B',
  '#E73A3A',
  '#006484',
  '#AB610B',
  '#BB65FF'
]

const _getChartData = (filterOption, { chartData, chartType }) => {
  return Object.entries(chartData).map(([timestamp, values]) => {
    const x = dayjs.unix(timestamp).toISOString()
    let targetItem

    if (chartType === LOG_TYPES.A1 || chartType === LOG_TYPES.A2) {
      const slotValue = getSlotValue(filterOption)
      targetItem = values[`${filterOption.type}.${slotValue}`]
    } else {
      targetItem = values[`${filterOption.type}.${filterOption.id}`]
    }

    const target = targetItem?.[filterOption.name] ?? null

    if (target === null) {
      return { x, y: null }
    }

    // on the input `y` can be one of cases below

    // case 1: num
    let y = target

    if (filterOption.indexInTem !== undefined) {
      y =
        typeof y === 'object' && y.min !== undefined && y.max !== undefined
          ? /* case 2: {
              min: [num,num,num,num,num,num,num,num,num,num,num,num], 
              avg: [num,num,num,num,num,num,num,num,num,num,num,num], 
              max: [num,num,num,num,num,num,num,num,num,num,num,num]
            } and case 3: {
              min: [num,num,num,num,num,num,num,num,num,num,num,num], 
              max: [num,num,num,num,num,num,num,num,num,num,num,num]
            } */
            Object.fromEntries(
              Object.entries(y).map(([type, value]) => [
                type,
                value[filterOption.indexInTem]
              ])
            )
          : // case 3: [num,num,num,num,num,num,num,num,num,num,num,num]
            y[filterOption.indexInTem]
    }

    if (TRUE_FALSE_ONLY_ITEMS.includes(filterOption.name)) {
      // case 4: true/false or 0/1
      y = target ? 100 : 0.0001
    }

    /*
      on the output `y` must be either 
      1. num 
      2. { min: num, max: num }
      2. { min: num, avg: num, max: num }
    */

    return { x, y }
  })
}

const getSlotValue = option => {
  if (option.type === 'msm' || option.type === 'ssc') {
    return option.id.toString()
  }

  return [option.meta.sscId, option.meta.moduleId, option.meta.temId]
    .filter(k => notUndefinedOrNull(k))
    .join('.')
}

export const getChartRequestBody = filterOptions => {
  const result = []

  for (const option of filterOptions) {
    const existingGroup = result.find(
      x => x.id === option.id && x.type === option.type
    )

    if (!existingGroup) {
      // send both `id` and `slot`. some charts require `slot`, some depend on `id`
      result.push({
        id: option.id,
        slot: getSlotValue(option),
        type: option.type,
        variables: [option.name]
      })
    } else if (!existingGroup.variables.includes(option.name)) {
      existingGroup.variables.push(option.name)
    }
  }

  return result
}

const getObjectValuesChartMinMax = chartData => {
  const chartDataYMins = chartData.map(point => point.y.min)
  const chartDataYMaxes = chartData.map(point => point.y.max)

  return [Math.min(...chartDataYMins), Math.max(...chartDataYMaxes)]
}

const getRegularChartMinMax = chartData => {
  const chartDataYs = chartData.map(point => point.y)
  const [min, max] = minMax(chartDataYs)

  if (min === max) {
    if (min < 0) {
      return [min * 2, 0]
    } else if (min > 0) {
      return [0, max * 2]
    } else {
      return [-100, 100]
    }
  }

  return [min, max]
}

const getChartDataMinMax = (chartData, meta) => {
  if (meta.hasObjectValues) {
    return getObjectValuesChartMinMax(chartData)
  } else if (meta.hasBooleanValues) {
    return [0, 100]
  } else {
    return getRegularChartMinMax(chartData)
  }
}

const ifChartDataHasMinMaxObjectValues = chartData => {
  return (
    chartData[0]?.y?.min !== undefined && chartData[0]?.y?.max !== undefined
  )
}

export const getCharts = (filterOptions, { chartData, chartType }) => {
  return filterOptions.map((filterOption, i) => {
    const parsedChartData = _getChartData(filterOption, {
      chartData,
      chartType
    })
    const hasObjectValues = ifChartDataHasMinMaxObjectValues(parsedChartData)
    const hasBooleanValues = TRUE_FALSE_ONLY_ITEMS.includes(filterOption.name)

    const [min, max] = getChartDataMinMax(parsedChartData, {
      hasObjectValues,
      hasBooleanValues
    })

    return {
      id: i.toString(),
      name: filterOption.title,
      description: [filterOption.name, filterOption.description]
        .filter(k => k)
        .join(' '),
      color: _chartColors[i],
      enabled: true,
      min,
      max,
      data: parsedChartData,
      hasOnlyBooleanValues: hasBooleanValues,
      hasObjectValues,

      // TODO unit
      unit: ''
    }
  })
}
