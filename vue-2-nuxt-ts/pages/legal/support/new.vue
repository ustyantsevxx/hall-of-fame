<template>
  <main class="container grid grid-cols-12 gap-30">
    <div class="col-span-8 mt-22">
      <Link to="/support" class="flex items-center space-x-10 w-max">
        <SlimArrowRightSVG />
        <span>xx</span>
      </Link>

      <h1 class="mt-25 text-h1">xx xx</h1>

      <InputSelect
        ref="topicDropdown"
        v-model="selectedTopicId"
        class="mt-65"
        placeholder="xx"
        :options="topicDropdownOptions"
      >
        <template v-if="ownTopicSelected" #selected-option-label>
          <label for="own-topic" class="block" style="min-width: 600px">
            <input
              id="own-topic"
              ref="ownTopicInput"
              v-model="ownTopic"
              :title="ownTopic"
              type="text"
              class="w-full outline-none"
              placeholder="xx xx xx"
              aria-label="xx xx"
              @click.stop
              @focus="handleOwnTopicInputFocus"
            />
          </label>
        </template>
      </InputSelect>

      <InputTextarea
        v-model="message"
        class="mt-50"
        placeholder="xx xx..."
      />

      <div class="flex items-center mt-30 space-x-20">
        <InputFile
          v-model="files"
          :accept="acceptableFileTypes"
          :max-count="MAX_FILES_COUNT_IN_MESSAGE"
          @input="updateFiles"
          @uploading-error="handleUploadingError"
        >
          <template #toggle>
            <Button outline>
              <span class="flex items-center space-x-10">
                <ClipAngleSVG />
                <span>xx xx</span>
              </span>
            </Button>
          </template>
        </InputFile>

        <p class="text-gray">
          xx: PDF, JPG, PNG, DOC, DOCX, XLS. xx 20 xx
        </p>
      </div>

      <InputFileManager
        :files="files"
        :class="{ 'mt-23': files.length > 0 }"
        @remove="removeFile"
      />

      <Button
        gradient
        class="mt-60"
        :disabled="!submitAllowed"
        @click.prevent="createRequest"
      >
        xx xx
      </Button>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Watch } from 'nuxt-property-decorator'

import ClipAngleSVG from '~/assets/svg/clip-angle.svg'
import SlimArrowRightSVG from '~/assets/svg/index/slim-arrow-left.svg'
import Button from '~/components/Button.vue'
import InputDefault from '~/components/InputDefault.vue'
import InputFile from '~/components/InputFile.vue'
import InputFileManager from '~/components/InputFileManager.vue'
import InputSelect from '~/components/InputSelect.vue'
import InputTextarea from '~/components/InputTextarea.vue'
import Link from '~/components/Link.vue'
import {
  MAX_FILES_COUNT_IN_MESSAGE,
  TechnicalSupportModule
} from '~/logic/modules/technical-support'
import {
  TechnicalSupportTopicsModule,
  Topic
} from '~/logic/modules/technical-support-topics'
import FormWithFileUploaderMixin from '~/mixins/form-with-file-uploader-mixin'

const OWN_TOPIC_ID = -1

// TODO xx xx xx xx xx xx xx "xx xx"

@Component({
  components: {
    InputDefault,
    InputFileManager,
    InputFile,
    Button,
    InputTextarea,
    InputSelect,
    Link,
    SlimArrowRightSVG,
    ClipAngleSVG
  },

  head() {
    return {
      title: 'xx xx'
    }
  }
})
export default class SupportNewPage extends FormWithFileUploaderMixin {
  MAX_FILES_COUNT_IN_MESSAGE = MAX_FILES_COUNT_IN_MESSAGE

  topics!: Topic[]
  selectedTopicId = null
  ownTopic = ''
  message = ''

  async asyncData() {
    const topics: Topic[] = await TechnicalSupportTopicsModule.getAllTopics()
    return { topics }
  }

  get topicDropdownOptions() {
    const serverTopics = this.topics.map(topic => ({
      value: topic.id,
      label: topic.name
    }))
    return [
      ...serverTopics,
      {
        value: OWN_TOPIC_ID,
        label: 'xx xx'
      }
    ]
  }

  get submitAllowed() {
    return (
      ((this.files.length > 0 && this.allFilesUploaded) ||
        (this.files.length === 0 && !!this.message.trim())) &&
      this.selectedTopicValid
    )
  }

  get selectedTopicValid() {
    return this.ownTopicSelected
      ? this.ownTopic.length > 0
      : !!this.selectedTopicId
  }

  get ownTopicInputRef(): HTMLInputElement {
    return this.$refs.ownTopicInput as HTMLInputElement
  }

  get topicDropdownRef(): InputSelect {
    return this.$refs.topicDropdown as InputSelect
  }

  get ownTopicSelected() {
    return this.selectedTopicId === OWN_TOPIC_ID
  }

  get preparedTopic() {
    return this.ownTopicSelected
      ? {
          key: 'topic_name',
          value: this.ownTopic
        }
      : {
          key: 'topic_id',
          value: this.selectedTopicId
        }
  }

  @Watch('selectedTopicId')
  async onSelectedTopicChange(value) {
    await this.$nextTick()
    if (value === OWN_TOPIC_ID) {
      this.ownTopicInputRef?.focus()
    }
  }

  handleOwnTopicInputFocus() {
    this.topicDropdownRef?.close()
  }

  async createRequest() {
    const fileIds = this.files.map(file => file.id)

    const { success, createdId } = await TechnicalSupportModule.createRequest({
      message: this.message,
      [this.preparedTopic.key]: this.preparedTopic.value,
      fileIds
    })

    if (success) {
      await this.$router.push(`/support/${createdId}`)
    }
  }
}
</script>
