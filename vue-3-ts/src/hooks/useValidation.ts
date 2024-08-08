import { useField, useForm } from 'vee-validate'
import { computed } from 'vue'
import { object, string } from 'yup'

const ERROR_FIELD_KEY = '_error'

export const useValidation = ({
  validationSchema,
  submitCallback
}: {
  validationSchema: Record<string, any>
  submitCallback: () => void
}) => {
  const form = useForm({
    validationSchema: object({
      ...validationSchema,
      [ERROR_FIELD_KEY]: string()
    })
  })

  const useFieldWithInvalidState = <T>(
    name: string,
    options: { initialValue?: T } = {}
  ) => {
    const field = useField<T>(
      name,
      {},
      {
        initialValue: options.initialValue
      }
    )

    return {
      ...field,
      invalid: computed<boolean>(
        () => form.meta.value.touched && !!field.errorMessage
      )
    }
  }

  const errorList = computed(() => Object.values(form.errors.value))

  const onSubmit = form.handleSubmit(async (values, actions) => {
    try {
      await submitCallback()
    } catch {
      actions.setFieldError(ERROR_FIELD_KEY, 'xx-xx xx xx xx')
    }
  })

  return {
    form,
    onSubmit,
    errorList,
    useFormField: useFieldWithInvalidState
  }
}
