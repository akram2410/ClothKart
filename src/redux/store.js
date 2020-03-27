import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleWare from "redux-saga";
import rootSaga from "./root-saga";

import rootReducer from "./root-reducer";

const sagaMiddleWare = createSagaMiddleWare();
const middlewares = [sagaMiddleWare, logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
sagaMiddleWare.run(rootSaga);

export default { store, persistStore };
