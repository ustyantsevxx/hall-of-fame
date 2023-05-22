import { cloneDeep, isEqual } from 'lodash-es'

const getFieldsConfig = (formConfig, fieldValueFn) => {
  return Object.fromEntries(
    Object.entries(formConfig).map(([fieldKey, fieldConfig]) => {
      return [fieldKey, fieldValueFn(fieldConfig)]
    })
  )
}

export const FormMixin = (
  formConfigFn,
  { continueLoadingOnSuccess, checkAnyChangedOnlyOnce } = {}
) => ({
  validations() {
    return {
      x_formData: getFieldsConfig(formConfigFn.call(this), fieldConfig => {
        return fieldConfig.rules
          ? Object.fromEntries(
              fieldConfig.rules?.map((rule, i) => {
                return [i, typeof rule === 'function' ? rule : rule.validator]
              })
            )
          : {}
      })
    }
  },

  data() {
    return {
      x_anyChangedCheckedOnce: false,
      x_loading: false,
      x_initialFormData: {},
      x_formData: {},
      x_serverErrors: {}
    }
  },

  watch: {
    x_formData: {
      deep: true,
      handler() {
        if (Object.keys(this.x_serverErrors).length > 0) {
          this.x_serverErrors = {}
        }
      }
    }
  },

  created() {
    this.x_initFormData(true)
  },

  computed: {
    /**
     * This is the only property publicly available to the mixin consumer
     */
    form() {
      const formConfig = formConfigFn.call(this)

      return {
        // state
        $anyChanged: this.x_anyChanged,
        $anyError: this.$v.$anyError,
        $loading: this.x_loading,

        // methods
        $reset: this.x_reset,
        $handleSubmit: this.x_handleSubmit,
        $initFields: this.x_initFormData,
        $applyNewValues: this.x_applyNewValues,

        // fields
        ...Object.fromEntries(
          Object.keys(formConfig).map(fieldKey => {
            const vuelidateFieldState = this.$v.x_formData[fieldKey]
            const errorMessage = this.x_formErrors[fieldKey]
            return [
              fieldKey,
              {
                get value() {
                  return vuelidateFieldState.$model
                },

                set value(value) {
                  vuelidateFieldState.$model = value
                },

                invalid: vuelidateFieldState.$error || !!errorMessage,
                reset: vuelidateFieldState.$reset,
                errorMessage
              }
            ]
          })
        )
      }
    },

    x_anyChanged() {
      if (checkAnyChangedOnlyOnce) {
        if (!this.x_anyChangedCheckedOnce) {
          const changed = this.x_checkIfAnyChanged()
          this.x_anyChangedCheckedOnce = true
          return changed
        } else {
          return true
        }
      }

      return this.x_checkIfAnyChanged()
    },

    x_formErrors() {
      const formConfig = formConfigFn.call(this)

      return Object.fromEntries(
        Object.entries(formConfig).map(([fieldKey, fieldConfig]) => {
          const serverErrorMessage = this.x_serverErrors[fieldKey]
          if (serverErrorMessage) {
            return [fieldKey, serverErrorMessage]
          }

          const clientErrorMessage = fieldConfig.rules?.find((rule, i) => {
            return !this.$v.x_formData[fieldKey][i]
          })?.message
          return [fieldKey, clientErrorMessage]
        })
      )
    }
  },

  methods: {
    x_checkIfAnyChanged() {
      return !isEqual(this.x_formData, this.x_initialFormData)
    },

    x_applyNewValues() {
      this.x_initialFormData = cloneDeep(this.x_formData)
    },

    x_initFormData(usePrefillValues = false) {
      this.x_loading = false

      const formData = getFieldsConfig(formConfigFn.call(this), fieldConfig => {
        return usePrefillValues && fieldConfig.prefillValue !== undefined
          ? fieldConfig.prefillValue
          : fieldConfig.initialValue
      })

      const initialFormData = getFieldsConfig(
        formConfigFn.call(this),
        fieldConfig => fieldConfig.initialValue
      )

      this.x_formData = cloneDeep(formData)
      this.x_initialFormData = cloneDeep(initialFormData)
    },

    x_parseServerErrors(errors) {
      this.x_serverErrors = Object.fromEntries(
        Object.entries(errors).map(([k, v]) => [k, v[0]])
      )
    },

    x_checkErrors() {
      this.$v.$touch()
      return this.$v.x_formData.$invalid
    },

    x_resetValidation() {
      this.$v.$reset()
    },

    async x_reset() {
      this.x_anyChangedCheckedOnce = false
      this.x_initFormData()
      await this.$nextTick()
      this.x_resetValidation()
    },

    /*
     submitFn MUST return `success` key (true/false)
     also it can return raw server errors in case of validation error
      
     example: 
     { 
       errors: { 
         name: ['name required', 'name length is 20'] 
       }, 
       success: false 
     }
     */
    async x_handleSubmit(submitFn) {
      this.x_resetValidation()

      try {
        if (!this.x_checkErrors()) {
          this.x_loading = true

          const { success, errors } = await submitFn(this.x_formData)

          if (errors) {
            this.x_parseServerErrors(errors)
            this.x_loading = false
          } else if (!success || !continueLoadingOnSuccess) {
            this.x_loading = false
          }
        }
      } catch {
        this.x_loading = false
      }
    }
  }
})
