/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React from 'react';
import { PageWrapper, Rigth, Left, Img, Title, Subtitle} from './styles'
import Logo from '../../assets/media/images/logo.png'
import Panel from '../../assets/media/images/panel-ref.png'
import Button from '../../components/Button'
import secrets from '../../config/secrets'
import { AuthenticationClient, IJwt } from '@arcus-core/web-core-utilities';

interface IProps {
  onAuthenticated: (needRegistration: boolean, jwt?: IJwt) => void
}

const SignInPage: React.FC<IProps> = (props) => {
  const onSSOCallbackHandler = async (jwt: IJwt) => {
    const authenticateUser = async (provider: string, jwt: IJwt) => {
      await AuthenticationClient.authenticate(provider, jwt);
      props.onAuthenticated(false);
    }

    authenticateUser('google', jwt);
  };

  const onLogin = async () => {
		const loginUrl = `${secrets.SSO_API_URL}/saml/101010101010101010101/login`
    
    const onPopupMessage = async (e: any) => {
      if (e.origin === e.data.origin) {
        const authData = e.data
        onSSOCallbackHandler(authData)
      }
    };
	
		window.addEventListener("message", onPopupMessage);
		const loginPopUp = window.open(
			loginUrl,
			"_blank",
			"toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=500,height=600"
		);
	
		const timer = setInterval(function () {
      if (loginPopUp && loginPopUp.closed) {
        console.log("Closed ....")
        clearInterval(timer);
        window.removeEventListener("message", onPopupMessage);
      }
    }, 500);
	};

  return (
    <PageWrapper>
      <Left>
        <Img src={Panel}></Img>
      </Left>
      <Rigth>
        <Img sizes='90px' src={Logo} ></Img>
        <Title>La comunicación de todos los locales, en un solo lugar</Title>
        <Subtitle>El portal para administrar Mi Local</Subtitle>
        <Button 
          mode='darkest' 
          size='xl' 
          text='Ingresa con tu correo Cencosud'
          onClick={onLogin}
        />
      </Rigth>
    </PageWrapper>
  );
}
export default SignInPage