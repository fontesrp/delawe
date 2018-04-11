import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "../reducers";

const configureStore = function (props) {

    const {
        initialState,
        middlewares
    } = props;

    const enhancer = compose(
        applyMiddleware(
            middlewares.nav,
            middlewares.thunk,
            middlewares.logger
        )
    );

    const persistConfig = {
        key: "root",
        storage
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const store = createStore(persistedReducer, initialState, enhancer);

    const persistor = persistStore(store);

    return {
        store,
        persistor
    };
};

export default configureStore;
