import React from "react";
import Styled from 'styled-components';
import * as styles from './styles'

interface Props {
  size: 's' | 'm' | 'l' | 'xl',
  mode: 'darkest' | 'lightest',
  text: string,
  onClick?: () => void
  disabled?: boolean
}

const Button : React.FC<Props> = (props) => {

  const bgColor = styles.handleBgColor(props.mode)
  const textColor = styles.handleTextColor(props.mode)
  const boxSize = styles.handleBoxSize(props.size)
  const boxWidth = styles.handleBoxWidth(props.size)

  const handleClick = () => {
    if (props.disabled) return
    if (props.onClick) props.onClick()
  }

  const XButton = Styled(styles.Button) `
    background-color: var(${bgColor});
    color: var(${textColor});
    height: var(--xbox-size-${boxSize});
    width: ${boxWidth};
    font-weight: 700;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: -0.05em;
  ` 

  return (
    <XButton onClick={handleClick}>
      {props.text}
    </XButton>
  )
}

export default Button;