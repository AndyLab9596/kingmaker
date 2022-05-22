import { apiIns } from 'src/config/apiClient';
import { LoginParams } from './model';

class AuthService {
  static signIn(info: LoginParams) {
    return apiIns.auth.login(info.username, info.password);
  }
}

export default AuthService;
