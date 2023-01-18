import 'UIElements/assets/Heading/css/Heading.css';
import { FC } from 'react';
import { EComponentColorType } from 'UIElements/models/EComponentType';
import { ElementConfig, IElementConfig } from 'UIElements/models/IElementConfig';
import * as UIHelpers from 'UIElements/helpers/UIElementHelpers';

export class HeadingConfig extends ElementConfig {
    public type: number = 4;
    public text: string = '';
}

const Heading: FC<{ config: HeadingConfig }> = ({ config }) => {

    const textColor = UIHelpers.GetComponentTextColor(config.textColor);

    switch (config.type) {
        case 1:
            return  <h1 className={`${textColor}`}>{ config.text || 'Heading h1 (Bold, 18px)' }</h1>
        case 2: 
            return  <h2 className={`${textColor}`}>{ config.text || 'Heading h2 (Semi-Bold, 16px)' }</h2>
        case 3:
            return  <h3 className={`${textColor}`}>{ config.text || 'Heading h3 (Medium, 15px)' }</h3>
        case 4:
        default:
            return  <h4 className={`${textColor}`}>{ config.text || 'Heading h4 (Medium, 14px)' }</h4>
        case 5:
            return  <h5 className={`${textColor}`}>{ config.text || 'Heading h5 (Medium, 13px)' }</h5>
        case 6:
            return  <h6 className={`${textColor}`}>{ config.text || 'Heading h6 (Regular, 13px)' }</h6>
    }
}

export default Heading;

export function CreateHeadingConfig(type: number, text: string): HeadingConfig {
    return { ...new HeadingConfig(), ...{
        type: type,
        textColor: EComponentColorType.Default,
        text: text
     } };
}