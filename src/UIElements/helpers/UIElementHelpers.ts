import { EComponentColorType } from "UIElements/models/EComponentType";

export function GetComponentTextColor(type: EComponentColorType): string {
    return `text-${GetComponentColorSchema(type)}`;
}

export function GetComponentColorSchema(type: EComponentColorType): string {
    const targetType = (type == EComponentColorType.Default) ? EComponentColorType.Primary : type;
    return `${EComponentColorType[targetType].toLowerCase()}`;
}