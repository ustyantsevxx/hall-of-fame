<template>
  <div class="flex items-center">
    <template v-if="!item.expanded">
      <p v-if="item.projectCount > 0">{{ item.projectCount }}</p>

      <AppButton
        v-else-if="!item.customer.is_archived"
        size="sm"
        variant="dark-invert"
        class="-ml-16"
        @click="addProject"
      >
        + {{ $t('add-project') }}
      </AppButton>
    </template>

    <div v-else class="flex items-center">
      <SVGIcon24Foled v-if="item.project.is_archived" class="mr-8 shrink-0" />

      <p :title="item.project.name" class="truncate">
        {{ item.project.name || '—' }}
      </p>

      <TableActionsPopover
        v-if="!item.customer.is_archived"
        left-side
        button-class="w-16 h-16 ml-8 !rounded-4 !p-0"
        button-icon="SVGIcon16KebabVertical"
        :actions="actions"
        :callback-data="item"
      />
    </div>

    <ModalConfirm
      ref="ModalConfirm"
      :title="$t('confirm-delete-1')"
      :subtitle="$t('you-really-want-to-delete-this-project')"
      :confirm-text="$t('delete-project')"
    />

    <ModalProject
      ref="ModalProject"
      :customer-id="item.customer.id"
      :project="item.project"
    />
  </div>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
import ModalConfirm from '~/components/ModalConfirm.vue'
import ModalProject from '~/components/ModalProject.vue'
import TableActionsPopover, {
  TABLE_ACTION_TYPES
} from '~/components/TableActionsPopover.vue'
import { ProjectsService } from '~/logic/modules/projects/projects.service'

export default {
  components: {
    TableActionsPopover,
    ModalConfirm,
    ModalProject,
    AppButton
  },

  props: {
    item: { type: Object, required: true }
  },

  computed: {
    actions() {
      return [
        !this.item.project.is_archived
          ? [
              {
                type: TABLE_ACTION_TYPES.BUTTON,
                text: this.$t('edit-project'),
                icon: 'SVGIcon24Edit',
                callback: async () => {
                  const projectData = await this.$refs.ModalProject.open()
                  if (projectData) {
                    this.emitUpdateProject(projectData)
                  }
                }
              },

              {
                type: TABLE_ACTION_TYPES.BUTTON,
                text: this.$t('add-new-battery'),
                icon: 'SVGIcon24Add',
                callback: () => {
                  this.$router.push({
                    path: '/batteries/add',
                    query: {
                      customerId: this.item.customer.id,
                      projectId: this.item.project.id
                    }
                  })
                }
              },
              {
                type: TABLE_ACTION_TYPES.BUTTON,
                text: this.$t('archive-0'),
                icon: 'SVGIcon24Archive',
                callback: async item => {
                  const { success } = await ProjectsService.archiveProject(
                    item.project.id
                  )
                  if (success) {
                    this.emitUpdateProject({ is_archived: true })
                  }
                }
              }
            ]
          : {
              type: TABLE_ACTION_TYPES.BUTTON,
              text: this.$t('unarchive'),
              icon: 'SVGIcon24Archive',
              callback: async item => {
                const { success } = await ProjectsService.unarchiveProject(
                  item.project.id
                )
                if (success) {
                  this.emitUpdateProject({ is_archived: false })
                }
              }
            },
        {
          type: TABLE_ACTION_TYPES.BUTTON,
          text: this.$t('delete'),
          icon: 'SVGIcon24Delete',
          callback: async item => {
            const confirmed = await this.$refs.ModalConfirm.open()

            if (confirmed) {
              const { success } = await ProjectsService.deleteProject(
                item.project.id
              )

              if (success) {
                this.$emit('delete-project', item.project.id)
              }
            }
          }
        }
      ].flat()
    }
  },

  methods: {
    async addProject() {
      const projectData = await this.$refs.ModalProject.open()
      if (projectData) {
        this.$emit('create-project', projectData)
      }
    },

    emitUpdateProject(partialProjectData) {
      this.$emit('update-project', {
        id: this.item.project.id,
        data: partialProjectData
      })
    }
  }
}
</script>
