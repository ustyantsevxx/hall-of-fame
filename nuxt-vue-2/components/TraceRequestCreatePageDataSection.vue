<template>
  <LayoutSection class="flex flex-col overflow-hidden pr-0">
    <h2 class="p-32 pb-16 text-h1">{{ $t('request-list') }}</h2>

    <CustomScrollbarWrapper
      class="h-[calc(100%-81px)] pt-8 pb-32 pl-32 transition-colors"
    >
      <div class="pr-94">
        <AppFormGroup v-slot="{ id }" :label="$t('request-name')">
          <AppInput
            :id="id"
            v-model="$v.name.$model"
            :invalid="$v.name.$error"
            placeholder="Log#4421"
          />
        </AppFormGroup>

        <div class="mt-8 grid grid-cols-2 gap-x-16">
          <AppFormGroup v-slot="{ id }" :label="$t('date-2')">
            <AppDatepicker
              :id="id"
              v-model="$v.date.$model"
              :invalid="$v.date.$error || dateInvalid"
              placeholder="0000-00-00"
              disable-future-dates
            />
          </AppFormGroup>

          <AppFormGroup v-slot="{ id }" :label="$t('timestamp-1')">
            <AppInput
              :id="id"
              v-model="$v.timestamp.$model"
              :disabled="$v.date.$invalid"
              :invalid="$v.timestamp.$error || dateInvalid"
              mask="##:##:##"
              placeholder="00:00:00"
            />
          </AppFormGroup>
        </div>

        <AppFormGroup
          v-slot="{ id }"
          :label="$t('duration-0')"
          class="mt-8"
          :class="{ 'text-white/40': !dateAndTimestampFilledCorrectly }"
        >
          <AppTimePicker
            :id="id"
            v-model="duration"
            :disabled="!dateAndTimestampFilledCorrectly"
            :title="
              !dateAndTimestampFilledCorrectly &&
              $t('please-provide-request-timestamp-first')
            "
          />
        </AppFormGroup>
      </div>

      <AppTransition>
        <div v-if="dateAndTimestampFilledCorrectly" class="mt-40 pr-94">
          <h2 class="text-h1">{{ $t('requested-parameters') }}</h2>
          <TraceRequestCreatePageSizeCard />
        </div>
      </AppTransition>

      <AppTransition>
        <AppTransition
          v-if="dateAndTimestampFilledCorrectly"
          group
          tag="ul"
          class="space-y-20 pt-27"
        >
          <li v-for="(tagGroup, i) in notEmptyTagGroups" :key="i">
            <div>
              <p class="text-white/60 text-main">{{ tagGroup.name }}</p>
              <TraceRequestCreatePageParamTags
                class="mt-6"
                :tags="tagGroup.tags"
                @remove="value => tagGroup.removeHandler(value)"
              />
            </div>
          </li>
        </AppTransition>
      </AppTransition>
    </CustomScrollbarWrapper>
  </LayoutSection>
</template>

<script>
import { isEqual, range } from 'lodash-es'
import { required } from 'vuelidate/lib/validators'
import { mapMutations, mapState } from 'vuex'

import AppDatepicker from '~/components/AppDatepicker.vue'
import AppFormGroup from '~/components/AppFormGroup.vue'
import AppInput from '~/components/AppInput.vue'
import AppTimePicker from '~/components/AppTimePicker.vue'
import AppTransition from '~/components/AppTransition.vue'
import CustomScrollbarWrapper from '~/components/CustomScrollbarWrapper.vue'
import LayoutSection from '~/components/LayoutSection.vue'
import TraceRequestCreatePageParamTags from '~/components/TraceRequestCreatePageParamTags.vue'
import TraceRequestCreatePageSizeCard from '~/components/TraceRequestCreatePageSizeCard.vue'
import { FULL_TIMESTRING_REGEX } from '~/logic/utils/regex'

export default {
  components: {
    AppFormGroup,
    AppInput,
    AppDatepicker,
    AppTimePicker,
    TraceRequestCreatePageSizeCard,
    TraceRequestCreatePageParamTags,
    LayoutSection,
    AppTransition,
    CustomScrollbarWrapper
  },

  props: {
    valid: { type: Boolean, default: false },
    dateInvalid: { type: Boolean, default: false }
  },

  computed: {
    ...mapState('newTraceRequest', {
      msms: s => s.msms,
      requestData: s => s.data
    }),

    name: {
      get() {
        return this.requestData.name
      },

      set(value) {
        this.setName(value)
      }
    },

    date: {
      get() {
        return this.requestData.date
      },

      set(value) {
        if (this.dateInvalid) {
          this.$emit('update:date-invalid', false)
        }
        this.setDate(value)
      }
    },

    timestamp: {
      get() {
        return this.requestData.timestamp
      },

      set(value) {
        if (this.dateInvalid) {
          this.$emit('update:date-invalid', false)
        }
        this.setTimestamp(value)
      }
    },

    duration: {
      get() {
        return this.requestData.duration
      },

      set(value) {
        this.setDuration(value)
      }
    },

    dateAndTimestampFilledCorrectly() {
      return !this.$v.date.$invalid && !this.$v.timestamp.$invalid
    },

    sscTagGroups() {
      return this.requestData.msm
        ? range(0, this.requestData.msm.sscs_count).map(sscIndex => {
            const tags = this.getSscTags(sscIndex)
            return {
              name: `SSC ${sscIndex + 1}`,
              tags,
              removeHandler: tagValue => this.sscItemRemoveHandler(tagValue)
            }
          })
        : []
    },

    sortedValueTags() {
      return this.requestData.selectedValues
        .map(({ name }) => ({
          name,
          value: name
        }))
        .sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { numeric: true })
        )
    },

    valuesTagGroup() {
      return {
        name: this.$t('values-0'),
        tags: this.sortedValueTags,
        removeHandler: tagValue => this.valueItemRemoveHandler(tagValue)
      }
    },

    notEmptyTagGroups() {
      return [...this.sscTagGroups, this.valuesTagGroup].filter(
        tagGroup => tagGroup.tags.length > 0
      )
    }
  },

  watch: {
    '$v.$invalid'(invalid) {
      this.$emit('update:valid', invalid)
    },

    date(value) {
      if (!value) {
        this.timestamp = ''
        this.duration = { minutes: 10, seconds: 0 }
      }
    }
  },

  methods: {
    ...mapMutations('newTraceRequest', {
      setName: 'SET_NAME',
      setDate: 'SET_DATE',
      setTimestamp: 'SET_TIMESTAMP',
      setDuration: 'SET_DURATION'
    }),

    resetValidation() {
      this.$v.$reset()
    },

    removeAllModulesWithSsc(sscIndex) {
      if (
        this.requestData.selectedModules.some(
          module => module.sscIndex === sscIndex
        )
      ) {
        const newModules = this.requestData.selectedModules.filter(
          module => module.sscIndex !== sscIndex
        )
        this.$store.commit('newTraceRequest/SET_SELECTED_MODULES', newModules)
      }
    },

    sscItemRemoveHandler(tagValue) {
      // if ssc
      if (tagValue.moduleIndex === null) {
        const newSscIndexes = this.requestData.selectedSscIndexes.filter(
          sscIndex => sscIndex !== tagValue.sscIndex
        )

        this.$store.commit(
          'newTraceRequest/SET_SELECTED_SSC_IDS',
          newSscIndexes
        )

        this.removeAllModulesWithSsc(tagValue.sscIndex)
      } else {
        // if module
        const newModules = this.requestData.selectedModules.filter(
          module => !isEqual(module, tagValue)
        )

        this.$store.commit('newTraceRequest/SET_SELECTED_MODULES', newModules)
      }
    },

    valueItemRemoveHandler(tagValue) {
      const newValues = this.requestData.selectedValues.filter(
        v => v.name !== tagValue
      )
      this.$store.commit('newTraceRequest/SET_SELECTED_VALUES', newValues)
    },

    getSscTags(sscIndex) {
      const tags = this.requestData.selectedModules
        .filter(module => module.sscIndex === sscIndex)
        .sort((a, b) => a.moduleIndex - b.moduleIndex)
        .map(module => ({
          name: `M${module.moduleIndex + 1}`,
          value: module
        }))

      if (this.requestData.selectedSscIndexes.includes(+sscIndex)) {
        tags.unshift({
          name: `SSC ${sscIndex + 1}`,
          // "moduleIndex: null" is used to identify the ssc in "ssc+module"-array later
          value: { sscIndex, moduleIndex: null }
        })
      }

      return tags
    }
  },

  validations: {
    name: { required },
    date: { required },
    timestamp: {
      fullTimeString: value => FULL_TIMESTRING_REGEX.test(value)
    }
  }
}
</script>
