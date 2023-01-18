import React from 'react';
import 'UIElements/assets/LogoutPage/css/LogoutPage.css';

import na_placeholder from 'UIElements/assets/LogoutPage/img/not-accessible.png';

export class LogoutPage extends React.Component<{pageName: string}> {
    render() {
        return (
            <div className='mt-4 mx-3 dummy-page'>
                <div className="na-placeholder">
                    <img src={na_placeholder} />
                    <h2> { this.props.pageName || 'This page' } is not yet available in your country.</h2>
                    <h3>Welcome to the Beta version of HyWebOS 2. During this phase, we will be fine-tuning the platform’s layout based on feedback we receive from you. So, please don't hesitate to reach out: <b>feedback@hywebos.com</b></h3>
                </div>
            </div>
        );
    }
}