import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import AppWithNav, { navMiddleware } from "./app/navigation";
import reducer from "./app/reducers";

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

    return createStore(reducer, initialState, enhancer);
};

const store = configureStore({});

const App = function () {
    return (
        <Provider store={store}>
            <AppWithNav />
        </Provider>
    );
};

export default App;
