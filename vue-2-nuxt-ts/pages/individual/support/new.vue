<template>
  <main class="container grid grid-cols-12 gap-30">
    <div class="col-span-8 mt-22">
      <Link to="/support" class="flex items-center space-x-10 w-max">
        <SlimArrowRightSVG />
        <span>Служба поддержки</span>
      </Link>

      <h1 class="mt-25 text-h1">Создать обращение</h1>

      <InputSelect
        v-model="selectedStationId"
        class="mt-65"
        placeholder="Выберите заправку (при необходимости)"
        :options="stationsDropdownOptions"
      />

      <InputTextarea
        v-model="message"
        class="mt-50"
        placeholder="Ваше сообщение..."
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
            <Button outline class="">
              <span class="flex items-center space-x-10">
                <ClipAngleSVG />
                <span>Прикрепить файлы</span>
              </span>
            </Button>
          </template>
        </InputFile>

        <p class="text-gray">
          Форматы: PDF, JPG, PNG, DOC, DOCX, XLS. До 20 МБ
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
        Создать обращение
      </Button>
    </div>
  </main>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'

import ClipAngleSVG from '~/assets/svg/clip-angle.svg'
import SlimArrowRightSVG from '~/assets/svg/index/slim-arrow-left.svg'
import Button from '~/components/Button.vue'
import InputFile from '~/components/InputFile.vue'
import InputFileManager from '~/components/InputFileManager.vue'
import InputSelect from '~/components/InputSelect.vue'
import InputTextarea from '~/components/InputTextarea.vue'
import Link from '~/components/Link.vue'
import { Station, StationsModule } from '~/logic/modules/stations'
import {
  MAX_FILES_COUNT_IN_MESSAGE,
  TechnicalSupportModule
} from '~/logic/modules/technical-support'
import FormWithFileUploaderMixin from '~/mixins/form-with-file-uploader-mixin'

@Component({
  components: {
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
      title: 'Создать обращение'
    }
  }
})
export default class extends FormWithFileUploaderMixin {
  MAX_FILES_COUNT_IN_MESSAGE = MAX_FILES_COUNT_IN_MESSAGE

  stations!: Station[]
  selectedStationId = null
  message = ''

  async asyncData() {
    const stations = await StationsModule.getStations()
    return { stations }
  }

  get stationsDropdownOptions() {
    return this.stations.map(station => ({
      value: station.id,
      label: `${station.name} (${station.address})`
    }))
  }

  get submitAllowed() {
    return (
      (this.files.length > 0 && this.allFilesUploaded) ||
      (this.files.length === 0 && !!this.message.trim())
    )
  }

  async createRequest() {
    const fileIds = this.files.map(file => file.id)

    const { success, createdId } = await TechnicalSupportModule.createRequest({
      message: this.message,
      stationId: this.selectedStationId ?? undefined,
      fileIds
    })

    if (success) {
      await this.$router.push(`/support/${createdId}`)
    }
  }
}
</script>
