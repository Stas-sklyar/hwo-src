import * as platformReducerActions from 'platform/actions/platformAction';
import { ApplicationModel } from "platform/models/ApplicationModel";

const initialState: Array<ApplicationModel> = [];

export const appsReducer = (state = initialState, action: platformReducerActions.ActionsTypesSetApplicationsForUser): Array<ApplicationModel> => {
    switch (action.type) {
        case platformReducerActions.ACTION_SET_APPS_TO_STORE:
            return [...initialState, ...action.payload]
        default:
            return state;
    }
};