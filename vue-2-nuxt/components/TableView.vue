<template>
  <LayoutSection
    class="table-page relative flex max-h-full grow flex-col overflow-hidden"
  >
    <Transition name="loader-badge-long-fade" appear>
      <BadgeLoaderConnection
        v-if="loading && !error"
        class="absolute left-1/2 top-[173px] z-50 flex -translate-x-1/2 items-center space-x-10 rounded-6 bg-light-30 px-20 py-12"
      />
    </Transition>

    <div
      class="flex items-center justify-between px-16 py-8 sm:min-h-[81px] sm:pr-28 sm:pl-24"
    >
      <div v-if="!noTitle" class="flex items-center">
        <h2 class="text-h2 sm:text-h1">
          <slot name="title" v-bind="slotBindings">{{ title }}</slot>
        </h2>

        <div>
          <slot name="after-title" v-bind="slotBindings"></slot>
        </div>
      </div>

      <div
        class="relative flex items-center"
        :class="[
          toolbarClass,
          {
            'pointer-events-none opacity-40': !fetchedFirstTime,
            'transition-opacity': !transitionsDisabled
          }
        ]"
      >
        <slot name="toolbar" v-bind="slotBindings"></slot>
      </div>
    </div>

    <div
      class="relative flex items-center justify-between pr-28 pl-24"
      :class="[
        toolbarClass,
        {
          'pointer-events-none opacity-40': !fetchedFirstTime,
          'transition-opacity': !transitionsDisabled
        }
      ]"
    >
      <div class="flex items-center">
        <slot name="second-toolbar" v-bind="slotBindings"></slot>
      </div>
    </div>

    <div class="relative h-full overflow-hidden">
      <AppTransition>
        <ErrorMessageOverlay v-if="error" class="absolute pt-64 shift-center" />
      </AppTransition>

      <slot name="table" v-bind="slotBindings"></slot>
    </div>
  </LayoutSection>
</template>

<script>
import dayjs from 'dayjs'
import { debounce, isEqual } from 'lodash-es'

import AppTransition from '~/components/AppTransition.vue'
import BadgeLoaderConnection from '~/components/BadgeLoaderConnection.vue'
import ErrorMessageOverlay from '~/components/ErrorMessageOverlay.vue'
import LayoutSection from '~/components/LayoutSection.vue'

export default {
  components: {
    LayoutSection,
    BadgeLoaderConnection,
    ErrorMessageOverlay,
    AppTransition
  },

  props: {
    fetchFn: { type: Function, required: true },
    title: { type: String, default: undefined },
    params: { type: Object, default: undefined },
    transitionsDisabled: { type: Boolean, default: false },
    toolbarClass: { type: null, default: undefined },
    noTitle: { type: Boolean, default: false }
  },

  data() {
    return {
      response: null,
      items: [],
      currentPage: 1,
      totalPages: 1,
      totalItems: null,
      fetchedFirstTime: false,
      paramsWatchDisabled: false,
      error: false,
      loading: true
    }
  },

  async fetch() {
    await this.applyInitialParamsFromQuery()
    await this._fetch()
  },

  computed: {
    slotBindings() {
      return {
        response: this.response,
        items: this.items,
        applySort: this.applySort,
        fetchNextPage: this.fetchNextPage,
        deleteItem: this.deleteItem,
        updateItem: this.updateItem,
        patchItem: this.patchItem,
        swapItems: this.swapItems,
        loading: !this.fetchedFirstTime || this.loading,
        reset: this.reset,
        meta: {
          currentPage: this.currentPage,
          totalPages: this.totalPages,
          totalItems: this.totalItems
        },

        applyParam: this.applyParam,
        debounceApplyParam: this.debounceApplyParam,
        debounceApplyTimeRange: this.debounceApplyTimeRange
      }
    },

    hasNextPage() {
      return this.currentPage !== this.totalPages
    }
  },

  watch: {
    params: {
      deep: true,
      async handler() {
        if (!this.paramsWatchDisabled) {
          await this._fetch()
          this.$emit('filtered')
        }
      }
    }
  },

  methods: {
    async reset() {
      this.currentPage = 1
      this.totalPages = 1
      await this._fetch()
      this.$emit('reset')
    },

    out_fetch() {
      this._fetch()
    },

    async _fetch() {
      if (this.$nuxt.isOffline) {
        return
      }

      try {
        this.loading = true
        const response = await this.fetchFn(this.params)
        this.response = response
        this.items = response.items
        this.currentPage = response.meta.current_page
        this.totalPages = response.meta.last_page
        this.totalItems = response.meta.total

        if (!this.fetchedFirstTime) {
          this.fetchedFirstTime = true
        }
        this.loading = false
      } catch {
        this.error = true
      }
    },

    patchParams(params) {
      const patchedParams = { ...this.params, ...params }
      const changed = !isEqual(this.params, patchedParams)
      if (changed) {
        this.emitUpdateParams(patchedParams)
      }
    },

    emitUpdateParams(params) {
      this.$emit('update:params', params)
    },

    applyParam(value) {
      this.patchParams(value)
      this.$emit('filtered')
    },

    debounceApplyParam: debounce(function (value) {
      this.applyParam(value)
    }, 2000),

    debounceApplyTimeRange: debounce(function (date, timeRange) {
      if (!timeRange) {
        this.patchParams({
          from: null,
          to: null
        })
      }

      const dateInstance = dayjs(date)

      const from = dateInstance.add(
        this.objectAsSeconds(timeRange.from),
        'seconds'
      )
      const to = dateInstance.add(this.objectAsSeconds(timeRange.to), 'seconds')

      this.patchParams({
        from: from.unix(),
        to: to.unix()
      })
    }, 2000),

    applySort({ key, asc }) {
      this.patchParams({
        order_by: key,
        order_direction: asc ? 'asc' : 'desc'
      })
    },

    async applyInitialParamsFromQuery() {
      const suitableInitialParamsFromQuery = Object.fromEntries(
        Object.entries(this.$route.query).filter(([paramName]) =>
          Object.keys(this.params).includes(paramName)
        )
      )

      if (Object.keys(suitableInitialParamsFromQuery).length > 0) {
        this.paramsWatchDisabled = true
        this.patchParams(suitableInitialParamsFromQuery)
        this.$router.replace({ query: undefined })
        await this.$nextTick() // wait for params to be applied
        this.paramsWatchDisabled = false
      }
    },

    appendItems(items) {
      this.items = [...this.items, ...items]
    },

    objectAsSeconds(obj) {
      return obj.hours * 3600 + obj.minutes * 60 + obj.seconds
    },

    async fetchNextPage() {
      if (!this.hasNextPage) {
        return
      }

      const { items } = await this.fetchFn({
        page: ++this.currentPage,
        ...this.params
      })

      this.appendItems(items)
    },

    updateItem(id, updatedItem) {
      const indexToUpdate = this.items.findIndex(item => item.id === id)
      this.$set(this.items, indexToUpdate, updatedItem)
    },

    patchItem(idOrFindCallback, patchCallback) {
      const item = this.items.find(item => {
        return typeof idOrFindCallback === 'number'
          ? item.id === idOrFindCallback
          : idOrFindCallback(item)
      })
      patchCallback(item)
    },

    deleteItem(id) {
      this.items = this.items.filter(item => item.id !== id)
    },

    swapItems(firstId, secondId) {
      const firstIndex = this.items.findIndex(item => item.id === firstId)
      const secondIndex = this.items.findIndex(item => item.id === secondId)

      const firstItem = { ...this.items[firstIndex] }
      this.$set(this.items, firstIndex, this.items[secondIndex])
      this.$set(this.items, secondIndex, firstItem)
    }
  }
}
</script>

<style>
.loader-badge-long-fade-enter-active,
.loader-badge-long-fade-leave-active {
  transition: opacity 3000ms cubic-bezier(0.7, 0, 0.84, 0) !important;
}

.loader-badge-long-fade-leave-to,
.loader-badge-long-fade-enter {
  @apply !opacity-0 !duration-150;
}

.table-page .simplebar-track {
  @apply !mt-80;
}

.table-page .simplebar-content {
  @apply flex h-full grow flex-col;
}
</style>
