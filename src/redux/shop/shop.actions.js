import ShopActionTypes from "./shop.types";

import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTION_START
});

export const fetchCollectionSuccess = collectionsMap => ({
  type: ShopActionTypes.fetchCollectionSuccess,
  payload: collectionsMap
});
export const fetchCollectionsError = errorMessage => ({
  type: ShopActionTypes.fetchCollectionsError,
  payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection("collections");
    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsError(error.message)));
  };
};
