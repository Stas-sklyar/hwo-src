export class ApplicationModel {
    public bundle: any;
    public name: string;
    public icon: string;
    public blocked: boolean;

    constructor(
        bundle: any = '',
        name: string = '',
        icon: string = '',
        blocked: boolean = true
    ) {
        this.bundle = bundle;
        this.name = name;
        this.icon = icon;
        this.blocked = blocked;
    }
}