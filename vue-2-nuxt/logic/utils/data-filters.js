import { range } from 'lodash-es'

import { DATA_ITEM_MAP } from '~/logic/constants'

/** 
  Business-approved API-logic patching. Explanation:

  In current version of the battery structure, 
  there is only one TEM in the MODULE;
  and since we do not have a TEM level in the filters 
  and these variables come in the TEM level, 
  they need to be transferred to the MODULE level
*/
const temVariablesThatAreActuallyModuleVariables = new Set([
  't01',
  't08',
  't09',
  't10',
  't13'
])

const getCellNodes = (
  { parentMsm, parentSsc, parentModule },
  { variables }
) => {
  return parentModule.tems.flatMap((tem, temIndex) => {
    return Array.from({ length: 12 }, (_, cellIndex) => {
      const cellAbsoluteIndex = cellIndex + 1 + 12 * temIndex

      return {
        title: `Cell ${cellAbsoluteIndex}`,
        options: variables.tem
          .filter(v => v !== 't03')
          .filter(v => !temVariablesThatAreActuallyModuleVariables.has(v))
          .map(variable => ({
            id: tem.id,
            name: variable,
            description: DATA_ITEM_MAP[variable],
            type: 'tem',
            title: `SSC${parentSsc.slot + 1} ▸ M${
              parentModule.slot + 1
            } ▸ C${cellAbsoluteIndex}`,
            indexInTem: cellAbsoluteIndex - 1,
            meta: {
              msmId: parentMsm.id,
              sscId: parentSsc.id,
              moduleId: parentModule.id,
              temId: 0 // always one tem on module in current MSM configuration
            }
          }))
      }
    })
  })
}

const getTempSensorNodes = (
  { parentMsm, parentSsc, parentModule },
  { variables }
) => {
  return parentModule.tems.flatMap((tem, temIndex) => {
    return Array.from({ length: 8 }, (_, tempSensorIndex) => {
      const tempSensorAbsoluteIndex = tempSensorIndex + 1 + 8 * temIndex

      return {
        title: `Temp sensor ${tempSensorAbsoluteIndex}`,
        options: variables.tem
          .filter(v => v === 't03')
          .map(variable => ({
            id: tem.id,
            name: variable,
            description: DATA_ITEM_MAP[variable],
            type: 'tem',
            title: `SSC${parentSsc.slot + 1} ▸ M${
              parentModule.slot + 1
            } ▸ TS${tempSensorAbsoluteIndex}`,
            indexInTem: tempSensorAbsoluteIndex - 1,
            meta: {
              msmId: parentMsm.id,
              sscId: parentSsc.id,
              moduleId: parentModule.id,
              temId: 0 // always one tem on module in current MSM configuration
            }
          }))
      }
    })
  })
}

const getModuleNodes = (
  { parentMsm, parentSsc },
  { initialOptions, variables }
) => {
  return parentSsc.modules.map(module => {
    const moduleTitle = `Module ${module.slot + 1}`

    const actualModuleVariablesWithTemVariables = [
      ...variables.module,
      ...variables.tem.filter(temVariable =>
        temVariablesThatAreActuallyModuleVariables.has(temVariable)
      )
    ]

    return {
      id: module.id,
      title: moduleTitle,
      expanded: initialOptions.some(
        option => option.meta?.moduleId === module.id
      ),
      options: actualModuleVariablesWithTemVariables.map(variable => ({
        id: temVariablesThatAreActuallyModuleVariables.has(variable)
          ? module.tems[0].id
          : module.id,
        name: variable,
        description: DATA_ITEM_MAP[variable],
        type: temVariablesThatAreActuallyModuleVariables.has(variable)
          ? 'tem'
          : 'module',
        title: `SSC${parentSsc.slot + 1} ▸ M${module.slot + 1}`,
        meta: {
          msmId: parentMsm.id,
          sscId: parentSsc.id,
          moduleId: module.id
        }
      })),
      childPerColumn: 3,
      nodes: [
        ...getCellNodes(
          { parentMsm, parentSsc, parentModule: module },
          { variables }
        ),
        ...getTempSensorNodes(
          { parentMsm, parentSsc, parentModule: module },
          { variables }
        )
      ]
    }
  })
}

const getSscNodes = ({ parentMsm }, { initialOptions, variables }) => {
  return parentMsm.sscs.map(ssc => {
    const sscTitle = `SSC${ssc.slot + 1}`

    return {
      id: ssc.id,
      title: sscTitle,
      expanded: initialOptions.some(option => option.meta?.sscId === ssc.id),
      options: variables.ssc.map(variable => ({
        id: ssc.id,
        name: variable,
        description: DATA_ITEM_MAP[variable],
        type: 'ssc',
        title: sscTitle,
        meta: {
          msmId: parentMsm.id
        }
      })),

      nodes: getModuleNodes(
        { parentSsc: ssc, parentMsm },
        { initialOptions, variables }
      )
    }
  })
}

const getMsmNode = (root, { initialOptions, variables }) => ({
  id: root.msm.id,
  title: 'MSM',
  expanded: initialOptions.some(option => option.meta?.msmId === root.msm.id),
  options: variables.msm.map(variable => ({
    id: root.msm.id,
    name: variable,
    description: DATA_ITEM_MAP[variable],
    type: 'msm',
    title: 'MSM',
    meta: { msmId: root.msm.id }
  })),

  nodes: getSscNodes({ parentMsm: root.msm }, { initialOptions, variables })
})

export const constructTreeFromSscAndModuleCounts = msm => {
  return {
    msm: {
      id: msm.id,
      name: msm.name,
      serial: msm.serial,
      sscs: range(0, msm.sscs_count).map(sscIndex => ({
        id: sscIndex,
        slot: sscIndex,
        modules: range(0, msm.modules_per_ssc_count).map(moduleIndex => ({
          id: moduleIndex,
          slot: moduleIndex,
          tems: [{ id: 0, slot: 0 }] // if we constructing tree from metadata, there is always only one tem per module
        }))
      }))
    }
  }
}

export const getRecursiveNodeTree = ({
  rawTree,
  variables,
  initialOptions
}) => {
  return [getMsmNode(rawTree, { initialOptions, variables })]
}
