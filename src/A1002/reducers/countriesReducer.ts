import * as A1002ReducerActions from 'A1002/actions/A1002Actions';
import { CountryModel } from "A1002/models/CountryModel";

const initialState: Array<CountryModel> = [];

export const countriesReducer = (state = initialState, action: A1002ReducerActions.ActionsTypes): Array<CountryModel> => {
    switch (action.type) {
        case A1002ReducerActions.ACTION_SET_ALL_COUNTRIES_TO_STORE:
            return [...initialState, ...action.payload]
        default:
            return state;
    }
};