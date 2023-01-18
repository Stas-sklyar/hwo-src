import { AxiosError, AxiosResponse } from "axios";
import { GetActionConfig } from "platform/helpers/UrlHelpers";
import { ConfigModel } from "platform/models/ConfigModel";
import { BaseAPIService } from "platform/api/services/BaseAPIService";
import * as routes from "platform/api/routes/platformRoute";


export class SettingsService extends BaseAPIService {
    public async GetConfig(): Promise<ConfigModel> {

        var actionConfig = GetActionConfig(routes.URL_SETTINGS_CONFIG);

        var response = await this.sendAPIRequest(actionConfig.Method, actionConfig.Url, null);

        var ConfigInfo = response as AxiosResponse<ConfigModel>;

        if (ConfigInfo) {
            return ConfigInfo.data;
        }

        return new ConfigModel();
    }
}    