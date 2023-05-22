import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import { FC, ReactNode } from 'react'

import RadioCheckedSvg from '../assets/svg/RadioChecked.svg'
import RadioNotCheckedSvg from '../assets/svg/RadioNotChecked.svg'
import { RadioGroupOption } from './AppRadioGroup.types'

type Props = {
  label: string
  className?: string
  options: RadioGroupOption[]
  value?: RadioGroupOption
  nameRenderer?: (option: RadioGroupOption) => ReactNode
  onChange: (option: RadioGroupOption) => void
}

export const AppRadioGroup: FC<Props> = ({
  label,
  value,
  onChange,
  nameRenderer,
  options,
  className
}) => {
  const selectedOption = options.find(option => option.key === value?.key)

  return (
    <RadioGroup
      value={selectedOption}
      className={clsx(className)}
      onChange={onChange}
    >
      <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
      <div className="space-y-14">
        {options.map(option => (
          <RadioGroup.Option key={option.key} value={option}>
            {({ checked }) => (
              <div className="w-full cursor-pointer">
                <div className="flex">
                  <div className="text-pink">
                    {checked ? (
                      <RadioCheckedSvg width={18} height={18} />
                    ) : (
                      <RadioNotCheckedSvg width={18} height={18} />
                    )}
                  </div>

                  <div className="ml-12">
                    <RadioGroup.Label
                      as="p"
                      className={clsx('text-regular-17')}
                    >
                      {nameRenderer?.(option) || option.name}
                    </RadioGroup.Label>
                  </div>
                </div>

                <div className="ml-30 mt-4 ">
                  {option.description && (
                    <RadioGroup.Description
                      className={clsx('text-black/50 text-regular-15')}
                    >
                      {option.description}
                    </RadioGroup.Description>
                  )}
                </div>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
