<template>
  <DefaultLayout wrapper-class="sm:overflow-hidden">
    <LayoutSection class="flex flex-col overflow-hidden">
      <CustomScrollbarWrapper class="h-full">
        <AppWysiwygEditorRenderer class="!p-16 sm:!p-40" :content="content" />
      </CustomScrollbarWrapper>
    </LayoutSection>
  </DefaultLayout>
</template>

<script>
import AppWysiwygEditorRenderer from '~/components/AppWysiwygEditorRenderer.vue'
import CustomScrollbarWrapper from '~/components/CustomScrollbarWrapper.vue'
import DefaultLayout from '~/components/DefaultLayout.vue'
import LayoutSection from '~/components/LayoutSection.vue'

export default {
  components: {
    LayoutSection,
    AppWysiwygEditorRenderer,
    CustomScrollbarWrapper,
    DefaultLayout
  },

  head() {
    return {
      title: this.$t('support-contacts')
    }
  },

  computed: {
    content() {
      return this.$auth.user.support_contacts
    }
  }
}
</script>
