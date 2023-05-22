<template>
  <AppFormGroup v-slot="{ id }" :label="$t('chemistry')">
    <AppSelect
      :id="id"
      :value="value"
      :invalid="invalid"
      :loading="loading"
      :options="chemistryList || []"
      :placeholder="$t('select-type')"
      @input="chemistry => $emit('input', chemistry)"
    />
  </AppFormGroup>
</template>

<script>
import AppFormGroup from '~/components/AppFormGroup.vue'
import AppSelect from '~/components/AppSelect.vue'
import { ChemistryService } from '~/logic/modules/chemistry/chemistry.service'

export default {
  components: {
    AppFormGroup,
    AppSelect
  },

  props: {
    invalid: { type: Boolean, default: false },
    value: { type: String, default: null }
  },

  data() {
    return {
      loading: false
    }
  },

  computed: {
    chemistryList() {
      return this.$store.state.serverCache.chemistryList
    }
  },

  async created() {
    if (!this.chemistryList) {
      await this.fetchChemistryList()
    }
  },

  methods: {
    async fetchChemistryList() {
      this.loading = true
      try {
        const chemistryList = await ChemistryService.getChemistryList()
        this.$store.commit('serverCache/SET_CHEMISTRY_LIST', chemistryList)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
