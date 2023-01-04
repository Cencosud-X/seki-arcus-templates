/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import Styled from 'styled-components'
import { Image } from 'antd'
import XText from '../../components/XText'
import ChevronRight from '../../assets/media/icons/chevron-right.svg'

interface IProps {
  imageRoute?: string
  title: string
  description: string
  onClick: Function
}

const Img = Styled.img `
  width: ${props => props.sizes ? props.sizes : '100%'};
`

const Card = Styled.div`
  width: calc(50% - 24px);
  height: 150px;
  background: #ffffff;
  border-radius: 24px;
  padding-right: 34px;
  margin-top: 24px;
  display: flex;
  align-items: center;
`

const Button = Styled.div `
  display: flex;
  width: 56px;
  height: 56px;
  padding: 19px 22px;
  border-radius:50%;
  background: #EFEFEF;
`

const XWidget: React.FC<IProps> = ({ imageRoute, title, description, onClick }) => {
  return (
    <Card>
      <Image width={175} src={imageRoute} />
      <div style={{'padding': '40px 40px 40px 16px', 'width': 'calc(100% - 231px'}}>
        <XText size={28} weight={700} text={title} padding={'8px 0'}/>
        <XText size={16} weight={600} text={description} color={'rgba(0, 0, 0, 0.4)'}/>
      </div>
      <Button
        onClick={() => onClick()}
      >
        <Img sizes='10px' src={ChevronRight}/>
      </Button>
    </Card>
  )
}

export default XWidget

XWidget.defaultProps = {
  imageRoute: '',
  title: 'Lorem ipsum dolor sit',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  onClick: () => {
    console.log('this work fine')
  }
}