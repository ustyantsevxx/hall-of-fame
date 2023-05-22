import { Combobox } from '@headlessui/react'
import clsx from 'clsx'
import { FC, HTMLAttributes, useState } from 'react'
import { useDebounce } from 'react-use'

import { AppComboboxOption } from './AppCombobox.types'
import { AppTransition } from './AppTransition'
import { FormFloatingLabel } from './FormFloatingLabel'

type Props = {
  className?: string
  value?: any
  label?: string
  title?: string
  disabled?: boolean
  inputProps?: HTMLAttributes<HTMLInputElement>
  labelFormatter?: (option: AppComboboxOption) => string
  autocompleteFn?: (query: string) => Promise<AppComboboxOption[]>
  onChange?: (value: any) => void
}

export const AppCombobox: FC<Props> = ({
  className,
  value,
  onChange,
  inputProps,
  label,
  title,
  disabled,
  autocompleteFn
}) => {
  const [query, setQuery] = useState('')

  const [options, setOptions] = useState<AppComboboxOption[]>([])

  const debounceCallAutocomplete = async () => {
    const newOptions = await autocompleteFn?.(query)
    setOptions(newOptions ?? [])
  }

  useDebounce(
    () => {
      if (query) {
        debounceCallAutocomplete()
      }
    },
    500,
    [query]
  )

  return (
    <Combobox
      as="div"
      disabled={disabled}
      title={title}
      className={clsx('relative', className)}
      value={value}
      onChange={v => onChange?.(v)}
    >
      {({ open }) => (
        <>
          <FormFloatingLabel label={label ?? ''}>
            {({ id }) => (
              <Combobox.Input
                disabled={disabled}
                id={id}
                title={value?.label}
                displayValue={(option: AppComboboxOption) => option?.label}
                className="w-full truncate rounded-12 border border-black/10 px-18 pt-14 pb-12 placeholder-black/25 outline-none transition text-regular-17 focus:border-transparent focus:bg-gray disabled:bg-transparent disabled:opacity-50"
                onChange={e => {
                  if (!e.target.value) {
                    onChange?.(undefined)
                  }
                  setQuery(e.target.value)
                }}
                {...inputProps}
              />
            )}
          </FormFloatingLabel>

          <AppTransition show={open && !!query && options.length > 0}>
            <div className="shadow-20-006 absolute inset-x-0 top-full  z-[120] mt-4 overflow-hidden  rounded-12 bg-white ">
              <Combobox.Options
                static
                className="max-h-[230px] overflow-y-auto  px-12 pt-14"
              >
                {options.map((option, i) => (
                  <Combobox.Option
                    className="cursor-pointer truncate pb-14 text-regular-15"
                    key={i}
                    title={option.label}
                    value={option}
                  >
                    {option.label}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </AppTransition>
        </>
      )}
    </Combobox>
  )
}
