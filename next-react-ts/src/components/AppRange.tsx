import clsx from 'clsx'
import { FC } from 'react'
import { getTrackBackground, Range } from 'react-range'

type Props = {
  values: number[]
  min: number
  max: number
  step?: number
  disabled?: boolean
  rtl?: boolean
  onChange: (values: number[]) => void
}

export const AppRange: FC<Props> = ({
  values,
  min,
  max,
  step = 1,
  rtl = false,
  disabled,
  ...attrs
}) => {
  return (
    <div className={clsx('relative h-53', disabled && 'opacity-60')}>
      <Range
        values={values}
        step={step}
        rtl={rtl}
        min={min}
        max={max}
        disabled={disabled}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className={clsx(
              'flex h-30 items-center',
              disabled && '!cursor-not-allowed'
            )}
            style={{
              ...props.style
            }}
          >
            <div
              ref={props.ref}
              className={clsx(
                'h-2 w-full self-center rounded-full',
                disabled && 'cursor-not-allowed'
              )}
              style={{
                background: getTrackBackground({
                  values,
                  colors: ['#FFBEC9', 'rgba(0, 0, 0, 0.2)'],
                  min,
                  max,
                  rtl: false
                })
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="h-20 w-20 rounded-full bg-pink"
            style={{
              ...props.style
            }}
          >
            <div className="absolute -bottom-30 left-0 right-0 text-center text-regular-17">
              {values[0]}
            </div>
          </div>
        )}
        {...attrs}
      />

      <div
        className={clsx(
          'absolute left-0 top-20 text-black/50 transition-opacity text-regular-15',
          values[0] < 2 ? 'opacity-0' : 'opacity-100'
        )}
      >
        {min}
      </div>
    </div>
  )
}
