<template>
  <VSelect
    ref="select"
    :class="{
      invalid,
      'not-clearable': notClearable,
      'arrow-hidden': arrowHidden,
      'search-focused': searchInputFocused
    }"
    :clearable="!notClearable"
    :components="{
      OpenIndicator: 'SVGIcon16ArrowDown1',
      Deselect: 'SVGDropdownClear'
    }"
    :disabled="disabled"
    :options="options"
    :close-on-select="!noCloseOnSelect"
    :clear-search-on-select="!noClearSearchOnSelect"
    :clear-search-on-blur="() => clearSearchOnBlur"
    :loading="loading"
    :placeholder="placeholder"
    :searchable="!notSearchable"
    :multiple="multiple"
    :label="labelKey"
    :dropdown-should-open="dropdownShouldOpen"
    :get-option-label="labelFormatter"
    :filter-by="filterByFuzzySearch"
    :style="{
      '--vs-dropdown-min-width': 'auto',
      '--vs-dropdown-max-height': dropdownHeight
    }"
    :value="value"
    :reduce="option => getTrackBy(option)"
    transition="default-fade"
    @input="option => $emit('input', option)"
    @search="handleSearch"
    @search:focus="searchInputFocused = true"
    @search:blur="searchInputFocused = false"
  >
    <template #option="option">
      <div class="flex items-center space-x-6" :title="getOptionLabel(option)">
        <SVGSmallBlueCircle
          :class="{ '!visible': checkBySelectedFn(option) }"
          class="selected-indicator invisible"
        />
        <span class="overflow-x-hidden text-ellipsis whitespace-nowrap">
          <TextHighlight
            :queries="[searchValue, ...searchValue.split('')]"
            highlight-class="!font-bold !text-white !bg-transparent"
          >
            {{ getOptionLabel(option) }}
          </TextHighlight>
        </span>
      </div>
    </template>

    <template #no-options="{ search, searching }">
      {{ searching ? noResultsTextFn(search) : noOptionsText }}
    </template>

    <template #spinner="scope">
      <AppTransition>
        <div class="loader">
          <SVGIcon24Spinner v-if="scope.loading" class="animate-spin" />
        </div>
      </AppTransition>
    </template>

    <template #search="{ attributes, events }">
      <input
        class="vs__search"
        :[$options.FOCUS_ON_SLASH_INPUT_ATTR]="focusOnSlash ? '' : false"
        v-bind="attributes"
        v-on="events"
      />
    </template>
  </VSelect>
</template>

<script>
import 'vue-select/dist/vue-select.css'

import fuzzy from 'fuzzy'
import VSelect from 'vue-select'
import TextHighlight from 'vue-text-highlight'

import AppTransition from '~/components/AppTransition.vue'
import { FOCUS_ON_SLASH_INPUT_ATTR } from '~/plugins/focus-on-slash'

export default {
  FOCUS_ON_SLASH_INPUT_ATTR,

  components: {
    VSelect,
    TextHighlight,
    AppTransition
  },

  props: {
    value: { type: null, default: null },
    loading: { type: Boolean, default: false },
    options: { type: Array, default: () => [] },
    labelKey: { type: String, default: 'label' },
    labelFormatter: { type: Function, default: undefined },
    notSearchable: { type: Boolean, default: false },
    notClearable: { type: Boolean, default: false },
    noCloseOnSelect: { type: Boolean, default: false },
    noClearSearchOnSelect: { type: Boolean, default: false },
    clearSearchOnBlur: { type: Boolean, default: false },
    arrowHidden: { type: Boolean, default: false },
    noDropdownMaxHeight: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    placeholder: { type: String, default: 'Select' },
    dropdownHeight: { type: String, default: '120px' },
    selectedFn: { type: Function, default: undefined },
    openWithSearchOnly: { type: Boolean, default: false },
    trackBy: { type: [String, Function], default: undefined },
    focusOnSlash: { type: Boolean, default: false },

    noOptionsText: {
      type: String,
      default() {
        return this.$t('no-options')
      }
    },

    noResultsTextFn: {
      type: Function,
      default(searchValue) {
        return this.$t('no-results-for-search-value', { searchValue })
      }
    }
  },

  data() {
    return {
      searchValue: '',
      searchInputFocused: false
    }
  },

  computed: {
    dropdownShouldOpen() {
      return this.openWithSearchOnly
        ? vueSelectInstance =>
            this.searchValue !== '' &&
            this.searchInputFocused &&
            vueSelectInstance.filteredOptions.length > 0
        : undefined
    }
  },

  methods: {
    getTrackBy(option) {
      switch (typeof this.trackBy) {
        case 'function':
          return this.trackBy(option)
        case 'string':
          return option[this.trackBy]
        default:
          return option
      }
    },

    getOptionLabel(option) {
      if (typeof option === 'object') {
        if (typeof this.labelFormatter === 'function') {
          return this.labelFormatter(option)
        }

        return option[this.labelKey]
      }

      return option
    },

    checkBySelectedFn(option) {
      if (typeof this.selectedFn === 'function') {
        return this.selectedFn(option)
      }
    },

    filterByFuzzySearch(_option, label, searchValue) {
      return fuzzy.test(searchValue, label)
    },

    handleSearch(searchValue) {
      this.searchValue = searchValue
      if (this.searchInputFocused) {
        this.$emit('search', searchValue)
      }
    }
  }
}
</script>

<style>
.loader {
  @apply absolute right-8 shift-center-y;
}

.vs__dropdown-toggle {
  @apply !rounded-6 !border !bg-transparent !py-0  transition;
}

.v-select {
  @apply transition;
}

.v-select:not(.invalid) .vs__dropdown-toggle,
.v-select.invalid.vs--disabled .vs__dropdown-toggle {
  @apply !border-white;
}

.invalid:not(.vs--disabled) .vs__dropdown-toggle {
  @apply !border-red;
}

.vs--disabled {
  @apply !cursor-not-allowed opacity-40;
}

.vs__selected-options {
  @apply truncate !py-11;
}

.vs--open:not(.invalid) .vs__dropdown-toggle {
  @apply !border-cyan;
}

.vs__dropdown-menu {
  @apply my-4 !rounded-6 !border-0 bg-light-30 !p-12;
}

.vs__actions {
  @apply !p-0 !pr-12;
}

.vs__dropdown-option {
  @apply !rounded-4 !py-7 !px-6  !transition !text-input;
}

.vs__dropdown-option--selected .selected-indicator {
  @apply !visible;
}

.vs__dropdown-option--highlight {
  @apply bg-light-40;
}

.v-select:not(.vs--open) .vs__selected + .vs__search {
  @apply !p-0;
}

.vs__selected,
.vs__search,
.vs__search:focus {
  @apply !m-0 !truncate !border-0 !bg-transparent !p-0 !pl-12 !text-white !transition !text-input;
}

.vs__selected {
  @apply block w-full;
}

.vs__search {
  @apply placeholder:text-white/60;
}

.v-select:not(.not-clearable) .vs__clear {
  @apply pointer-events-none !mr-0  !block rounded-6 !bg-transparent p-10 opacity-0 ring-inset !transition;
}

.vs__clear:not([style*='display: none;']) {
  @apply !pointer-events-auto !block !opacity-100 hover:!opacity-70;
}

.vs__open-indicator {
  @apply !bg-transparent !transition;
}

.v-select.arrow-hidden .vs__open-indicator {
  @apply hidden opacity-0;
}

.vs__no-options {
  @apply break-words !text-white/40 !text-input;
}

.vs--single.vs--searching:not(.vs--open):not(.vs--loading) .vs__search {
  @apply !opacity-100;
}
</style>
