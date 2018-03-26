import createReducer from "../lib/createReducer";
import * as types from "../actions/types";
import { patchOldState } from "../lib/util";

const initialState = {
    balance: 7733.30,
    creditCard: {
        credits: "",
        card: "",
        expiry: "",
        cvv: ""
    }
};

const walletReducer = createReducer(initialState, {

    [types.UPDATE_CREDIT_CARD](state, action) {

        const creditCard = patchOldState(state.creditCard, action);

        return {
            ...state,
            creditCard
        };
    },

    [types.UPDATE_BALANCE](state, action) {

        const newState = { ...initialState };
        newState.balance = action.balance;

        return newState;
    },

    [types.CLEAR_CREDIT_CARD](state, action) {

        const creditCard = { ...initialState.creditCard };

        return {
            ...state,
            creditCard
        };
    }
});

export default walletReducer;
