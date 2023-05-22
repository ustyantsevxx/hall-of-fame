<template>
  <div>
    <AppFormGroup :label="$t('project-123')">
      <template #default="{ id }">
        <AppSelect
          :id="id"
          :invalid="invalid"
          not-searchable
          :value="value"
          :loading="loading"
          track-by="id"
          :options="projects"
          label-key="name"
          :no-options-text="
            !customerId
              ? $t('select-customer-first')
              : $t('no-projects-for-selected-customer')
          "
          :placeholder="$t('select-project')"
          @input="projectId => $emit('input', projectId)"
        />
      </template>

      <template #after-label>
        <ButtonBlueText class="text-main" @click="addProject">
          + {{ $t('add-new-project') }}
        </ButtonBlueText>
      </template>
    </AppFormGroup>

    <ModalProject ref="ModalProject" :customer-id="customerId" />
  </div>
</template>

<script>
import AppFormGroup from '~/components/AppFormGroup.vue'
import AppSelect from '~/components/AppSelect.vue'
import ButtonBlueText from '~/components/ButtonBlueText.vue'
import ModalProject from '~/components/ModalProject.vue'
import { CustomersService } from '~/logic/modules/customers/customers.service'

export default {
  components: {
    AppFormGroup,
    ButtonBlueText,
    AppSelect,
    ModalProject
  },

  props: {
    value: { type: Number, default: null },
    customerId: { type: Number, default: null },
    invalid: { type: Boolean, default: false }
  },

  data() {
    return {
      projects: [],
      loading: false
    }
  },

  watch: {
    async customerId(newCustomerId, oldCustomerId) {
      this.projects = []

      if (oldCustomerId) {
        this.$emit('input', null)
        this.$emit('reset')
      }

      if (newCustomerId) {
        await this.fetchProjects()
      }
    }
  },

  created() {
    if (this.customerId) {
      this.fetchProjects()
    }
  },

  methods: {
    async fetchProjects() {
      this.loading = true
      try {
        this.projects = await CustomersService.getCustomerProjects(
          this.customerId
        )
      } finally {
        this.loading = false
      }
    },

    async addProject() {
      const newProjectId = await this.$refs.ModalProject.open()
      if (newProjectId && this.customerId) {
        await this.fetchProjects()
        const newProjectOption = this.projects.find(p => p.id === newProjectId)
        if (newProjectOption) {
          this.$emit('input', newProjectOption)
        }
      }
    }
  }
}
</script>
