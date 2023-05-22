import clsx from 'clsx'
import { FC, KeyboardEvent, useState } from 'react'

import ChevronSvg from '../assets/svg/Chevron.svg'
import { AppModal } from './AppModal'
import { AppSelectOption } from './AppSelect.types'

type Props = {
  label: string
  value?: AppSelectOption
  onChange: (option: AppSelectOption) => void
  options: AppSelectOption[]
  className?: string
  optionsContainerClassName?: string
  disabled?: boolean
}

export const AppSelect: FC<Props> = ({
  label,
  value,
  onChange,
  options,
  className,
  disabled,
  optionsContainerClassName
}) => {
  const [optionsModalOpened, setOptionsModalOpened] = useState(false)
  const openModal = () => setOptionsModalOpened(true)
  const closeModal = () => setOptionsModalOpened(false)
  const selectedOption = options.find(option => option.key === value?.key)

  const onSelectOption = (option: AppSelectOption) => {
    onChange(option)
    closeModal()
  }

  const onKeyDown = (
    e: KeyboardEvent<HTMLLIElement>,
    option: AppSelectOption
  ) => {
    const enterClicked = e.key === 'Enter'
    if (enterClicked) {
      e.preventDefault()
      onSelectOption(option)
    }
  }

  return (
    <div className={clsx(className)}>
      <button
        disabled={disabled}
        className="flex w-full items-center justify-between overflow-hidden rounded-12 border border-black/10 px-14 pt-15 pb-13 text-regular-17 disabled:border-black/5"
        title={selectedOption?.name || label}
        onClick={openModal}
      >
        {selectedOption ? (
          <span className="block truncate">{selectedOption.name}</span>
        ) : (
          <span className="block text-black/50 disabled:text-black/10">
            {label}
          </span>
        )}

        <ChevronSvg className="ml-2 shrink-0" />
      </button>

      <AppModal
        title={label}
        emptyFocusTrap={options.length === 0}
        opened={optionsModalOpened}
        headerClassName="md:hidden"
        contentWrapperClassName="grow flex flex-col"
        panelClassName="md:max-h-[500px] md:max-w-[500px] md:!p-40"
        onClose={setOptionsModalOpened}
      >
        {options.length > 0 ? (
          <ul className={clsx('grid gap-20', optionsContainerClassName)}>
            {options.map((option, i) => (
              <li
                tabIndex={0}
                key={`${option.key}${i}`}
                className={clsx(
                  'cursor-pointer rounded-12 px-24 py-12 transition-all',
                  selectedOption?.key === option.key
                    ? 'bg-gray'
                    : 'shadow-20-006'
                )}
                onClick={() => onSelectOption(option)}
                onKeyDown={e => onKeyDown(e, option)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-full items-center justify-center text-black/50">
            Нет доступных элементов
          </div>
        )}
      </AppModal>
    </div>
  )
}
