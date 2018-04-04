import createReducer from "../lib/createReducer";
import * as types from "../actions/types";

const initialState = {
    searched: {},
    count: 0
};

const recipesReducer = createReducer(initialState, {
    [types.SET_SEARCHED_RECIPES](ignore, action) {

        const { recipes = [] } = action;

        const newState = {
            searched: {},
            count: recipes.length
        };

        recipes.forEach(function (recipe) {
            newState.searched[recipe.title] = recipe;
        });

        return {
            ...state,
            ...newState
        };
    },
    [types.ADD_RECIPE](state, ignore) {

        let { count = 0 } = state;

        count += 1;

        return {
            ...state,
            count
        };
    }
});

export default recipesReducer;
