import { createAction } from '@reduxjs/toolkit';
import { UserState } from './model';

enum UserAction {
  UPDATE_PUBLIC_PROFILE = '@user/UPDATE_PUBLIC_PROFILE',
}
const updatePublicProfile = createAction<UserState['publicProfile']>(UserAction.UPDATE_PUBLIC_PROFILE);
export const userAction = {
  updatePublicProfile,
};

export default UserAction;
