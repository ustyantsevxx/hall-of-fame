<template>
  <InfiniteScrollWrapper @bottom-reached="$emit('bottom-reached')">
    <AppTable
      :fields="fields"
      :items="tableItems"
      :loading="loading"
      :empty-text="$t('no-batteries')"
      :row-class-fn="
        item => ({
          'opacity-30': item.msm && !item.is_active,
          'cursor-pointer': item.msm,
          '!bg-light': item.project
        })
      "
      @row-click="goToBatteryPageIfPossible"
    >
      <template #cell(name)="{ definedOrHyphen, item }">
        <template v-if="item.msm">
          <div
            v-if="!editingBattery || editingBattery.id !== item.msm.id"
            class="flex items-center"
          >
            <p class="truncate" :title="item.msm.name">
              {{ definedOrHyphen(item.msm.name) }}
            </p>

            <button
              :title="$t('edit-battery-name')"
              class="ml-8 text-white/60 transition hover:text-white"
              @click.stop="startBatteryNameEdit(item.msm)"
            >
              <SVGIcon16Edit />
            </button>
          </div>

          <form
            v-else
            class="flex items-center"
            @submit.prevent="saveBatteryName"
          >
            <label for="battery-name-input">
              <input
                id="battery-name-input"
                v-model="editingBattery.name"
                type="text"
                class="w-[140px] rounded-4 border border-white bg-transparent py-7 px-10 ring-0 text-input focus:border-cyan"
                :placeholder="$t('battery-name-5')"
                @keydown.esc="editingBattery = null"
              />
            </label>

            <FormCheckCancelButtons
              class="ml-8"
              icons-only
              :submit-disabled="!editingBattery.name"
              @cancel="editingBattery = null"
            />
          </form>
        </template>

        <div v-else class="flex items-center">
          <div class="flex flex-col space-y-2 self-stretch">
            <button
              :title="$t('move-item-project-name-up', [item.project.name])"
              class="flex grow items-end pl-4 pr-8 text-white transition hover:text-white/60 disabled:text-white/20"
              :disabled="!item.canMoveUp"
              :class="{
                'pt-12':
                  !editingProject || editingProject.id !== item.project.id
              }"
              @click="moveProjectUp(item.project)"
            >
              <SVGSortButtonArrowUp />
            </button>

            <button
              :title="$t('move-item-project-name-down', [item.project.name])"
              class="flex grow pl-4 pr-8 text-white transition hover:text-white/60 disabled:text-white/20"
              :disabled="!item.canMoveDown"
              @click="moveProjectDown(item.project)"
            >
              <SVGSortButtonArrowDown />
            </button>
          </div>

          <div
            v-if="!editingProject || editingProject.id !== item.project.id"
            class="flex items-center pb-10 pt-22"
          >
            <p class="text-white/60 text-h3">
              {{ definedOrHyphen(item.project.name) }}
            </p>

            <button
              :title="$t('edit-project-name')"
              class="ml-8 text-white/60 transition hover:text-white"
              @click="startProjectNameEdit(item.project)"
            >
              <SVGIcon16Edit />
            </button>
          </div>

          <form
            v-else
            class="flex items-center pb-8 pt-8"
            @submit.prevent="saveProjectName"
          >
            <label for="project-name-input">
              <input
                id="project-name-input"
                v-model="editingProject.name"
                type="text"
                class="w-[200px] rounded-4 border border-white bg-transparent py-7 px-10 ring-0 text-input focus:border-cyan"
                :placeholder="$t('project-name-0')"
                @keydown.esc="editingProject = null"
              />
            </label>

            <FormCheckCancelButtons
              class="ml-8"
              icons-only
              :submit-disabled="!editingProject.name"
              @cancel="editingProject = null"
            />
          </form>
        </div>
      </template>

      <template #cell(serial)="{ definedOrHyphen, item }">
        <p v-if="item.msm" class="truncate" :title="item.msm.serial">
          {{ definedOrHyphen(item.msm.serial) }}
        </p>
        <p v-else>{{ definedOrHyphen(item.project.serial) }}</p>
      </template>

      <template #cell(sscs)="{ item }">
        <DashboardBatteriesTableSscsCell v-if="item.msm" :battery="item" />
      </template>

      <template #cell(msmStatus)="{ item }">
        <DashboardBatteriesTableMsmStatusCell v-if="item.msm" :battery="item" />
      </template>
    </AppTable>
  </InfiniteScrollWrapper>
</template>

<script>
import AppTable from '~/components/AppTable.vue'
import DashboardBatteriesTableMsmStatusCell from '~/components/DashboardBatteriesTableMsmStatusCell.vue'
import DashboardBatteriesTableSscsCell from '~/components/DashboardBatteriesTableSscsCell.vue'
import FormCheckCancelButtons from '~/components/FormCheckCancelButtons.vue'
import InfiniteScrollWrapper from '~/components/InfiniteScrollWrapper.vue'
import { MsmsService } from '~/logic/modules/msms/msms.service'
import { ProjectsService } from '~/logic/modules/projects/projects.service'

export default {
  components: {
    InfiniteScrollWrapper,
    AppTable,
    DashboardBatteriesTableSscsCell,
    DashboardBatteriesTableMsmStatusCell,
    FormCheckCancelButtons
  },

  props: {
    items: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false }
  },

  data() {
    return {
      editingProject: null,
      editingBattery: null
    }
  },

  computed: {
    tableItems() {
      const lastIndex = this.items.length - 1
      const result = this.items
        .map((item, i) => {
          const { msms: items, ...project } = item
          return [
            {
              project,
              canMoveDown: i < lastIndex,
              canMoveUp: i > 0
            },
            ...items
          ]
        })
        .flat()

      return result
    },

    fields() {
      return [
        {
          key: 'name',
          title: this.$t('battery-name-1'),
          width: 120,
          tdClass: item => ['!py-0', item.project && '!pl-20'],
          colspan: item => (item.project ? 7 : 1)
        },

        {
          key: 'serial',
          title: 'Serial number',
          width: 120,
          tdClass: '!py-9',
          hiddenIf: item => item.project
        },
        {
          key: 'sscs',
          title: 'SSC1-10, SoC, %',
          width: 150,
          class: '!pl-8',
          tdClass: '!py-9',
          hiddenIf: item => item.project
        },
        {
          key: 'average_bus_voltage',
          title: `${this.$t('voltage')}, V`,
          rightAligned: true,
          width: 60,
          tdClass: '!py-9',
          formatter: ({ average_bus_voltage }) => {
            return this.formatMinMaxValuesFromObject(average_bus_voltage)
          },

          hiddenIf: item => item.project
        },
        {
          key: 'min_ssc_soc',
          title: 'SoC, %',
          rightAligned: true,
          width: 50,
          tdClass: '!py-9',
          hiddenIf: item => item.project
        },
        {
          key: 'temperatures',
          title: `T, ºC min/max`,
          rightAligned: true,
          width: 70,
          tdClass: '!py-9',
          formatter: ({ temperatures_extremum }) =>
            this.formatMinMaxValuesFromObject(temperatures_extremum),

          hiddenIf: item => item.project
        },
        {
          key: 'msmStatus',
          title: 'Status',
          width: 80,
          rightAligned: true,
          class: '!pr-28',
          tdClass: '!py-9',
          hiddenIf: item => item.project
        }
      ]
    }
  },

  methods: {
    formatMinMaxValuesFromObject(obj) {
      return obj ? `${obj.min ?? '—'}/${obj.max ?? '—'}` : '—'
    },

    async goToBatteryPageIfPossible(item) {
      if (item.msm) {
        await this.$router.push(`/batteries/${item.msm.id}`)
      }
    },

    async startProjectNameEdit(project) {
      this.editingProject = { ...project }
      await this.$nextTick()
      document.querySelector('#project-name-input').focus()
    },

    async startBatteryNameEdit(msm) {
      this.editingBattery = { ...msm }
      await this.$nextTick()
      document.querySelector('#battery-name-input').focus()
    },

    async moveProjectUp(project) {
      const index = this.items.findIndex(item => item.id === project.id)
      const prevItem = this.items[index - 1]

      const { success } = await ProjectsService.updateMany({
        projects: [
          {
            id: project.id,
            name: project.name,
            weight: prevItem.weight
          },
          {
            id: prevItem.id,
            name: prevItem.name,
            weight: project.weight
          }
        ]
      })

      if (success) {
        this.$emit('swap-items', [project.id, prevItem.id])
      }
    },

    async moveProjectDown(project) {
      const index = this.items.findIndex(item => item.id === project.id)
      const nextItem = this.items[index + 1]

      const { success } = await ProjectsService.updateMany({
        projects: [
          {
            id: project.id,
            name: project.name,
            weight: nextItem.weight
          },
          {
            id: nextItem.id,
            name: nextItem.name,
            weight: project.weight
          }
        ]
      })

      if (success) {
        this.$emit('swap-items', [project.id, nextItem.id])
      }
    },

    async saveProjectName() {
      const { success } = await ProjectsService.updateProjectName(
        this.editingProject.id,
        this.editingProject.name
      )
      if (success) {
        this.$emit('update-project', this.editingProject)
        this.editingProject = null
      }
    },

    async saveBatteryName() {
      const { success } = await MsmsService.updateMsmName(
        this.editingBattery.id,
        this.editingBattery.name
      )
      if (success) {
        this.$emit('update-battery', this.editingBattery)
        this.editingBattery = null
      }
    }
  }
}
</script>
