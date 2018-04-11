import React from "react";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { PersistGate } from "redux-persist/integration/react";

import AppWithNav, { navMiddleware } from "./app/navigation";
import Sockets from "./app/containers/Sockets";
import configureStore from "./app/lib/configureStore";

console.disableYellowBox = true;

const loggerMiddleware = createLogger({
    predicate: () => __DEV__
});

const { store, persistor } = configureStore({
    initialState: {},
    middlewares: {
        nav: navMiddleware,
        thunk: thunkMiddleware,
        logger: loggerMiddleware
    }
});

const App = function () {
    return (
        <Provider store={ store }>
            <PersistGate loading={ null } persistor={ persistor }>
                <AppWithNav />
                <Sockets />
            </PersistGate>
        </Provider>
    );
};

export default App;
