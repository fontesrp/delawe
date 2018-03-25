import * as types from "./types";
import Api from "../lib/api";

export const addRecipe = function (tmp) {
    return function (dispatch, getState) {
        dispatch({
            type: types.ADD_RECIPE
        });
    };
};

const setSearchedRecipes = function ({ recipes }) {
    return {
        type: types.SET_SEARCHED_RECIPES,
        recipes
    };
};

export const fetchRecipes = function (ingredients) {

    return function (dispatch, getState) {

        const params = [
            `i=${encodeURIComponent(ingredients)}`,
            "fillIngredients=false",
            "limitLicense=false",
            "number=20",
            "ranking=1"
        ].join("&");

        return Api
            .get(`/api/?${params}`)
            .then(function (res) {
                dispatch(setSearchedRecipes({
                    recipes: res.results
                }));
            });
    };
};
