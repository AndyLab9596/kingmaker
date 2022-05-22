import { createReducer } from '@reduxjs/toolkit';
import { userAction } from 'src/reducers/user/action';
import { UserState } from 'src/reducers/user/model';

const initialState: UserState = {
  publicProfile: null,
};

const userReducer = createReducer(initialState, (builder) =>
  builder.addCase(userAction.updatePublicProfile, (state, action) => {
    state.publicProfile = action.payload;
  }),
);

export default userReducer;
