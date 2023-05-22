<template>
  <div class="rounded-6 border border-light-20 py-14 px-16">
    <div v-if="!editing" class="flex items-center justify-between">
      <div class="flex grow items-center space-x-8 rounded-4">
        <NuxtLink
          class="transition text-h2 hover:text-white/60"
          :title="$t('view-item-msm-name-info', [name])"
          :to="`/batteries/${item.msm.id}`"
        >
          {{ name }}
        </NuxtLink>

        <button
          :title="$t('edit-item-msm-name-name', [name])"
          @click="startEditing"
        >
          <SVGIcon16Edit
            class="edit-svg text-white/60 transition hover:text-white"
          />
        </button>
      </div>

      <BadgeState>{{ displayedStatus }}</BadgeState>
    </div>

    <form
      v-else
      class="flex justify-between border-b border-light-20 pb-4 focus-within:border-cyan"
      @submit.prevent="saveNewName"
    >
      <label for="msm-name-input" class="grow">
        <input
          id="msm-name-input"
          ref="input"
          v-model="newName"
          enterkeyhint="done"
          placeholder="MSM name"
          class="w-full border-t bg-transparent !ring-0 text-h3"
          type="text"
        />
      </label>

      <FormCheckCancelButtons
        :submit-disabled="!newName"
        @cancel="editing = false"
      />
    </form>

    <p class="mt-10 text-white/60 text-main">{{ item.msm.serial }}</p>

    <DashboardBatteriesTableSscsCell class="mt-16" :battery="item" />

    <dl class="mt-16 flex space-x-4">
      <BatteryCardInfoItem
        :label="$t('voltage-0')"
        :value="formatMinMaxValuesFromObject(item.average_bus_voltage)"
      />
      <BatteryCardInfoItem
        :label="$t('min-soc')"
        :value="item.min_ssc_soc || '—'"
      />
      <BatteryCardInfoItem
        :label="$t('t-min-max')"
        :value="formatMinMaxValuesFromObject(item.temperatures_extremum)"
      />
    </dl>
  </div>
</template>

<script>
import BadgeState from '~/components/BadgeState.vue'
import BatteryCardInfoItem from '~/components/BatteryCardInfoItem.vue'
import DashboardBatteriesTableSscsCell from '~/components/DashboardBatteriesTableSscsCell.vue'
import FormCheckCancelButtons from '~/components/FormCheckCancelButtons.vue'
import { MSM_STATUS_KEYS } from '~/logic/modules/msms/msms.constants'
import { MsmsService } from '~/logic/modules/msms/msms.service'

export default {
  components: {
    BadgeState,
    DashboardBatteriesTableSscsCell,
    BatteryCardInfoItem,
    FormCheckCancelButtons
  },

  props: {
    item: { type: Object, required: true }
  },

  data() {
    return {
      editing: false,
      name: this.item.msm.name,
      newName: ''
    }
  },

  computed: {
    displayedStatus() {
      const localeStatusMap = {
        [MSM_STATUS_KEYS.ENABLED]: this.$t('enabled'),
        [MSM_STATUS_KEYS.CONNECTED]: this.$t('connected'),
        [MSM_STATUS_KEYS.STANDBY]: this.$t('standby')
      }

      return localeStatusMap[this.item.msm_status] ?? '—'
    }
  },

  methods: {
    formatMinMaxValuesFromObject(obj) {
      return obj ? `${obj.min ?? '—'}/${obj.max ?? '—'}` : '—'
    },

    async startEditing() {
      this.editing = true
      this.newName = this.name
      await this.$nextTick()
      this.$refs.input.focus()
    },

    async saveNewName() {
      const { success } = await MsmsService.updateMsmName(
        this.item.msm.id,
        this.newName
      )

      if (success) {
        this.name = this.newName
        this.editing = false
      }
    }
  }
}
</script>
