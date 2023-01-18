export class NameValue {
    public Value: any = null;
    public Name: string = '';

    constructor(name: string, value: any) {
        this.Name = name;
        this.Value = value;
    }
}