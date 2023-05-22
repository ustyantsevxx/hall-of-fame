<template>
  <DefaultLayout hide-mobile-navigation>
    <LinkBack class="ml-8 -mt-8" to="/" />

    <LayoutSection class="mt-8 flex grow flex-col justify-between py-16">
      <div>
        <h1 class="px-16 text-h2">{{ $t('edit-projects-0') }}</h1>

        <Draggable
          v-model="reorderedProjects"
          ghost-class="project-draggable-ghost"
          class="mt-20 px-8"
          :class="{ dragging }"
          handle=".project-draggable-handle"
          :animation="200"
          group="description"
          @start="dragging = true"
          @end="dragging = false"
        >
          <TransitionGroup tag="div" name="draggable-transition">
            <div
              v-for="project in reorderedProjects"
              :key="project.id"
              class="project-draggable border-b py-4 px-8"
              :class="
                !editingProject || editingProject.id !== project.id
                  ? 'border-light-20'
                  : 'border-cyan'
              "
            >
              <div
                v-if="!editingProject || editingProject.id !== project.id"
                :class="{
                  'pointer-events-none opacity-20':
                    editingProject && editingProject.id !== project.id
                }"
                class="flex items-center justify-between"
              >
                <button
                  :title="`Edit ${project.name} name`"
                  :disabled="
                    reordered ||
                    (editingProject && editingProject.id !== project.id)
                  "
                  class="group flex grow items-center space-x-8 rounded-4 py-8"
                  @click="() => setEditingProjectAndFocusInput(project)"
                >
                  <span class="text-h3">{{ project.name }}</span>
                  <SVGIcon16Edit
                    v-if="!reordered && !dragging"
                    class="edit-svg text-white/60 transition group-hover:text-white"
                  />
                </button>

                <button
                  v-if="projects.length > 1"
                  :disabled="editingProject && editingProject.id !== project.id"
                  class="project-draggable-handle rounded-4 p-8 text-white/60 transition"
                  @contextmenu.prevent
                >
                  <SVGIcon16Burger />
                </button>
              </div>

              <form
                v-else
                class="flex items-center justify-between"
                @submit.prevent="saveNewProjectName"
              >
                <label for="project-name-input" class="grow">
                  <input
                    id="project-name-input"
                    v-model="editingProject.name"
                    enterkeyhint="done"
                    placeholder="Project name"
                    class="w-full border-0 bg-transparent py-8 pr-8 !ring-0 text-h3"
                    type="text"
                  />
                </label>

                <FormCheckCancelButtons
                  :submit-disabled="!editingProject.name"
                  @cancel="cancelProjectEditing"
                />
              </form>
            </div>
          </TransitionGroup>
        </Draggable>
      </div>

      <div v-if="reordered" class="mt-16 flex flex-col px-16">
        <AppButton @click="saveNewOrder">{{ $t('save-2') }}</AppButton>

        <AppButton variant="danger" class="mt-16" @click="restoreOriginalOrder">
          {{ $t('discard') }}
        </AppButton>
      </div>
    </LayoutSection>
  </DefaultLayout>
</template>

<script>
import { isEqual } from 'lodash-es'
import Draggable from 'vuedraggable'

import AppButton from '~/components/AppButton.vue'
import DefaultLayout from '~/components/DefaultLayout.vue'
import FormCheckCancelButtons from '~/components/FormCheckCancelButtons.vue'
import LayoutSection from '~/components/LayoutSection.vue'
import LinkBack from '~/components/LinkBack.vue'
import { ProjectsService } from '~/logic/modules/projects/projects.service'

export default {
  components: {
    LayoutSection,
    Draggable,
    LinkBack,
    AppButton,
    DefaultLayout,
    FormCheckCancelButtons
  },

  async asyncData() {
    const projects = await ProjectsService.getAllProjects()

    return {
      projects,
      reorderedProjects: projects
    }
  },

  data() {
    return {
      dragging: false,
      editingProject: null
    }
  },

  head() {
    return {
      title: this.$t('edit-projects-1')
    }
  },

  computed: {
    reordered() {
      return !isEqual(
        this.reorderedProjects.map(p => p.id),
        this.projects.map(p => p.id)
      )
    }
  },

  methods: {
    restoreOriginalOrder() {
      this.reorderedProjects = this.projects
    },

    async saveNewOrder() {
      const requestBody = {
        projects: this.reorderedProjects.map((project, i) => ({
          ...project,
          weight: i
        }))
      }
      const { success } = await ProjectsService.updateMany(requestBody)
      if (success) {
        this.projects = this.reorderedProjects
      }
    },

    async setEditingProjectAndFocusInput(project) {
      this.editingProject = { ...project }
      await this.$nextTick()
      document.querySelector('#project-name-input').focus()
    },

    async saveNewProjectName() {
      const { success } = await ProjectsService.updateProjectName(
        this.editingProject.id,
        this.editingProject.name
      )

      if (success) {
        this.projects.find(
          p => p.id === this.editingProject.id
        ).name = this.editingProject.name
        this.editingProject = null
      }
    },

    cancelProjectEditing() {
      this.editingProject = null
    }
  }
}
</script>

<style scoped>
.draggable-transition {
  @apply transition-transform;
}

.dragging .project-draggable:not(.project-draggable-ghost) {
  @apply opacity-20;
}

.project-draggable-ghost {
  @apply !invisible !opacity-0;
}

.sortable-fallback {
  @apply rounded-4 bg-light-20 !opacity-100;
}

.dragging .sortable-fallback .edit-svg {
  @apply hidden;
}

.sortable-fallback .project-draggable-handle {
  @apply bg-light-full text-white;
}
</style>
