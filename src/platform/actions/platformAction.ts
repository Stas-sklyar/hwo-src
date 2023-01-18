import { ConfigModel } from "platform/models/ConfigModel"
import { ApplicationModel } from "platform/models/ApplicationModel"

export const ACTION_SET_APPS_TO_STORE = 'SET_APPS_TO_STORE';
export const ACTION_SET_CONFIG_TO_STORE = 'ACTION_SET_CONFIG_TO_STORE';

export const setConfigToStore = (config: ConfigModel) => ({
    type: ACTION_SET_CONFIG_TO_STORE,
    payload: config
})

export const setApplicationsForUser = (apps: Array<ApplicationModel>) => ({
    type: ACTION_SET_APPS_TO_STORE,
    payload: apps
})

export type ActionsTypesSsetConfigToStore = ReturnType<typeof setConfigToStore>;
export type ActionsTypesSetApplicationsForUser = ReturnType<typeof setApplicationsForUser>;