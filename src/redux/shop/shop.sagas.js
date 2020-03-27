import { takeLatest, call, put, all } from "redux-saga/effects";

import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";
import { fetchCollectionSuccess, fetchCollectionsError } from "./shop.actions";
import ShopActionTypes from "./shop.types";

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsError(error.message));
  }
}

export function* fetchCollectionStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTION_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionStart)]);
}
