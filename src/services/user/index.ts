import { User } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/user/models';
import { apiIns } from 'src/config/apiClient';

class UserService {
  static getMyProfile(): Promise<User> {
    return apiIns.user.me();
  }
}

export default UserService;
