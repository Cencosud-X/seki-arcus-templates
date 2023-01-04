import React from 'react'
import styled from 'styled-components'
import { Button, Image } from 'antd'
import { RightOutlined } from '@ant-design/icons'

interface IProps {
  image: string
  title: string
  description: string
  onClick: Function
}

const Card = styled.div`
  width: 676px;
  height: 150px;
  background: #ffffff;
  border-radius: 24px;
`

const Title = styled.h1`
  font-family: Open Sans;
  font-size: 24px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.05em;
  text-align: left;
`

const Description = styled.p`
  font-family: Open Sans;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.05em;
  text-align: left;
`

const Widget: React.FC<IProps> = ({ image, title, description, onClick }) => {
  return (
    <Card>
      <Image preview={false} width={200} src={image} />
      <div>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>
      <Button
        shape='circle'
        size='large'
        icon={<RightOutlined />}
        onClick={() => onClick()}
      ></Button>
    </Card>
  )
}

export default Widget
