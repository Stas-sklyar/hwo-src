import React, { ChangeEventHandler, Fragment, MouseEventHandler, useState } from 'react';
import { FC } from 'react';
import { formatAMPM } from 'platform/helpers/GeneralHelpers';

const SystemTime: FC<{ locale: string }> = ({ locale }) => {

    const[currentDate, setCurrentDate] = useState(new Date());

    window.setInterval(() => {
        setCurrentDate(new Date());
    }, 200);

    const formatDay = () => {
        return `${currentDate.toLocaleDateString(locale, { weekday: 'long' })}, ${currentDate.toLocaleDateString(locale, { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    };

    return <Fragment>
        <span className="system-time" id="system-time">{formatAMPM(currentDate)}</span>
        <span className="system-date" id="system-date">{ formatDay() }</span>
    </Fragment>
}

export default SystemTime;