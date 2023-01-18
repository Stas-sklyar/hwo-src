import React, { useContext } from 'react';
import 'A1002/assets/settings/css/SettingsPage.css';
import Heading, { CreateHeadingConfig } from 'UIElements/views/Heading/Heading';
import { deleteCookie } from 'platform/helpers/CookieHelpers';
import { AuthContext } from 'UIElements/views/auth/AuthContext';

function SettingsPage() {
    const authContext = useContext(AuthContext);

    const logoutClick = async () => {
        deleteCookie("auth");
        authContext?.setIsAuthenticated(false);
    };

    return (
        <div className='scroll-wrapper'>
            <div className='account-view-inner'>
                <div className='content-block'>
                    <div className='text-center my-4'>
                        <div className="title2">Paramètres avancés</div>
                        <p className='subTitle2'>Configurez les paramètres de votre compte selon vos envies.</p>
                    </div>
                    <div className="separator30"></div>
                    <Heading config={CreateHeadingConfig(2, 'Emplacement de mes données')}></Heading>
                    <Heading config={CreateHeadingConfig(4, 'Pays/région de l\'emplacement urbain précis')}></Heading>
                    <h5 className="colorAdvanced">- Zone géographique mondiale 1 : Europe, France (DC5)</h5>
                    <div className="separator20"></div>
                    <Heading config={CreateHeadingConfig(2, 'Gestion du compte')}></Heading>
                    <Heading config={CreateHeadingConfig(4, 'Supprimer le compte')}></Heading>
                    <h5 className="descriptionDeleteAccountAdvanced colorAdvanced">Ceci supprimera définitivement votre compte et toutes ses données. Vous ne pourrez pas réactiver ce compte.</h5>
                    <button type="button" className="btn btn-outline btn-danger btn-sm mb-2" data-target-view="delete-account" has-listeners="true" onClick={logoutClick}>Supprimer mon compte</button>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;