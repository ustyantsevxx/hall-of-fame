<template>
  <div
    class="flex"
    :class="{
      'pl-16': isSubnode,
      'x-border-blue border-l-2 pb-24': isSubnode && !isLastSubnode,
      'ml-2 pb-0': isSubnode && isLastSubnode && !isFirstSubnode,
      'pt-20': isChunked && isFirstSubnode && !fromLastChunk
    }"
    :aria-expanded="node.expanded"
  >
    <div
      class="flex space-x-24"
      :class="{
        '-mt-20': isSubnode && isFirstSubnode && !isChunked
      }"
    >
      <div style="width: 180px">
        <div
          class="relative select-none rounded-t-6 bg-light-30"
          :class="{
            'rounded-b-6': node.options.length === 0,
            'subnode-header': isSubnode,
            'subnode-header--first': isSubnode && isFirstSubnode && !isChunked,
            'subnode-header--last':
              isSubnode && isLastSubnode && (!isFirstSubnode || isChunked),
            'subnode-header--chunked-first': isFirstSubnode && isChunked
          }"
        >
          <div
            v-if="hasSubnodes"
            role="button"
            class="py-13 pl-16 text-h2"
            @click="emitUpdateExpanded"
          >
            {{ node.title }}
          </div>
          <p v-else class="py-13 pl-16 text-h2">{{ node.title }}</p>

          <ButtonCirclePlusMinus
            v-if="hasSubnodes"
            :disabled="disabled"
            class="absolute top-1/2 right-0 z-10 translate-x-1/2 -translate-y-1/2"
            :expanded="node.expanded"
            @click="emitUpdateExpanded"
          />
        </div>

        <div v-if="node.options.length > 0" class="overflow-hidden rounded-b-6">
          <ul class="divide-y divide-white/20">
            <li
              v-for="(option, i) in node.options"
              :key="i"
              class="bg-light-20"
            >
              <AppCheckbox
                class="flex items-center px-16 py-12"
                bg-color="#fff"
                :disabled="disabled"
                check-color="#000"
                :checked="ifOptionSelected(option)"
                @input="() => selectOption(option)"
              >
                <p class="text-main">{{ option.name }}</p>
                <p
                  v-if="option.description"
                  :title="option.description"
                  class="mt-4 overflow-hidden overflow-ellipsis text-[13px] leading-[14px] text-white/60"
                >
                  {{ option.description }}
                </p>
              </AppCheckbox>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="hasSubnodes && node.expanded" class="mt-20">
        <template
          v-if="
            !node.childPerColumn || node.nodes.length <= node.childPerColumn
          "
        >
          <FilterPageNode
            v-for="(subnode, i) in node.nodes"
            :key="subnode.id"
            :node="subnode"
            :disabled="disabled"
            :selected-options="selectedOptions"
            is-subnode
            :is-first-subnode="i === 0"
            :is-last-subnode="i === node.nodes.length - 1"
            :expanded.sync="subnode.expanded"
            @select-option="selectOption"
          />
        </template>

        <div v-else class="-ml-20 flex">
          <div
            v-for="(subnodeChunk, i) in chunkedSubnodes"
            :key="i"
            :class="{
              // first node has padding-left
              'pl-20': i === 0,
              // every node except second last has padding-right
              'pr-14': i < chunkedSubnodes.length - 2,
              // every node except last has border-top
              'x-border-blue border-t-2': i !== chunkedSubnodes.length - 1,
              // last node has extra class to attach pseudo and some spacings
              'last-chunk relative ml-20 mt-20 pt-2':
                i === chunkedSubnodes.length - 1
            }"
          >
            <FilterPageNode
              v-for="(subnode, j) in subnodeChunk"
              :key="subnode.id"
              :node="subnode"
              :selected-options="selectedOptions"
              is-subnode
              is-chunked
              :disabled="disabled"
              :is-first-subnode="j === 0"
              :is-last-subnode="j === subnodeChunk.length - 1"
              :from-last-chunk="i === chunkedSubnodes.length - 1"
              :expanded.sync="subnode.expanded"
              @select-option="selectOption"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { chunk, isEqual } from 'lodash-es'

import AppCheckbox from '~/components/AppCheckbox.vue'
import ButtonCirclePlusMinus from '~/components/ButtonCirclePlusMinus.vue'

export default {
  name: 'FilterPageNode',

  components: {
    AppCheckbox,
    ButtonCirclePlusMinus
  },

  props: {
    node: { type: Object, required: true },
    selectedOptions: { type: Array, required: true },
    expanded: { type: Boolean, default: false },
    isSubnode: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    isFirstSubnode: { type: Boolean, default: false },
    isLastSubnode: { type: Boolean, default: false },
    isChunked: { type: Boolean, default: false },
    fromLastChunk: { type: Boolean, default: false }
  },

  computed: {
    hasSubnodes() {
      return this.node.nodes && this.node.nodes.length > 0
    },

    chunkedSubnodes() {
      return this.node.childPerColumn
        ? chunk(this.node.nodes, this.node.childPerColumn)
        : this.node.nodes
    }
  },

  methods: {
    selectOption(option) {
      this.$emit('select-option', option)
    },

    ifOptionSelected(option) {
      return this.selectedOptions.some(o => isEqual(o, option))
    },

    emitUpdateExpanded() {
      this.$emit('update:expanded', !this.expanded)
    }
  }
}
</script>

<style>
.x-border-blue {
  border-color: #868cb5;
}

.subnode-header::before {
  content: '';
  height: 2px;
  width: 16px;
  background: #868cb5;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
}

.subnode-header--first::before {
  width: 32px;
}

.subnode-header--last::before {
  content: '';
  height: 43px;
  width: 19px;
  border: 2px solid #868cb5;
  background: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
  border-bottom-left-radius: 6px;
  position: absolute;
  top: 50%;
  left: 1px;
  transform: translate(-100%, -100%);
}

.subnode-header--last.subnode-header--chunked-first::before {
  height: 26px;
  width: 17px;
  left: 1px;
}

.last-chunk::before {
  content: '';
  height: 24px;
  width: 24px;
  border: 2px solid #868cb5;
  background: transparent;
  border-left-color: transparent;
  border-bottom-color: transparent;
  border-top-right-radius: 6px;
  position: absolute;
  top: -20px;
  left: -22px;
}
</style>
