import * as env from "platform/config/env";

export const URL_AUTH_SIGN_IN = env.IS_DEVELOPMENT_ENVIRONMENT ? 'POST|/account/login' : 'POST|/auth/signin';
export const URL_AUTH_CHECK = env.IS_DEVELOPMENT_ENVIRONMENT ? 'POST|/hywebos/check-auth' : 'POST|/auth/checkAuthorisation';
export const URL_DATA_COUNTRIES = env.IS_DEVELOPMENT_ENVIRONMENT ? 'GET|/hywebos/countries' : 'POST|/country/countries';
export const URL_DATA_LANGUAGES = env.IS_DEVELOPMENT_ENVIRONMENT ? 'GET|/hywebos/languages' : 'POST|/language/languages';
export const URL_DATA_TIMEZONES = env.IS_DEVELOPMENT_ENVIRONMENT ? 'GET|/hywebos/timezones' : 'POST|/timezone/timezones';
export const URL_DATA_DATE_FORMATS = env.IS_DEVELOPMENT_ENVIRONMENT ? 'GET|/hywebos/dateformats' : 'POST|/dateformat/dateformats';
export const URL_ACCOUNT_GET_INFO = env.IS_DEVELOPMENT_ENVIRONMENT ? 'GET|/hywebos/account-info' : 'POST|/user/account-info';
export const URL_ACCOUNT_UPDATE_INFO = env.IS_DEVELOPMENT_ENVIRONMENT ? 'POST|/hywebos/update-account' : 'POST|/user/update-account';