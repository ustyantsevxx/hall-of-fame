<template>
  <AppPopover
    popover-class="table-popover pt-24 pl-24"
    :vendor-props="{
      boundariesElement: 'body',
      placement: 'top',
      trigger: 'hover click',
      delay: { show: 300, hide: 150 }
    }"
  >
    <template #toggle>
      <button
        class="popover-toggle w-max cursor-pointer border-b border-dashed border-white/40 pb-4 outline-none ring-offset-4 ring-offset-light transition hover:border-white/60"
        aria-haspopup="true"
      >
        {{
          $t('count-values', {
            count: formattedVariables.length
          })
        }}
      </button>
    </template>

    <template #body>
      <p class="font-medium text-h2">{{ $t('request-parameters') }}</p>

      <div class="overflow-y-auto pb-24 pr-24" style="max-height: 360px">
        <div
          v-if="formattedSscsWithModules.length"
          class="mt-12 grid grid-flow-row gap-x-10 text-main"
          style="grid-template-columns: max-content 1fr"
        >
          <template v-for="ssc in formattedSscsWithModules">
            <div :key="ssc.id + 'key'" class="mt-12">{{ ssc.name }}</div>

            <div
              v-if="ssc.modules"
              :key="ssc.id + 'value'"
              class="mt-10 truncate py-2 text-white/40"
              :title="ssc.modules"
            >
              ({{ ssc.modules }})
            </div>
          </template>
        </div>

        <dl
          v-if="formattedVariables.length"
          class="mt-12 grid grid-flow-row gap-x-10 text-main"
          style="grid-template-columns: max-content 1fr"
          :aria-label="$t('variable-list')"
        >
          <template v-for="variable in formattedVariables">
            <dt :key="variable.code" class="mt-12">{{ variable.code }}</dt>

            <dd
              :key="variable.name"
              class="mt-10 truncate py-2 text-white/40"
              :title="variable.name"
            >
              {{ variable.name }}
            </dd>
          </template>
        </dl>
      </div>
    </template>
  </AppPopover>
</template>

<script>
import AppPopover from '~/components/AppPopover.vue'
import { DATA_ITEM_MAP } from '~/logic/constants'
import { getUid } from '~/logic/utils'

export default {
  components: { AppPopover },

  props: {
    traceRequest: { type: Object, required: true }
  },

  computed: {
    formattedSscsWithModules() {
      return this.traceRequest.sscs.map(ssc => ({
        id: getUid(),
        name: `SSC ${ssc.slot + 1}`,
        modules: ssc.modules.map(module => `M${module + 1}`).join(', ')
      }))
    },

    formattedVariables() {
      return this.traceRequest.variables.map(code => ({
        code,
        name: DATA_ITEM_MAP[code]
      }))
    }
  }
}
</script>

<style>
.v-popover.open .popover-toggle {
  @apply border-white/60 !important;
}

.table-popover {
  max-height: 400px;
  min-width: 200px;
  max-width: 300px;
}
</style>
