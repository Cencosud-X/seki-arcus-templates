import { AuthenticationClient, IJwt, IJwtEntity, RESTClient } from "@arcus-core/web-core-utilities";
import SessionClient from "./SessionClient";

class UserClient extends RESTClient {

  meWithJwt = async (jwt: IJwt) => {
    const user = await this.axios.get('users/me/info', {
      headers: {
        "Authorization": `${jwt.token_type.toLowerCase()} ${jwt.access_token}`
      }
    })
    return user;
  }

  getPermissions = async () => {
    
  }

}

export default new UserClient({
  baseURL: `http://localhost:8080`!
});