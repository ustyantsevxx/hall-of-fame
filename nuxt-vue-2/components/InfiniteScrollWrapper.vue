<template>
  <CustomScrollbarWrapper
    ref="infiniteScrollWrapper"
    class="flex h-full flex-col overflow-y-auto overflow-x-hidden overscroll-contain"
  >
    <slot></slot>
    <hr ref="bottomBoundary" />
  </CustomScrollbarWrapper>
</template>

<script>
import CustomScrollbarWrapper from '~/components/CustomScrollbarWrapper.vue'

export default {
  components: {
    CustomScrollbarWrapper
  },

  props: {
    offset: { type: Number, default: 300 }
  },

  data() {
    return {
      observerInstance: undefined
    }
  },

  computed: {
    bottomBoundaryRef() {
      return this.$refs.bottomBoundary
    },

    infiniteScrollWrapperRef() {
      return this.$refs.infiniteScrollWrapper.$el
    }
  },

  async mounted() {
    await this.$nextTick()
    if (this.bottomBoundaryRef) {
      this.observeBottomBoundary()
    }
  },

  methods: {
    out_scrollToTop() {
      this.$refs.infiniteScrollWrapper.scrollingElement.scrollTop = 0
    },

    observeBottomBoundary() {
      this.observerInstance = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            this.$emit('bottom-reached')
          }
        },
        {
          root: this.infiniteScrollWrapperRef,
          rootMargin: `0px 0px ${this.offset}px`,
          threshold: 0
        }
      )

      this.observerInstance.observe(this.bottomBoundaryRef)
    }
  }
}
</script>
