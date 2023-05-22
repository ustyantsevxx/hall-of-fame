<template>
  <DefaultLayout wrapper-class="sm:overflow-hidden">
    <TableView
      :title="$t('all-batteries-0')"
      :fetch-fn="getProjects"
      :params.sync="params"
      :no-title="searchingOnSmallScreen"
      :toolbar-class="[
        'grow justify-end',
        { 'ml-40': !searchingOnSmallScreen }
      ]"
    >
      <template #after-title="{ response }">
        <AppTransition>
          <p
            v-if="response !== null"
            class="ml-8 text-white/60 text-h2 sm:ml-16 sm:text-h1"
          >
            {{ response.msms_count }}
          </p>
        </AppTransition>
      </template>

      <template #toolbar="{ debounceApplyParam, applyParam }">
        <div class="flex w-full justify-end sm:hidden">
          <div v-if="!searching" class="flex space-x-16">
            <ButtonIcon
              :title="$t('search')"
              class="border p-3"
              @click="startSearchAndFocusInput"
            >
              <SVGIcon24Search />
            </ButtonIcon>

            <ButtonIcon
              to="/edit-projects"
              :title="$t('edit-projects')"
              class="border p-3"
            >
              <SVGIcon24Edit class="text-white" />
            </ButtonIcon>
          </div>

          <div v-else class="flex w-full space-x-16">
            <InputSearch
              ref="searchInput"
              :value="params.q"
              focus-on-slash
              class="grow !transition-none"
              :placeholder="$t('search-1')"
              @input="value => debounceApplyParam({ q: value })"
              @clear="applyParam({ q: '' })"
              @keydown.native.esc="searching = false"
            />

            <ButtonIcon
              :title="$t('close-search')"
              class="border p-3"
              @click="searching = false"
            >
              <SVGIcon24Close class="text-white" />
            </ButtonIcon>
          </div>
        </div>

        <InputSearch
          :value="params.q"
          focus-on-slash
          class="hidden !w-full !max-w-[700px] sm:block"
          :placeholder="$t('search-by-battery-name-and-serial-number')"
          @input="value => debounceApplyParam({ q: value })"
          @clear="applyParam({ q: '' })"
        />
      </template>

      <template
        #table="{ items, loading, meta, patchItem, swapItems, fetchNextPage }"
      >
        <AppTransition mode="out-in">
          <CustomerBatteriesTable
            v-if="$mq !== 'sm'"
            :items="items"
            :loading="loading"
            @bottom-reached="fetchNextPage"
            @update-project="
              updatedProject => updateProject(updatedProject, patchItem)
            "
            @update-battery="
              updatedBattery => updateBattery(updatedBattery, patchItem)
            "
            @swap-items="ids => swapItems(ids[0], ids[1])"
          />

          <div v-else class="mt-24 flex h-full flex-col px-16 pb-24">
            <div
              v-if="searching && params.q && !loading"
              class="flex space-x-8 text-h2"
              :class="{ 'mb-24': meta.totalItems > 0 }"
            >
              <p>{{ $t('results') }}</p>
              <p class="text-white/60">{{ meta.totalItems }}</p>
            </div>

            <div v-if="items.length" class="space-y-24">
              <ul v-for="project in items" :key="project.id">
                <li>
                  <p class="text-white/60 text-h3">{{ project.name }}</p>

                  <ul class="mt-8 space-y-8">
                    <li v-for="msm in project.msms" :key="msm.id">
                      <BatteryCard :item="msm" />
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div
              v-else-if="!loading"
              class="flex grow flex-col justify-center text-center"
            >
              <p>{{ $t('batteries-not-found') }}</p>
            </div>
          </div>
        </AppTransition>
      </template>
    </TableView>
  </DefaultLayout>
</template>

<script>
import AppTransition from '~/components/AppTransition.vue'
import BatteryCard from '~/components/BatteryCard.vue'
import ButtonIcon from '~/components/ButtonIcon.vue'
import CustomerBatteriesTable from '~/components/CustomerBatteriesTable.vue'
import DefaultLayout from '~/components/DefaultLayout.vue'
import InputSearch from '~/components/InputSearch.vue'
import TableView from '~/components/TableView.vue'
import { ProjectsService } from '~/logic/modules/projects/projects.service'

export default {
  components: {
    TableView,
    InputSearch,
    ButtonIcon,
    DefaultLayout,
    AppTransition,
    CustomerBatteriesTable,
    BatteryCard
  },

  data() {
    return {
      searching: false,
      params: {
        q: ''
      }
    }
  },

  head() {
    return {
      title: this.$t('dashboard-2')
    }
  },

  computed: {
    searchingOnSmallScreen() {
      return this.searching && this.$mq === 'sm'
    }
  },

  methods: {
    getProjects(params) {
      return ProjectsService.getProjects(params)
    },

    async startSearchAndFocusInput() {
      this.searching = true
      await this.$nextTick()
      this.$refs.searchInput.focus()
    },

    updateProject(updatedProject, patchItem) {
      patchItem(updatedProject.id, item => {
        item.name = updatedProject.name
      })
    },

    updateBattery(updatedBattery, patchItem) {
      patchItem(
        item => item.msms.find(item => item.msm.id === updatedBattery.id),
        item => {
          const itemWithMsm = item.msms.find(
            item => item.msm.id === updatedBattery.id
          )
          itemWithMsm.msm.name = updatedBattery.name
        }
      )
    }
  }
}
</script>
