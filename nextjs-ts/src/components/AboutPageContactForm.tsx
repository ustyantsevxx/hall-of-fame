import clsx from 'clsx'
import { FC, HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'

import { MailFormsService } from '../api/modules/email-forms/email-forms.service'
import { PHONE_REGEX } from '../app/constants/regex'
import { AppButton } from './AppButton'
import { AppInput } from './AppInput'
import { AppTextarea } from './AppTextarea'
import { InputPhoneNumber } from './InputPhoneNumber'
import { ModalConfirmation } from './ModalConfirmation'

type Props = HTMLAttributes<HTMLDivElement>

type FormFields = {
  name: string
  phone: string
  message: string
}

export const AboutPageContactsForm: FC<Props> = ({ className }) => {
  const [modalOpened, setModalOpened] = useState(false)
  const { register, handleSubmit, setValue, reset, formState, trigger } =
    useForm<FormFields>({ mode: 'onChange' })

  const submit = (values: FormFields) => {
    MailFormsService.sendEmailFeedback(values)
    setModalOpened(true)
  }

  return (
    <>
      <div
        className={clsx(
          'rounded-18 bg-gray px-20 pt-18 pb-25 md:px-40 md:pt-34 md:pb-44',
          className
        )}
      >
        <h2 className="text-regular-20 md:text-regular-26">Стать партнером</h2>
        <p className="mt-11 text-black/50 text-regular-15 md:text-regular-17">
          По вопросам сотрудничества, аренды и поставок
        </p>

        <form
          onSubmit={handleSubmit(submit)}
          className="mt-26 flex flex-col space-y-20"
        >
          <AppInput
            className="!border-black/10 bg-transparent"
            placeholder="Имя"
            {...register('name', { required: true })}
          />
          <InputPhoneNumber
            className="!border-black/10 bg-transparent"
            placeholder="Номер телефона"
            onAccept={value => {
              setValue('phone', value)
              trigger('phone')
            }}
            {...register('phone', {
              pattern: PHONE_REGEX,
              required: true
            })}
          />
          <AppTextarea
            rows={5}
            className="!border-black/10 bg-transparent"
            placeholder="Ваше сообщение"
            {...register('message', { required: true })}
          />
          <AppButton className="w-full" disabled={!formState.isValid}>
            Перезвоните мне
          </AppButton>
        </form>
      </div>

      <ModalConfirmation
        title="Анкета отправлена"
        description="Менеджер свяжется с вами в течение 24 часов"
        confirmButtonText="Буду ждать"
        opened={modalOpened}
        contentContainerClassName="md:max-w-[300px] mx-auto"
        onClose={() => {
          reset()
          setModalOpened(false)
        }}
      />
    </>
  )
}
