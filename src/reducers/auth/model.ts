import { User } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/user/models';

export interface AuthState {
  myProfile?: User;
  /* false -> user not logged
   * true -> user logged
   * null -> should call API
   */
  isLogged: boolean | null;
  ignoreRedirect: boolean;
}
