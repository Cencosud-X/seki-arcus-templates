import { AuthenticationClient } from '@arcus-core/web-core-utilities';
import secrets from '../config/secrets';

class SessionClient {
  hasExpired = async () => {
    try {
      AuthenticationClient.signOut();
      await this.logout();
      alert('La sesion ha expirado, vuelve a ingresar')
    } catch (error) {
      console.error(error)
    }
  }

  logout = async () => {
    const user = AuthenticationClient.getInfo();
    const loginUrl = `${secrets.SSO_API_URL}/saml/logout?email=${user?.email}`;
    
    const onPopupMessage = async (e: any) => {
      console.log(e.data);
      window.location.reload()
    };

    window.addEventListener("message", onPopupMessage);
    const loginPopUp = window.open(
      loginUrl,
      "_blank",
      "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=500,height=600"
    );

    const timer = setInterval(async function () {
      if (loginPopUp && loginPopUp.closed) {
        console.log("Closed ....");
        clearInterval(timer);
        window.removeEventListener("message", onPopupMessage);
      }
    }, 500);
  }
}

export default new SessionClient