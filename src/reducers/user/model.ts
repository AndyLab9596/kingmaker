import { User } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/user/models';

export interface UserState {
  publicProfile: User | null;
}
