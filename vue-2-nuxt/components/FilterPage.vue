<template>
  <div class="flex grow flex-col overflow-hidden">
    <LinkBack class="ml-10" :to="backLinkFn(savedOptions)">
      {{ $t('back-0') }}
    </LinkBack>

    <LayoutSection class="mt-12 py-16 pl-28 pr-24">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-[300px]">
            <AppTransition>
              <BatteryViewPageLink v-if="msm" :msm="msm" />
            </AppTransition>
          </div>

          <div>
            <slot name="toolbar"></slot>
          </div>
        </div>

        <div class="flex items-center">
          <div class="space-y-3 text-right">
            <AppTransition>
              <p v-if="selectedCount !== 0" class="text-main">
                {{ $t('count-selected', { count: selectedCount }) }}
              </p>
            </AppTransition>

            <p v-if="selectionLimitReached" class="text-red text-main">
              {{ $t('maximum-number-of-values') }}
            </p>
          </div>

          <div class="ml-48 flex space-x-12">
            <AppButton
              variant="secondary"
              :disabled="!msm || (selectedCount === 0 && !anyNodeExpanded)"
              @click="resetToDefaultState"
            >
              {{ $t('reset-all') }}
            </AppButton>
            <AppButton
              :disabled="
                !msm || (noEmptySubmit && selectedCount === 0) || submitDisabled
              "
              @click="emitSubmit"
            >
              {{ submitButtonText }}
            </AppButton>
          </div>
        </div>
      </div>
    </LayoutSection>

    <FilterPageNodesSection
      class="mt-12"
      :tree="tree"
      :disabled="treeDisabled"
      :more-selection-enabled="!selectionLimitReached"
      :selected-options.sync="selectedOptions"
    />
  </div>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
import AppTransition from '~/components/AppTransition.vue'
import BatteryViewPageLink from '~/components/BatteryViewPageLink.vue'
import FilterPageNodesSection from '~/components/FilterPageNodesSection.vue'
import LayoutSection from '~/components/LayoutSection.vue'
import LinkBack from '~/components/LinkBack.vue'
import {
  constructTreeFromSscAndModuleCounts,
  getRecursiveNodeTree
} from '~/logic/utils/data-filters'

export default {
  components: {
    BatteryViewPageLink,
    AppButton,
    LinkBack,
    LayoutSection,
    FilterPageNodesSection,
    AppTransition
  },

  props: {
    treeDisabled: { type: Boolean, default: false },
    filtersFetchFn: { type: Function, required: true },
    backLinkFn: { type: Function, required: true },
    noEmptySubmit: { type: Boolean, default: false },
    submitDisabled: { type: Boolean, default: false },
    submitButtonText: {
      type: String,
      default() {
        return this.$t('save-filters')
      }
    }
  },

  data() {
    return {
      msm: null,
      tree: [],
      savedOptions: [],
      selectedOptions: []
    }
  },

  async fetch() {
    const initialOptions = this.$route.query.options
      ? JSON.parse(this.$route.query.options)
      : []

    const { tree, msm, variables } = await this.filtersFetchFn()

    this.msm = tree?.msm ?? msm
    this.savedOptions = [...initialOptions]
    this.selectedOptions = initialOptions

    // after filters fetch we have either complete msm-tree structure
    // or just msm's metadata
    //
    // if we don't have complete tree from server - we need to
    // construct it from msm's metadata
    // (`sscs_count` and `modules_per_ssc_count`)

    const treeToBuildNodesFrom =
      !tree && msm ? constructTreeFromSscAndModuleCounts(msm) : tree

    this.tree = getRecursiveNodeTree({
      rawTree: treeToBuildNodesFrom,
      initialOptions,
      variables
    })
  },

  computed: {
    selectedCount() {
      return this.selectedOptions.length
    },

    selectionLimitReached() {
      return this.selectedCount === 10
    },

    anyNodeExpanded() {
      return this.doForEveryNodeInTree(this.tree, node => node.expanded).some(
        expanded => expanded
      )
    }
  },

  methods: {
    resetToDefaultState() {
      this.selectedOptions = []
      this.shrinkAllNodes()
    },

    doForEveryNodeInTree(tree, fn) {
      const results = []

      const resultsGatherFunc = nodes => {
        for (const node of nodes) {
          results.push(fn(node))

          if (node.nodes && node.nodes.length > 0) {
            resultsGatherFunc(node.nodes, fn)
          }
        }
      }

      resultsGatherFunc(tree, fn)

      return results
    },

    shrinkAllNodes() {
      this.doForEveryNodeInTree(this.tree, node => {
        if (node.expanded) {
          node.expanded = false
        }
      })
    },

    emitSubmit() {
      this.$emit('submit', this.selectedOptions)
    }
  }
}
</script>
