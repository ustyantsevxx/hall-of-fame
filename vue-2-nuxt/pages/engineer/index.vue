<template>
  <DefaultLayout wrapper-class="overflow-hidden">
    <div
      class="grid grow grid-cols-12 gap-12 overflow-hidden"
      style="grid-template-rows: minmax(175px, 1.5fr) minmax(175px, 1fr)"
    >
      <DashboardBatteriesSection class="col-span-8" />
      <DashboardAlarmsSection class="col-span-4" />
      <DashboardTraceRequestsSection class="col-span-12" />
    </div>
  </DefaultLayout>
</template>

<script>
import DashboardAlarmsSection from '~/components/DashboardAlarmsSection.vue'
import DashboardBatteriesSection from '~/components/DashboardBatteriesSection.vue'
import DashboardTraceRequestsSection from '~/components/DashboardTraceRequestsSection.vue'
import DefaultLayout from '~/components/DefaultLayout.vue'

export default {
  components: {
    DashboardAlarmsSection,
    DashboardBatteriesSection,
    DashboardTraceRequestsSection,
    DefaultLayout
  },

  middleware({ redirect, route }) {
    // ditch '?standalone=true' param if run in PWA mode
    if (route.query.standalone) {
      redirect('/')
    }
  },

  head() {
    return {
      title: this.$t('dashboard')
    }
  }
}
</script>
