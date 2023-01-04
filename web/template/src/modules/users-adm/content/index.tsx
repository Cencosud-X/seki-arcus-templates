/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import XText from "apps/web-portal/src/components/XText";
import React, { Fragment, useState } from "react";
import Styled from 'styled-components';
import { CheckCircleFilled } from '@ant-design/icons';

const NavBar = Styled.div `
  width: 100%;
  height: 50px;
  margin: 24px 0;
  display: flex;
  align-items: center;
`

const NavButton = Styled.button `
  background: white;
  height: 48px;
  padding: 0 16px;
  border-radius: 100px;
  border:none;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.05em;
`

const ButtonBorder = Styled.div.attrs(props => ({
  className: props.className
})) `
  &.active {
    border-radius: 100px;
    background: linear-gradient(79.78deg, #32E0A1 20.82%, #F0FE0A 89.45%);
    padding: 1px;
  }
  margin-right: 16px;
  width: fit-content;
`
enum NavMenu {
  'Vendedores' = 'VENDOR',
  'Subgerentes' = 'ASSISTANT_MANAGER',
  'Gerente generales'= 'MANAGER',
  'Supervisor tienda' = 'SUPERVISOR',
  'Jefe de caja' = 'CASH_HEAD',
  'Jefe de salón' = 'SALON_HEAD',
  'Administrador' = 'ADMIN'
}

const UserAdmin : React.FC = () => {

  const [activeButton, setActiveButton] = useState<number>(0);

  return (
    <Fragment>
      <XText size={24} weight={700} text={"Administración de cargos"}  />
      <NavBar>
        {Object.entries(NavMenu).map((buttons, index) => {
          return (
            <ButtonBorder className={`${activeButton === index ? 'active' : ''}`} key={index}>
              <NavButton style={{color: activeButton === index ? '#HHHHHH' : '#666666'}} onClick={() => setActiveButton(index)}>
                {buttons[0]}
                {activeButton === index ? 
                <CheckCircleFilled style={{'marginLeft': '8px'}}/> : null}
              </NavButton>
            </ButtonBorder>
          )
        })}
      </NavBar>
      <XText text={"This is an example module for Arcus Portal"} size={40} weight={700} />
    </Fragment>
  )
}

export default UserAdmin