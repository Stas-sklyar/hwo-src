import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { FC } from 'react';
import 'UIElements/assets/UIElements/css/UIElements.css';
import Heading, { HeadingConfig } from './Heading/Heading';
import { EComponentColorType } from 'UIElements/models/EComponentType';
import * as UIHelpers from 'UIElements/helpers/UIElementHelpers';

function UIElements() {

    return (
        <div className='mt-4 mx-3'>
            { 
                [1,2,3,4,5,6].map((type) => { 
                    const itemConfig: HeadingConfig = {
                        type: type,
                        backgroundColor: EComponentColorType.Default,
                        className: '',
                        text: '',
                        textColor: EComponentColorType.Tertiary
                    };
                    return <Heading config={ itemConfig }></Heading> 
                }) 
            } 
            <div>
                <em>Tag &lt;em&gt; (!italic)</em>
            </div>
            <div>
                <strong>Tag &lt;strong&gt; (!bold)</strong>
            </div>
            <div className="underline">Tag .underline: (css: .underline)</div>
            <div>
                <a href="http://website.net">Tag &lt;a href&gt;: http://website.net (#ffffff, underline)</a>
            </div>
            <div className={UIHelpers.GetComponentTextColor(EComponentColorType.Primary)}>Color: primary (by default) (#ffffff)</div>
            <div className={UIHelpers.GetComponentTextColor(EComponentColorType.Secondary)}>Color: secondary (#c9c9c9)</div>
            <div className={UIHelpers.GetComponentTextColor(EComponentColorType.Tertiary)}>Color: tertiary (#b4b4b4)</div>
            <div className={UIHelpers.GetComponentTextColor(EComponentColorType.Quaternary)}>Color: quaternary (#616161)</div>
            <div className={UIHelpers.GetComponentTextColor(EComponentColorType.Info)}>Color: info (#4d7487)</div>
            <div className={UIHelpers.GetComponentTextColor(EComponentColorType.Error)}>Color: error (#de0000)</div>
            <div className={UIHelpers.GetComponentTextColor(EComponentColorType.Warning)}>Color: warning (#ed9c28)</div>
            <div className={UIHelpers.GetComponentTextColor(EComponentColorType.Success)}>Color: success (#47a447)</div>
        </div>
    );
}

export default UIElements;