import * as env from "platform/config/env";

export const URL_SETTINGS_CONFIG = env.IS_DEVELOPMENT_ENVIRONMENT ? 'GET|/hywebos/config' : 'POST|/settings/config';
export const URL_APP_GET_LIST = env.IS_DEVELOPMENT_ENVIRONMENT ? 'GET|/hywebos/apps' : 'POST|/app/apps-user';
