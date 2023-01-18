import { AxiosError, AxiosResponse } from "axios";
import { BaseAPIService } from "platform/api/services/BaseAPIService";
import { CryptoHelpers } from "platform/helpers/CryptoHelpers";
import { GetActionConfig } from "platform/helpers/UrlHelpers";
import * as routes from "A1002/api/routes/A1002Routes";
import * as env from "platform/config/env";


export class AuthService extends BaseAPIService {
    public async Login(email: string, password: string): Promise<AxiosResponse<any, any> | AxiosError<any>> {
        let crypto = new CryptoHelpers();

        var actionConfig = GetActionConfig(routes.URL_AUTH_SIGN_IN);

        let pwd = password;
        if (!env.IS_DEVELOPMENT_ENVIRONMENT) {
            pwd = await crypto.hash256(password);
        }

        var response = await this.sendAPIRequest(actionConfig.Method, actionConfig.Url, {
            email: email,
            password: pwd
        }, true);

        console.log(response);

        return response;
    }

    public async IsLoggedIn(): Promise<boolean> {

        var actionConfig = GetActionConfig(routes.URL_AUTH_CHECK);
        let response = await this.sendAPIRequest(actionConfig.Method, actionConfig.Url, null);

        let result = response as AxiosResponse<boolean>;

        return result.data;


        /*if (response instanceof AxiosError) {
            result = false;
        } else  {
            result = true;
        }*/

        /*return await response instanceof AxiosError;*/
    }
}