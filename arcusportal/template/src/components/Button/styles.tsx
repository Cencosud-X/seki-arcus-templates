import Styled from 'styled-components'

const Button = Styled.div `
    box-shadow: var(--shadow);
    border-radius: var(--xbox-rounding-pill);
    padding: var(--xbox-padding-none);
    justify-content: center;
    display: flex;
    position: relative;
    flex-direction: row;
    align-self: stretch;
    align-items: center;
    align-content: stretch;
    max-width: var(--maxwidth);
    border-width: var(--xbox-border-default);
    border-style: solid;
    border-color: transparent;
    box-sizing: border-box;
    cursor: pointer;
    transition: transform 0.25s ease-in-out 0s, opacity;
  ` 

/* eslint-disable @typescript-eslint/no-explicit-any */
export type validTextSize = 10 | 11 | 12
export type validBoxSize =
  | 'auto'
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
export type validTextColor =
  | 'darkest'
  | 'dark'
  | 'light'
  | 'lightest'
  | 'warning'
  | 'error'
  | 'success'

const textBySize: { [key: string]: any } = {
  s: 12,
  m: 11,
  l: 10,
  xl: 10
}

const boxBySize: { [key: string]: any } = {
  s: 9,
  m: 7,
  l: 5,
  xl: 4
}

const handlePadding = (size: string) => {
  if (size === 'l') return 'm'
  if (size === 'xl') return 'none'
  return size
}


const handleBoxSize = (size: string) => boxBySize[size] as validBoxSize
const handleBgColor = (color: string, disabled?: boolean) => {
  if(disabled) return '--color-neutral-light'
  const boxColorByType: { [key: string]: any } = {
    darkest: '--color-neutral-darkest',
    lightest: '--color-neutral-lightest'
  }
  return boxColorByType[color] as validTextColor
}
const handleTextColor = (color: string, disabled?: boolean) => {
  if(disabled) return '--color-neutral-dim'
  const boxColorByType: { [key: string]: any } = {
    darkest: '--color-neutral-lightest',
    lightest: '--color-neutral-darkest',
    warning: '--color-warning-medium',
    success: '--color-success-medium'
  }
  return boxColorByType[color] as validTextColor
}
const handleBoxWidth = (size: string) => size === 'xl' ? 'full' : 'auto'
const handleBorder = (disabled: boolean, type: string) => {
  if (disabled) return false
  if (type === 'outline') return true
  return false
}

const textSize = (size: string) => textBySize[size] as validTextSize

export {
  handlePadding,
  handleBorder,
  handleBoxSize,
  handleBoxWidth,
  textSize,
  handleBgColor,
  handleTextColor,
  Button
}