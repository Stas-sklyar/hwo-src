
export class ActionConfig {
    public Method: string = 'GET';
    public Url: string = '';
}

export function GetActionConfig(configStr: string): ActionConfig {
    let config = new ActionConfig();
    let parts = configStr.split('|');
    config.Method = parts[0].toUpperCase();
    config.Url = parts[1].trim();
    return config;
}