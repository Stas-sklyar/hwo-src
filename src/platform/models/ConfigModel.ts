export class ConfigModel 
{
    public urlPlatform: string;
    public urlWebMeeting: string;
    public urlWebSocket: string;
    public urlCDN: string;
    public robots: string;
    public idMatomo: Number;
    public urlMatomo: string;
    public allowStat: string;
    public Name: string;
    public MailFeedBack: string;
    public serverLog: boolean;
    public LogoHome: string;
    public LogoPlatform: string;
    public LogoHomeLogin: string;
    public LogoHomeLoginWidth: string;
    public loginHomeLogoHeight: string;
    public loginHomeLogoWidth: string;
    public www: boolean;
    public Platform: boolean;
    public DefaultApp: string;

    constructor(
        urlPlatform: string = '',
        urlWebMeeting: string = '',
        urlWebSocket: string = '',
        urlCDN: string = '',
        robots: string = '',
        idMatomo: Number = 0,
        urlMatomo: string = '',
        allowStat: string = '',
        Name: string = '',
        MailFeedBack: string = '',
        serverLog: boolean = false,
        LogoHome: string = '',
        LogoPlatform: string = '',
        LogoHomeLogin: string = '',
        LogoHomeLoginWidth: string = '',
        loginHomeLogoHeight: string = '',
        loginHomeLogoWidth: string = '',
        www: boolean = false,
        Platform: boolean = true,
        DefaultApp: string = '',
    ) {
        this.urlPlatform = urlPlatform;
        this.urlWebMeeting = urlWebMeeting;
        this.urlWebSocket = urlWebSocket;
        this.urlCDN = urlCDN;
        this.robots = robots;
        this.idMatomo = idMatomo;
        this.urlMatomo = urlMatomo;
        this.allowStat = allowStat;
        this.Name = Name;
        this.MailFeedBack = MailFeedBack;
        this.serverLog = serverLog;
        this.LogoHome = LogoHome;
        this.LogoPlatform = LogoPlatform;
        this.LogoHomeLogin = LogoHomeLogin;
        this.LogoHomeLoginWidth = LogoHomeLoginWidth;
        this.loginHomeLogoHeight = loginHomeLogoHeight;
        this.loginHomeLogoWidth = loginHomeLogoWidth;
        this.www = www;
        this.Platform = Platform;
        this.DefaultApp = DefaultApp;
    }
}