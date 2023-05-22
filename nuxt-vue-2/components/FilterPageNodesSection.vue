<template>
  <LayoutSection class="relative grow overflow-hidden">
    <AppTransition>
      <div
        v-if="disabled"
        class="absolute inset-0 z-20 cursor-not-allowed bg-light/80"
      ></div>
    </AppTransition>

    <CustomScrollbarWrapper class="h-full w-full p-36">
      <div class="flex">
        <AppTransition>
          <div v-if="tree.length" class="space-y-24">
            <FilterPageNode
              v-for="node in tree"
              :key="node.id"
              :disabled="disabled"
              :expanded.sync="node.expanded"
              :node="node"
              :selected-options="selectedOptions"
              @select-option="toggleOption"
            />
          </div>
        </AppTransition>

        <div style="min-width: 36px; max-width: 36px">
          <!-- adds fake padding-right -->
        </div>
      </div>
    </CustomScrollbarWrapper>
  </LayoutSection>
</template>

<script>
import { isEqual } from 'lodash-es'

import AppTransition from '~/components/AppTransition.vue'
import CustomScrollbarWrapper from '~/components/CustomScrollbarWrapper.vue'
import FilterPageNode from '~/components/FilterPageNode.vue'
import LayoutSection from '~/components/LayoutSection.vue'

export default {
  components: {
    LayoutSection,
    FilterPageNode,
    CustomScrollbarWrapper,
    AppTransition
  },

  props: {
    tree: { type: Array, required: true },
    disabled: { type: Boolean, default: false },

    selectedOptions: { type: Array, required: true },
    moreSelectionEnabled: { type: Boolean, default: false }
  },

  methods: {
    toggleOption(option) {
      const existingIndex = this.selectedOptions.findIndex(o =>
        isEqual(o, option)
      )

      if (existingIndex !== -1) {
        this.$emit(
          'update:selectedOptions',
          this.selectedOptions.filter((o, i) => i !== existingIndex)
        )
      } else if (this.moreSelectionEnabled) {
        this.$emit('update:selectedOptions', [...this.selectedOptions, option])
      }
    }
  }
}
</script>
