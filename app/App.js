import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

import AppWithNav, { navMiddleware } from "./app/navigation";
import rootReducer from "./app/reducers";

console.disableYellowBox = true;

const loggerMiddleware = createLogger({
    predicate: () => __DEV__
});

const configureStore = function (initialState) {

    const enhancer = compose(
        applyMiddleware(
            navMiddleware,
            thunkMiddleware,
            loggerMiddleware
        )
    );

    const persistConfig = {
        key: "root",
        storage
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const config = {
        store: createStore(persistedReducer, initialState, enhancer)
    };

    config.persistor = persistStore(config.store);

    return config;
};

const { store, persistor } = configureStore({});

const App = function () {
    return (
        <Provider store={ store }>
            <PersistGate loading={ null } persistor={ persistor }>
                <AppWithNav />
            </PersistGate>
        </Provider>
    );
};

export default App;
