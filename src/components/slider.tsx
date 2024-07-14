'use client'

import React from 'react'
import { Slider as ReactAriaSlider, SliderOutput, SliderThumb, SliderTrack, type SliderProps as ReactAriaSliderProps } from 'react-aria-components'

import { Label } from '@/components/label'
import { getReactAriaClassName } from '@/helpers/styles'

import './slider.styles.sass'

type SliderProps = Omit<ReactAriaSliderProps, 'onChange'> & {
  label?: string
  onChange?: (value: number) => void
}

export const Slider: React.FC<SliderProps> = ({ className, label, onChange, orientation, ...props }) => {
  const handleSliderValueChange = (value: number | number[]) => {
    if (typeof onChange === 'function') {
      onChange(Array.isArray(value) ? value[0] : value)
    }
  }

  const isVertical = orientation === 'vertical'

  return (
    <ReactAriaSlider
      {...props}
      aria-label={isVertical ? label : undefined}
      onChange={handleSliderValueChange}
      orientation={orientation}
      className={(values) => getReactAriaClassName(values, className, 'slider', isVertical && 'vertical')}
    >
      <div className='slider__heading'>
        <Label className='slider__heading__label'>
          {isVertical ? null : label}
        </Label>

        <SliderOutput />
      </div>

      <SliderTrack className='slider__track'>
        <SliderThumb className='slider__track__thumb' />
      </SliderTrack>
    </ReactAriaSlider>
  )
}
