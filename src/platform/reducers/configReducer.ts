import * as platformReducerActions from 'platform/actions/platformAction';
import { ConfigModel } from "platform/models/ConfigModel";

const initialState: any = {};

export const configReducer = (state = initialState, action: platformReducerActions.ActionsTypesSsetConfigToStore): Array<ConfigModel> => {
    switch (action.type) {
        case platformReducerActions.ACTION_SET_CONFIG_TO_STORE:
            return [initialState, action.payload]
        default:
            return state;
    }
};