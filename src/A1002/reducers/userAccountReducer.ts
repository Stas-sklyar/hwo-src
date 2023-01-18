import * as A1002ReducerActions from 'A1002/actions/A1002Actions';
import { AccountModel } from "A1002/models/AccountModel";

const initialState: Array<AccountModel> = [];

export const userAccountReducer = (state = initialState, action: A1002ReducerActions.ActionsTypes): Array<AccountModel> => {
    switch (action.type) {
        case A1002ReducerActions.ACTION_SET_ACCOUNT_INFO:
            return [ ...initialState, ...action.payload ]
        default:
            return state;
    }
};