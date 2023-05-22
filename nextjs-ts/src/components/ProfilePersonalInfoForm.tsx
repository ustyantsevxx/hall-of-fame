import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { object, SchemaOf, string } from 'yup'

import { useAuth } from '../api/modules/auth/hooks/useAuth'
import { useUserUpdate } from '../api/modules/user/hooks/useUserUpdate'
import { AppButton } from './AppButton'
import { AppInput } from './AppInput'
import { FormFloatingLabel } from './FormFloatingLabel'
import { FormGroup } from './FormGroup'
import { InputPhoneNumber } from './InputPhoneNumber'
import { PersonalInfoFormData } from './ProfilePersonalInfoForm.types'

type Props = {
  className?: string
}

const personalInfoFormSchema: SchemaOf<PersonalInfoFormData> = object({
  name: string(),
  birthday: string()
    .nullable()
    .default(null)
    .test((value, { createError }) => {
      if (value) {
        const date = dayjs(value)
        const now = dayjs()
        if (!date.isValid()) {
          return createError({ message: 'Неверный формат' })
        }
        if (date.isAfter(now)) {
          return createError({ message: 'Некорректная дата' })
        }
      }
      return true
    })
}).required()

const formatDateForInput = (dateString: string) =>
  dayjs(dateString).format('YYYY-MM-DD') || ''

export const ProfilePersonalInfoForm: FC<Props> = ({ className }) => {
  const { user: personalInfo } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isDirty }
  } = useForm<PersonalInfoFormData>({
    resolver: yupResolver(personalInfoFormSchema),
    defaultValues: {
      name: personalInfo?.name || '',
      birthday: personalInfo?.birth_date
        ? formatDateForInput(personalInfo.birth_date)
        : ''
    }
  })

  useEffect(() => {
    setValue('name', personalInfo?.name || '')
    setValue(
      'birthday',
      personalInfo?.birth_date
        ? formatDateForInput(personalInfo.birth_date)
        : ''
    )
  }, [personalInfo, setValue])

  const haveDataToUpdate = isDirty

  const { mutate: updateUser } = useUserUpdate()

  const onSubmit = handleSubmit(data => {
    const rawDate = getValues('birthday')
    updateUser({
      name: data.name || '',
      birth_date: rawDate ? formatDateForInput(rawDate) : ''
    })
    reset({}, { keepValues: true })
  })

  return (
    <div className={clsx(className)}>
      <h2 className="sr-only">Данные профиля</h2>

      <form onSubmit={onSubmit}>
        <div className="space-y-30">
          <FormGroup errorMessage={errors.name?.message}>
            <FormFloatingLabel label="Ваше имя">
              {({ id }) => (
                <AppInput
                  id={id}
                  placeholder="Ваше имя"
                  className="w-full"
                  {...register('name')}
                />
              )}
            </FormFloatingLabel>
          </FormGroup>

          <FormFloatingLabel label="Номер телефона">
            {({ id }) => (
              <InputPhoneNumber
                id={id}
                key={personalInfo?.phone}
                defaultValue={personalInfo?.phone}
                placeholder="Номер телефона"
                className="block w-full flex-1"
                disabled
              />
            )}
          </FormFloatingLabel>

          <FormGroup errorMessage={errors.birthday?.message}>
            <FormFloatingLabel label="Дата рождения">
              {({ id }) => (
                <AppInput
                  id={id}
                  type="date"
                  placeholder="Дата рождения"
                  className="min-h-[50px] w-full appearance-none text-left"
                  title={
                    !!personalInfo?.birth_date
                      ? 'Дату рождения изменить нельзя'
                      : undefined
                  }
                  disabled={!!personalInfo?.birth_date}
                  {...register('birthday')}
                />
              )}
            </FormFloatingLabel>
          </FormGroup>
        </div>

        <AppButton className="mt-34 w-full" disabled={!haveDataToUpdate}>
          Сохранить
        </AppButton>
      </form>
    </div>
  )
}
