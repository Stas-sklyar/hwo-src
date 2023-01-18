export class AccountModel {
    public pid: Number;
    public displayName: string;
    public birthYear: Number;
    public sex: string;
    public codeCountry: string;
    public timeZoneId: Number;
    public dateFormatId: Number;
    public avatar: string;
    public codeLanguage: string;
    public mail: string;
    public multipleSessions: boolean;
    public twostepAuth: boolean;
    public endToEndEncryption: boolean;
    public zeroAccess: boolean;
    public noPersonalInfo: boolean;

    constructor(
        pid: Number = 0,
        displayName: string = '',
        birthYear: Number = 1920,
        sex: string = '',
        codeCountry: string = '',
        timeZoneId: Number = 0,
        dateFormatId: Number = 0,
        avatar: string = '',
        codeLanguage: string = '',
        mail: string = '',
        multipleSessions: boolean = false,
        twostepAuth: boolean = false,
        endToEndEncryption: boolean = true,
        zeroAccess: boolean = true,
        noPersonalInfo: boolean = true
    ) {
        this.pid = pid;
        this.displayName = displayName;
        this.birthYear = birthYear;
        this.sex = sex;
        this.codeCountry = codeCountry;
        this.timeZoneId = timeZoneId
        this.dateFormatId = dateFormatId;
        this.avatar = avatar;
        this.codeLanguage= codeLanguage;
        this.mail = mail;
        this.multipleSessions = multipleSessions;
        this.twostepAuth = twostepAuth;
        this.endToEndEncryption = endToEndEncryption;
        this.zeroAccess = zeroAccess;
        this.noPersonalInfo = noPersonalInfo;
    }
}