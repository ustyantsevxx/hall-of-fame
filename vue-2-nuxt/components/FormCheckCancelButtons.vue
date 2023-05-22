<template>
  <div class="flex" :class="{ 'space-x-8': !iconsOnly }">
    <button
      class="shrink-0 rounded-4 p-8 transition disabled:opacity-60"
      :class="{
        'bg-light-20 hover:bg-light-10  active:bg-light-10': !iconsOnly
      }"
      :disabled="submitDisabled"
      type="submit"
      :title="$t('submit')"
      @click.stop
    >
      <SVGIcon16CheckMark />
    </button>

    <button
      type="button"
      :title="$t('cancel-5')"
      class="shrink-0 rounded-4 border p-7 transition"
      :class="{
        'border-light-20 hover:border-light-10 active:border-light-10': !iconsOnly
      }"
      @click.stop="$emit('cancel')"
    >
      <SVGIcon16Close />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    submitDisabled: { type: Boolean, default: false },
    iconsOnly: { type: Boolean, default: false }
  }
}
</script>
