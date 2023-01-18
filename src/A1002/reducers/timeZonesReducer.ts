import * as A1002ReducerActions from 'A1002/actions/A1002Actions';
import { TimeZoneModel } from "A1002/models/TimeZoneModel";

const initialState: Array<TimeZoneModel> = [];

export const timeZonesReducer = (state = initialState, action: A1002ReducerActions.ActionsTypes): Array<TimeZoneModel> => {
    switch (action.type) {
        case A1002ReducerActions.ACTION_SET_ALL_TIME_ZONES_TO_STORE:
            return [...initialState, ...action.payload]
        default:
            return state;
    }
};