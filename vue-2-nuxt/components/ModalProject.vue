<template>
  <ModalForm
    ref="modalFormRef"
    :title="$t('add-new-project-0')"
    :description="$t('select-customer-and-give-a-new-project-name')"
    :fields="fields"
    :submit-fn="submitFn"
  />
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import ModalForm from '~/components/ModalForm.vue'
import { ProjectsService } from '~/logic/modules/projects/projects.service'
import { ModalMixin } from '~/logic/vue/mixins/modal-mixin'

export default {
  components: {
    ModalForm
  },

  mixins: [ModalMixin('modalFormRef')],

  props: {
    project: { type: Object, default: undefined },
    customerId: { type: Number, default: undefined }
  },

  computed: {
    fields() {
      return [
        {
          key: 'customerId',
          noLabel: true,
          initialValue: this.customerId,
          component: {
            is: () => import('~/components/InputSelectCustomer.vue'),
            props: {
              addHidden: true,
              noBottomMessage: true
            }
          },

          rules: [required]
        },

        {
          key: 'name',
          label: this.$t('project-name'),
          initialValue: this.project?.name ?? '',
          component: {
            is: () => import('~/components/AppInput.vue'),
            props: {
              placeholder: this.$t('fill-a-project-name')
            }
          },

          rules: [required]
        }
      ]
    }
  },

  methods: {
    async submitFn({ name, customerId }) {
      const projectData = {
        name,
        userId: customerId
      }

      const { success, data, errors } = this.project
        ? await ProjectsService.updateProject(this.project.id, projectData)
        : await ProjectsService.createProject(projectData)

      if (success) {
        this.close({
          id: this.project?.id ?? data.id,
          name,
          user_id: customerId
        })
      }

      return { success, errors }
    }
  }
}
</script>
