import { NavigationActions } from "react-navigation";

import AppNavigator from "../containers/AppNavigator";
import * as types from "../actions/types";

const initialState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams("Home")
);

const navReducer = function (state = initialState, action) {

    let nextState;

    switch (action.type) {
    case types.ROUTE_HOME:
    case types.ROUTE_PROFILE:
    case types.ROUTE_MY_WALLET:
    case types.ROUTE_ORDER_HISTORY:
    case types.ROUTE_DRAWER_OPEN:
    case types.ROUTE_DRAWER_CLOSE:
        nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: action.type }),
            state
        );
        break;
    default:
        nextState = AppNavigator.router.getStateForAction(action,state);
        break;
    }

    return nextState || state;
}

export default navReducer;
