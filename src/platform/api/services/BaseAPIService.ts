import axios, { AxiosError } from 'axios'
import * as env from "platform/config/env";
import * as CookieHelper from 'platform/helpers/CookieHelpers'

export class BaseAPIService {
    protected async sendAPIRequest(method: string, url: string, data: any, preventCookies: boolean = false) {
        try {
            let token = "";
            if (CookieHelper.getCookie("auth")) {
                token = CookieHelper.getCookie("auth").token;
            }

            let headers = (token && !preventCookies) ?
                {
                    'Content-Type': env.IS_DEVELOPMENT_ENVIRONMENT ? 'application/json' : 'text/plain',
                    'Accept': 'application/json'
                } :
                {
                    'Content-Type': env.IS_DEVELOPMENT_ENVIRONMENT ? 'application/json' : 'text/plain',
                    'Accept': '*/* '
                };

            if (token && !preventCookies) {
                if (env.IS_DEVELOPMENT_ENVIRONMENT) {
                    headers['Authorization'] = `Bearer ${token}`;
                } else {
                    headers['x-access-token'] = token;
                }
            }

            if (env.IS_DEVELOPMENT_ENVIRONMENT) {
                headers['Access-Control-Allow-Origin'] = '*'
            }

            // 'Authorization': 'Bearer ' + token

            let response = await axios({
                method: method,
                url: env.API_URL + url,
                data: data && JSON.stringify(data),
                headers: headers,
                withCredentials: true,
            });
            return response;
        }
        catch (error) {
            if (typeof error === 'string') {
                console.log(error);
            } else if (error instanceof Error) {
                let exception: Error = error;
                console.log(exception);
            }
            return error as AxiosError;
        }
    }
}