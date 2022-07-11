import { appContextVar } from '../apollo';
import { parseJwt } from '../jwtService';

export class AuthProvider {
  appConfig: { [key: string]: any };
  constructor(appConfig: { [key: string]: any }) {
    this.appConfig = appConfig;
  }
  onAuthenticationSuccess(data: any) {
    const stringUser = parseJwt(data?.userDetailsToken);
    if (stringUser) {
      localStorage.setItem('user', stringUser);
      return { user: JSON.parse(stringUser), isAuthenticate: data?.isAuthenticate, isNewUser: data?.isNewUser };
    }
    return { user: {}, isAuthenticate: false, isNewUser: false };
  }
  handleLogout() {
    const requestUrl = `${this.appConfig.serverBaseUrl}/api/logout`;
    fetch(requestUrl, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    }).catch(error => {
      console.log('error', error);
    });
    localStorage.removeItem('user');
    appContextVar({});
  }
}

export default AuthProvider;
