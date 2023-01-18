import { AxiosError, AxiosResponse } from "axios";
import { GetActionConfig } from "platform/helpers/UrlHelpers";
import { AccountModel } from "A1002/models/AccountModel";
import { BaseAPIService } from "platform/api/services/BaseAPIService";
import * as routes from "A1002/api/routes/A1002Routes";

export class AccountInfoService extends BaseAPIService {
    
    public async GetAccountInfo(): Promise<AccountModel> {
        var actionConfig = GetActionConfig(routes.URL_ACCOUNT_GET_INFO);

        var response = await this.sendAPIRequest(actionConfig.Method, actionConfig.Url, null);

        var accountInfo = response as AxiosResponse<AccountModel, any>;

        if (accountInfo) {
            return accountInfo.data;
        }

        return new AccountModel();
    }

    public async UpdateAccountInfo(prop: string, value: any): Promise<AccountModel | null> {

        var actionConfig = GetActionConfig(routes.URL_ACCOUNT_UPDATE_INFO);

        let response = await this.sendAPIRequest(actionConfig.Method, actionConfig.Url, {
            property: prop,
            value: value.toString()
        });

        let successResponse = response as AxiosResponse<AccountModel, any>;

        if (successResponse) {
            return successResponse.data;
        } else {
            return null;
        }
    }
}