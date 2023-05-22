<template>
  <InfiniteScrollWrapper
    ref="InfiniteScrollWrapper"
    @bottom-reached="$emit('bottom-reached')"
  >
    <AppTable
      :fields="fields"
      :items="tableItems"
      no-hyphen-in-empty-cell
      sort-by="timestamp"
      sort-desc
      :loading="loading"
      transitions-disabled
      :empty-text="$t('customers-not-found')"
      :row-class-fn="
        item => ({
          '!bg-light-10':
            item.customer.is_archived ||
            (item.project && item.project.is_archived)
        })
      "
    >
      <template #cell(customer)="{ item }">
        <CustomersTableCustomerCell
          :item="item"
          @toggle-expand="toggleExpand(item.customer.id)"
          @create-project="emitUpdated"
          @update-customer="updateCustomer"
          @delete-customer="deleteCustomer"
        />
      </template>

      <template #cell(project)="{ item }">
        <CustomersTableProjectCell
          :item="item"
          @create-project="emitUpdated"
          @update-project="updateProject"
          @delete-project="deleteProject"
        />
      </template>

      <template #cell(batteryName)="{ definedOrHyphen, item }">
        <p v-if="!item.expanded && item.meta.totalBatteryCount > 0">
          {{ item.meta.totalBatteryCount }}
        </p>

        <button
          v-else-if="item.battery"
          class="truncate"
          :title="
            $t('view-and-quot-item-battery-name-and-quot-info', [
              item.battery.name
            ])
          "
        >
          {{ definedOrHyphen(item.battery.name) }}
        </button>
      </template>

      <template #cell(serial)="{ definedOrHyphen, item }">
        <p v-if="!item.expanded && item.projectCount > 0">—</p>
        <p
          v-else-if="item.battery"
          class="truncate"
          :title="item.battery.serial"
        >
          {{ definedOrHyphen(item.battery.serial) }}
        </p>

        <NuxtLink
          v-else-if="
            item.projectCount > 0 &&
            !item.customer.is_archived &&
            (!item.project || (item.project && !item.project.is_archived))
          "
          :to="getAddBatteryPageLink(item)"
          class="!bg-transparent !py-4 text-white/60 transition hover:text-white"
        >
          + {{ $t('add-battery') }}
        </NuxtLink>
      </template>

      <template #cell(location)="{ definedOrHyphen, item }">
        <p v-if="!item.expanded && item.projectCount > 0">—</p>
        <p
          v-else-if="item.battery"
          class="truncate"
          :title="item.battery.location"
        >
          {{ definedOrHyphen(item.battery.location) }}
        </p>
      </template>

      <template #cell(alarmStatus)="{ item }">
        <CustomersTableAlarmStatusCell :item="item" />
      </template>
    </AppTable>
  </InfiniteScrollWrapper>
</template>

<script>
import { merge, sum, xor } from 'lodash-es'

import AppTable from '~/components/AppTable.vue'
import CustomersTableAlarmStatusCell from '~/components/CustomersTableAlarmStatusCell.vue'
import CustomersTableCustomerCell from '~/components/CustomersTableCustomerCell.vue'
import CustomersTableProjectCell from '~/components/CustomersTableProjectCell.vue'
import InfiniteScrollWrapper from '~/components/InfiniteScrollWrapper.vue'
import { STATUSES } from '~/logic/constants'

export default {
  components: {
    InfiniteScrollWrapper,
    AppTable,
    CustomersTableCustomerCell,
    CustomersTableAlarmStatusCell,
    CustomersTableProjectCell
  },

  props: {
    items: { type: Array, required: true },
    loading: { type: Boolean, default: false }
  },

  data() {
    return {
      expandedIds: [],
      tableItems: []
    }
  },

  computed: {
    batteryColoredClass() {
      return {
        [STATUSES.WARNING]: 'bg-yellow/20',
        [STATUSES.FAULT]: 'bg-red/20',
        [STATUSES.ERROR]: 'bg-orange/20'
      }
    },

    fields() {
      return [
        {
          key: 'customer',
          title: this.$t('customer-2'),
          width: 250,
          tdClass: item => [
            'align-top',
            {
              '!bg-light': item.expanded && !item.customer.is_archived
            },
            item.customer.is_archived ? '!pb-8 !pt-11' : '!pb-13 !pt-14'
          ],

          rowspan: item => (item.expanded ? item.meta.expandedRowspan : 1),
          hiddenIf: item => item.customerHidden
        },

        {
          key: 'project',
          title: this.$t('project-2'),
          width: 230,
          ...this.getProjectSpecificFieldOptions()
        },

        {
          key: 'batteryName',
          title: this.$t('battery-name-4'),
          width: 160,
          ...this.getBatterySpecificFieldOptions({ tdClass: 'rounded-l-4' })
        },

        {
          key: 'serial',
          title: this.$t('serial-number-3'),
          width: 220,
          ...this.getBatterySpecificFieldOptions()
        },

        {
          key: 'location',
          title: this.$t('location-path'),
          width: 410,
          ...this.getBatterySpecificFieldOptions()
        },

        {
          key: 'alarmStatus',
          title: this.$t('alarm-status-0'),
          rightAligned: true,
          class: '!pr-28',
          ...this.getBatterySpecificFieldOptions()
        }
      ]
    }
  },

  watch: {
    items: 'createTableItems',
    expandedIds: 'createTableItems'
  },

  methods: {
    out_scrollToTop() {
      this.$refs.InfiniteScrollWrapper.out_scrollToTop()
    },

    createTableItems() {
      this.tableItems = this.items.flatMap(item => {
        const customerMeta = {
          totalBatteryCount: this.getCustomerBatteryCount(item),
          expandedRowspan: this.getCustomerExpandedRowspan(item)
        }

        return this.checkIfShouldBeExpanded(item)
          ? this.getExpandedTableItems(item, customerMeta)
          : this.getCollapsedTableItem(item, customerMeta)
      })
    },

    getExpandedTableItems(item, meta) {
      return item.projects.flatMap((project, projectIndex) => {
        if (project.batteries.length === 0) {
          return {
            expanded: true,
            id: item.customer.id,
            customer: item.customer,
            project,
            customerHidden: projectIndex !== 0,
            projectHidden: false,
            projectCount: item.projects.length,
            projectBatteryCount: project.batteries.length,
            meta
          }
        }

        return project.batteries.map((battery, batteryIndex) => ({
          expanded: true,
          id: item.customer.id,
          customer: item.customer,
          project,
          battery,
          batteryInProjectIndex: batteryIndex,
          customerHidden: batteryIndex !== 0 || projectIndex !== 0,
          projectHidden: batteryIndex !== 0,
          projectCount: item.projects.length,
          projectBatteryCount: project.batteries.length,
          meta
        }))
      })
    },

    getCollapsedTableItem(item, meta) {
      return {
        expanded: false,
        id: item.customer.id,
        customer: item.customer,
        projectCount: item.projects.length,
        worstStatus: item.alarm_status,
        meta
      }
    },

    getProjectSpecificFieldOptions() {
      return {
        tdClass: item => [
          'align-top',
          {
            '!py-7': item.expanded,
            '!bg-light':
              item.expanded &&
              !item.customer.is_archived &&
              !item.project?.is_archived,

            'align-middle': item.expanded && item.projectBatteryCount <= 1,
            '!pt-16 !pb-12': !item.expanded && item.projectCount > 0,
            '!pt-6 pb-4': !item.expanded && item.projectCount === 0
          }
        ],

        rowspan: item =>
          item.expanded ? item.project?.batteries?.length || 1 : 1,

        hiddenIf: item => item.projectHidden
      }
    },

    getBatterySpecificFieldOptions({ tdClass } = {}) {
      return {
        tdClass: item => [
          '!py-4',
          tdClass,
          {
            '!bg-light':
              item.expanded &&
              !item.battery &&
              !item.customer.is_archived &&
              !item.project?.is_archived,

            'cursor-pointer': item.expanded && item.battery,
            '!border-b-0':
              item.expanded &&
              item.battery &&
              item.batteryInProjectIndex !== item.projectBatteryCount - 1
          },
          item.expanded &&
            item.battery &&
            this.batteryColoredClass[item.battery.alarm_status]
        ],

        onCellClick: item => {
          if (item.expanded && item.battery) {
            this.goToBatteryPage(item)
          }
        }
      }
    },

    getCustomerExpandedRowspan(item) {
      return sum(item.projects.map(p => p.batteries?.length || 1))
    },

    getCustomerBatteryCount(item) {
      return sum(item.projects.map(p => p.batteries?.length))
    },

    checkIfShouldBeExpanded(item) {
      return (
        this.expandedIds.includes(item.customer.id) ||
        (item.projects.length === 1 && item.projects[0].batteries.length <= 1)
      )
    },

    getAllBatteriesStatuses(item) {
      return item.projects.flatMap(project =>
        project.batteries.map(battery => battery.alarm_status)
      )
    },

    toggleExpand(id) {
      this.expandedIds = xor(this.expandedIds, [id])
    },

    goToBatteryPage(item) {
      this.$router.push(`/batteries/${item.battery.id}`)
    },

    getAddBatteryPageLink(item) {
      return {
        path: '/batteries/add',
        query: {
          customerId: item.customer.id,
          projectId: item.project.id
        }
      }
    },

    emitUpdated() {
      this.$emit('updated')
    },

    updateCustomer({ id, data }) {
      const itemWithCustomer = this.tableItems.find(
        item => item.customer?.id === id
      )
      merge(itemWithCustomer.customer, data)
    },

    deleteCustomer(id) {
      this.tableItems = this.tableItems.filter(item => item.customer?.id !== id)
    },

    updateProject({ id, data }) {
      const itemWithProject = this.tableItems.find(
        item => item.project?.id === id
      )
      merge(itemWithProject.project, data)
    },

    deleteProject(id) {
      this.tableItems = this.tableItems.filter(item => item.project?.id !== id)
    }
  }
}
</script>
