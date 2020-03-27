import { UserActionTypes } from "./user.types";

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGNIN_START
});

export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
});

export const emailSignInStart = () => ({
  type: UserActionTypes.EMAIL_SIGNIN_START
});

export const signUpSuccess = ({ user, additonalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additonalData }
});

export const signUpStart = user => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: user
});

export const signUpError = error => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
});
