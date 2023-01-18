import * as A1002ReducerActions from 'A1002/actions/A1002Actions';
import { DateFormatModel } from "A1002/models/DateFormatModel";

const initialState: Array<DateFormatModel> = [];

export const dateFormatsReducer = (state = initialState, action:  A1002ReducerActions.ActionsTypes): Array<DateFormatModel> => {
    switch (action.type) {
        case  A1002ReducerActions.ACTION_SET_ALL_DATE_FORMATS_TO_STORE:
            return [...initialState, ...action.payload]
        default:
            return state;
    }
};