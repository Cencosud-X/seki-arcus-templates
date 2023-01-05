import jwtDecode from "jwt-decode";
import WithBootedClient from "../lib/WithBootedClient";
import IJwt from "../models/IJwt";
import IJwtEntity from "../models/IJwtEntity";

const storageName = "@user";
let decodedJwt: any;
let rawJwt: IJwt;


export async function getAuthFromCache(): Promise<IState | null> {
  const cacheAuth = await sessionStorage.getItem(storageName)
  //const cacheAuth = await Storage.get({ key: storageName });
  if (cacheAuth) {
    return JSON.parse(cacheAuth!);
  }
  return null;
}

interface IState {
  isAuthenticated: boolean;
  user?: IJwt;
  provider: string;
}

class AuthenticationClient extends WithBootedClient {
  state: IState = {
    isAuthenticated: false,
    provider: ""
  };

  async boot(): Promise<void> {
    const newState = await getAuthFromCache();
    if (newState) {
      this.setState(newState);
      rawJwt = newState.user!;
      decodedJwt = jwtDecode(rawJwt.access_token)
    }
  }

  isAuthenticated(): boolean {
    return this.state.isAuthenticated;
  }

  getInfo(): IJwtEntity {
    return decodedJwt;
  }

  async getAuth(): Promise<IJwt> {
    return rawJwt;
  }

  async authenticate(provider: string, rawJwt: IJwt): Promise<void> {
    // Set User Login OK!
    await this.setState({
      isAuthenticated: true,
      user: rawJwt,
      provider: provider
    });

    decodedJwt = jwtDecode(rawJwt.access_token);
    sessionStorage.setItem(
      storageName,
      JSON.stringify(this.state)
    );
  }

  hasRole(rolesToFind: Array<string> | string): boolean {
    const rolesForCheck = Array.isArray(rolesToFind) ? rolesToFind : [rolesToFind];
    for (let index = 0; index < rolesForCheck.length; index++) {
      const roleToCheck = rolesForCheck[index];
      if (decodedJwt.scope.indexOf(roleToCheck) >= 0) {
        return true;
      }
    }
    return false;
  }

  async signOut(): Promise<void> {
    await this.setState({
      isAuthenticated: false,
      user: undefined,
      provider: ""
    });

    await sessionStorage.removeItem(storageName)
  }

  async setState(newState: IState): Promise<void> {
    this.state = newState;
  }
}

export default new AuthenticationClient();
