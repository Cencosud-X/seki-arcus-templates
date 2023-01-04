import React from 'react';
import Styles from 'styled-components'

interface IProps {
  color?: string,
  size?: number,
  weight?: 300 | 400 | 600 | 700,
  text: string,
  padding?: string
}

const XText: React.FC<IProps> = (props) => {

  const Text = Styles.h1 `
    color: ${props.color};
    font-size: ${props.size}px;
    letter-spacing: -0.05em;
    font-weight: ${props.weight};
    margin: 0px;
    line-height: 100%;
    padding: ${props.padding};
  `

  return(
    <Text>
      <div dangerouslySetInnerHTML={{__html: props.text}}></div>
    </Text>
  )

}

export default XText

XText.defaultProps = {
  color: '000000',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  size: 20,
  weight: 300,
  padding: '0'
}