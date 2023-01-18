import * as A1002ReducerActions from 'A1002/actions/A1002Actions';
import { LanguageModel } from "A1002/models/LanguageModel";

const initialState: Array<LanguageModel> = [];

export const languagesReducer = (state = initialState, action: A1002ReducerActions.ActionsTypes): Array<LanguageModel> => {
    switch (action.type) {
        case A1002ReducerActions.ACTION_SET_ALL_LANGUAGES_TO_STORE:
            return [...initialState, ...action.payload]
        default:
            return state;
    }
};