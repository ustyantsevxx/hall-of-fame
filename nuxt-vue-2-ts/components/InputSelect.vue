<template>
  <div v-on-clickaway="close" class="relative x-dropdown" :class="[size]">
    <div
      class="flex flex-col transition-colors duration-150 ease-in-out"
      :class="{
        'border-gray-100 ': !opened,
        'border-blue': opened,
        'border-b': !hideUnderline
      }"
    >
      <p v-if="label" class="mb-3 text-description text-gray">{{ label }}</p>

      <button
        type="button"
        class="flex justify-between items-center w-full appearance-none selected-option"
        :class="[selectedOptionClasses]"
        @click="toggle"
      >
        <div
          v-if="selectedOption"
          class="overflow-hidden overflow-ellipsis whitespace-nowrap"
          :title="selectedOption[labeledBy]"
        >
          <slot name="selected-option-label">
            {{ selectedOption[labeledBy] }}
          </slot>
        </div>

        <span v-else-if="placeholder" class="text-gray-500">
          {{ placeholder }}
        </span>

        <DropdownArrowSVG
          class="transition-transform duration-150 ease-in-out transform cursor-pointer arrow"
          :class="{
            'rotate-180': opened
          }"
        />
      </button>
    </div>

    <Transition name="x-dropdown-fade">
      <ul
        v-if="opened"
        class="overflow-y-auto overscroll-contain absolute z-10 py-10 w-full bg-white dropdown x-dropdown-shadow"
        :style="dropdownStyles"
      >
        <li
          v-for="(option, i) in options"
          :key="i"
          class="transition-colors duration-150 x-dropdown-option"
          :class="{
            'text-blue x-dropdown-option--selected': value === option[trackedBy]
          }"
        >
          <div
            tabindex="0"
            role="button"
            class="overflow-hidden w-full text-left overflow-ellipsis whitespace-nowrap option"
            :class="{
              'cursor-default': value === option[trackedBy]
            }"
            :disabled="value === option[trackedBy]"
            :title="option[labeledBy]"
            @click="select(option)"
            @keypress.enter.space.prevent="select(option)"
          >
            {{ option[labeledBy] }}
          </div>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { directive as onClickaway } from 'vue-clickaway'

import DropdownArrowSVG from '~/assets/svg/dropdown-arrow.svg'

type DropdownInputSizeType = 'lg' | 'md' | 'sm'

@Component({
  components: {
    DropdownArrowSVG
  },

  directives: {
    onClickaway
  }
})
export default class InputSelect extends Vue {
  @Model('change', { type: [Object, Number, String, Symbol] }) value!: any

  @Prop({ type: Array, default: () => [] }) options!: any[]
  @Prop({ type: Number, default: 7 }) visibleCount!: number
  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: String, default: '' }) placeholder!: string
  @Prop({ type: String, default: 'value' }) trackedBy!: string
  @Prop({ type: String, default: 'label' }) labeledBy!: string

  @Prop({ type: Object, default: () => ({ 'text-blue': true }) })
  selectedOptionClasses!: Object

  @Prop({ type: String, default: 'lg' }) size!: DropdownInputSizeType

  @Prop({ type: Boolean, default: false }) hideUnderline!: boolean

  opened = false

  @Watch('opened')
  onOpenedChanged(value: boolean) {
    this.$emit(value ? 'open' : 'close')
  }

  get dropdownStyles() {
    const height =
      this.options.length > this.visibleCount
        ? `${this.visibleCount * 40}px`
        : undefined

    return {
      height
    }
  }

  get selectedOption() {
    return this.options.find(option => option[this.trackedBy] === this.value)
  }

  close() {
    this.opened = false
  }

  toggle() {
    this.opened = !this.opened
  }

  select(option) {
    this.opened = false
    this.$emit('change', option[this.trackedBy])
  }
}
</script>

<style scoped>
.x-dropdown-shadow {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.x-dropdown-option {
  @apply transition-colors hover:bg-[#fafafa] active:bg-[#f7f7f7];
}

.x-dropdown-option--selected {
  background-color: #f5f5f5 !important;
}

.x-dropdown-fade-enter-active,
.x-dropdown-fade-leave-active {
  transition-property: transform, opacity;
  transition: 150ms ease-in-out;
}

.x-dropdown-fade-leave-to,
.x-dropdown-fade-enter {
  opacity: 0;
  transform: translateY(2px);
}

.x-dropdown {
  &.lg {
    .selected-option {
      @apply pb-22 text-subtitle;
    }

    .option {
      @apply px-20 py-12;
    }

    .arrow {
      @apply w-18 ml-10 mr-10;
    }

    .dropdown {
      @apply mt-20;
    }
  }

  &.md {
    .selected-option {
      @apply pb-10 text-description;
    }

    .option {
      @apply px-10 py-10;
    }

    .arrow {
      @apply w-10 ml-3 mr-7;
    }

    .dropdown {
      @apply mt-0;
    }
  }

  &.sm {
    .selected-option {
      @apply pb-0 text-description;
    }

    .option {
      @apply px-10 py-10 text-description;
    }

    .arrow {
      @apply w-10 ml-3 mr-7;
    }

    .dropdown {
      @apply mt-0;
    }
  }
}
</style>
