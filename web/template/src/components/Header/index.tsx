import React from 'react';
import Styles from 'styled-components';
import XText from '../XText';
import Avatar from '../../assets/media/images/avatar.png';
import LogoutIcon from '../../assets/media/icons/exit.svg';
import { AuthenticationClient } from '@arcus-core/web-core-utilities';
import secrets from '../../config/secrets';
import SessionClient from '../../clients/SessionClient';

interface IProps {
  name: string
}

const HeaderBar = Styles.div `
  width: 100%;
  height: 108px;
  padding: 36px 0 24px;
  justify-content: flex-end;
  display: flex;
  align-items: center;
`

const Img = Styles.img `
  width: ${props => props.sizes ? props.sizes : '100%'};
`

const HorizontalSeparator = Styles.div `
  border-left: 1px solid rgba(51,51,51,0.2);
  height: 60px;
  margin: 0 24px;
`

const handleLogOut = async () => {
  AuthenticationClient.signOut();
  await SessionClient.logout();
  //window.location.reload();
}

const Header: React.FC<IProps> = (props) => {
  return (
    <HeaderBar>
      <XText padding={'0 16px'} size={16} weight={600} color={'color: rgba(51,51,51,0.8)'} text={props.name}/>
      <Img sizes='40px' src={Avatar} height='inherit'></Img>
      <HorizontalSeparator />
      <div onClick={handleLogOut}>
        <Img sizes='24px' src={LogoutIcon}/>
      </div>
    </HeaderBar>
  )
}

export default Header;