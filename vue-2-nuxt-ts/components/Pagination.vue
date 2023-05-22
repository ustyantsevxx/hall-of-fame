<template>
  <Paginate
    :value="value"
    :page-count="pageCount"
    :page-range="5"
    prev-text=""
    next-text=""
    container-class="flex"
    active-class="x-page--active"
    disabled-class="x-page--disabled"
    page-link-class="pt-11 px-19 rounded-10 text-blue block pb-12 transition-colors duration-150 ease-in-out border border-transparent transition-colors hover:text-red active:text-red/80"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'nuxt-property-decorator'
import Paginate from 'vuejs-paginate'

@Component({
  components: {
    Paginate
  }
})
export default class Pagination extends Vue {
  @Model('input', { type: Number, default: 1 }) value!: number

  @Prop({ type: Number, required: true }) pageCount!: number
  @Prop({ type: Boolean, default: false }) useQuery!: boolean

  handleInput(newPage: number) {
    this.$emit('input', newPage)

    if (this.useQuery) {
      this.$router.push({
        path: this.$route.fullPath,
        query: {
          p: newPage.toString()
        }
      })
    }
  }
}
</script>

<style>
.x-page--active a {
  @apply !text-black hover:!text-black cursor-default border-gray-100 !important;
}

.x-page--disabled a {
  @apply outline-none;
}
</style>
