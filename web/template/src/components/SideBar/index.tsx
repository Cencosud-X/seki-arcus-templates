/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Styles from "styled-components";
import LogoIcon from '../../assets/media/images/arcus-chile.png'
import TemplateClient from "../../clients/TemplateClient";
import PermissionWrapper from "../../helpers/PermissionWrapper";
import { IWidget } from "../../models/IWidget";
import HomeIcon from '../../assets/media/icons/home.svg'

interface IProps {
  currentPath?: string
}

const Sections = Styles.div `
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Bar = Styles(Sections)`
  width: 292px;
  background: #FFFFFF;
  padding: 0 32px;
  @media (max-width: 768px) {
    width: calc(100% - 7.4%);
    display: none;
  }
`

const Img = Styles.img `
  width: ${props => props.sizes ? props.sizes : '100%'};
`

const Logo = Styles(Img) `
  margin: 40px 0; 
`

const Button = Styles.button `
  background: white;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 100px;
  border:none;
  font-weight: 400;
  text-align: left;
  font-size: 14px;
  padding: 12px 16px;
  position: relative;
  letter-spacing: -0.05em;
`

const ButtonBorder = Styles.div.attrs(props => ({
  className: props.className
})) `
  &.active {
    border-radius: 100px;
    background: linear-gradient(79.78deg, #32E0A1 20.82%, #F0FE0A 89.45%);
    padding: 1px;
  }
  width: 100%;
  margin-bottom: 16px;
`

const ActivatedButton = Styles(Button).attrs(props => ({
  className: props.className
}))`
  &.active {
    background: rgba(255,255,255,0.8);
    font-weight: 700;
  }
`

const BarSeparator = Styles.div `
  width: 100%;
  padding: 8px 16px;
  text-align: left;
  margin-bottom: 16px;
  color: #909090;
  font-size: 14px;
  letter-spacing: -0.05em;
`

const SideBar : React.FC<IProps> = (props) => {
  const [widgets, setWidgets] = useState<Array<IWidget> | undefined>();
  const [widgetsCharge, setWidgetsCharge] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    handleWidgets();
  }),[]

  const handleWidgets = async () => {
    try {
      if(!widgetsCharge) {
        const widget = await TemplateClient.getAllWidgets();
        setWidgetsCharge(true);

  
        return setWidgets(widget)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Bar>
      <Logo src={LogoIcon} sizes='134px'></Logo>
      <ButtonBorder className={`${props.currentPath === '/' ? 'active' : null}`}>
        <ActivatedButton 
          className={`${props.currentPath === '/' ? 'active' : null}`}
          onClick={() => navigate('/')}
        >
          <Img sizes="14px" src={HomeIcon} style={{'marginRight' : '8px'}} />
          Inicio
        </ActivatedButton>
      </ButtonBorder>
      <BarSeparator>Herramientas</BarSeparator>
      {widgets?.sort((a,b) => a.order < b.order ? -1 : a.order > b.order ? 1 : -1).map((widget, key) => {
        return (
          widget.disabled ? null :
          <PermissionWrapper key={key} permission={widget.permission}>
            <ButtonBorder className={`${props.currentPath === widget.url ? 'active' : null}`}>
              <ActivatedButton 
                id={key.toString()} 
                className={`${widget.url === props.currentPath ? 'active' : null}`}
                key={key}
                onClick={() => navigate(widget.url)}
              >
                {widget.name} 
              </ActivatedButton>
            </ButtonBorder>
          </PermissionWrapper>
        )
      })}
    </Bar>
  )
}

export default SideBar