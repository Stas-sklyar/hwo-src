export class TimeZoneModel {
    public code: string;
    public name: string;

    constructor(
        code: string = '',
        name: string = ''
    ) {
        this.code = code;
        this.name = name;
    }
}