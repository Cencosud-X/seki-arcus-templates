/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable operator-linebreak */
import React, { Fragment } from 'react';
import Styles from 'styled-components'
import XText from '../../components/XText';
import XWidget from '../../components/Widget/index';
import { IWidget } from '../../models/IWidget';
import PermissionWrapper from '../../helpers/PermissionWrapper';


interface IProps {
  widgets?: Array<IWidget>
  onClick?: Function
  name: string
}

const BodyCard = Styles.div `
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 0px 34px #F6F6F6;
  border-radius: 32px;
  padding: 48px 40px;
  margin-bottom: 24px;
`

const Content = Styles.div `
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const RootPage: React.FC<IProps> = (props) => {

  return (
    <Fragment>
      <BodyCard>
        <XText 
          color='000000'
          weight={700}
          size={40}
          text={`Hola, ${props.name} 👋`}
        />
        <XText 
          color='rgba(0,0,0,0.4)'
          weight={400}
          size={20}
          text={`Bienvenido al administrador de Mi Local. <br/>Veamos que hay de nuevo.`}
        />
      </BodyCard>
      <XText 
        color='000000'
        weight={700}
        size={20}
        text={`${props.widgets ? '¿Qué quieres hace hoy?' : ''}`} 
      />
      <Content>
        {props.widgets?.sort((a,b) => a.order < b.order ? -1 : a.order > b.order ? 1 : -1).map((widget, key) => {
          return (
            widget.disabled ? null : 
            <PermissionWrapper key={key} permission={widget.permission}>
              <XWidget
                key={key}
                imageRoute={`../../assets/media/widgets/${widget.url.replace('/','')}.svg`}
                title={widget.name}
                description={widget.description}
                onClick={() => props.onClick!(widget.url)} 
              />
            </PermissionWrapper>
          )
        })}
      </Content>
    </Fragment>
  )
}
export default RootPage
