<template>
  <Swiper v-bind="swiperProps as any">
    <SwiperSlide
      v-for="(item, index) in items"
      v-slot="slotProps: SlideSlotProps"
      :key="index"
      :style="slideStyles"
    >
      <slot
        name="slide"
        v-bind="slotProps"
        :item="item as any"
        :index="index as number"
      ></slot>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/mousewheel'
import 'swiper/css/free-mode'

import { merge } from 'lodash-es'
import SwiperCore, { FreeMode, Mousewheel, SwiperOptions } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, PropType } from 'vue'

SwiperCore.use([Mousewheel, FreeMode])

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SlideSlotProps = {
  isActive: boolean
  isPrev: boolean
  isNext: boolean
  isVisible: boolean
  isDuplicate: boolean
}

type VueSwiperVendorProps = SwiperOptions & {
  tag: string
  wrapperTag: string
}

const props = defineProps({
  vendorProps: {
    type: Object as PropType<Partial<VueSwiperVendorProps>>,
    default: undefined
  },
  items: { type: Array, required: true },
  slideWidth: { type: String, default: 'max-content' }
})

const swiperAppDefaultProps: Partial<VueSwiperVendorProps> = {
  slidesPerView: 'auto',
  slidesPerGroup: 1,
  spaceBetween: 0
}

const swiperProps = computed(() => {
  return merge<
    Partial<VueSwiperVendorProps>,
    Partial<VueSwiperVendorProps> | undefined
  >(swiperAppDefaultProps, props.vendorProps)
})

const slideStyles = computed(() => ({
  width: props.slideWidth
}))
</script>
