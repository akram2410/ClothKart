import { all, takeLatest, call, put } from "redux-saga/effects";
import { UserActionTypes } from "./user.types";

import {
  signInFailure,
  signInSuccess,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpError
} from "./user.actions";

import {
  auth,
  createUserProfileDocument,
  googleProvider,
  getCurrentUser
} from "../../firebase/firebase.utils";

export function* getSnapShotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapShot = yield userRef.get();
    put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {}
}

export function* signInWithEmailAndPassword({ payload: email, password }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapShotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapShotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}
export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additonalData: { displayName } }));
  } catch (error) {
    yield put(signUpError(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapShotFromUserAuth(user, additionalData);
}
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapShotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(
    UserActionTypes.EMAIL_SIGNIN_START,
    signInWithEmailAndPassword
  );
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onUserSignOutStart),
    call(onUserSignUpSuccess),
    call(onUserSignUpStart),
    call(onCheckUserSession)
  ]);
}

export function* onUserSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onUserSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onUserSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}
