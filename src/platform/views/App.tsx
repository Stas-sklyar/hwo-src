import { NavigationContext, NavigationContextProvider } from 'UIElements/views/navigation/NavigationContext';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import { FC, useContext, useEffect } from 'react';
import ApplicationWrapper from 'platform/routes/platformRoutes';

import "vendors/fontawesome/css/all.css";
import "bootstrap/dist/css/bootstrap.css";



import 'platform/assets/platform/css/common.css';
import 'platform/assets/platform/css/index.css';
import 'platform/assets/platform/css/App.css';

import 'UIElements/assets/UIElements/css/UIElements.css'

import { AuthContext, AuthContextProvider } from 'UIElements/views/auth/AuthContext';
import { GeneralDataService } from 'A1002/api/services/GeneralDataService';
import { useDispatch } from 'react-redux';

import { SettingsService } from 'platform/api/services/SettingsService';


import * as A1002ReducerActions from 'A1002/actions/A1002Actions'
import * as platformReducerActions from 'platform/actions/platformAction'
import { batch } from 'react-redux';


const App: FC<{}> = () => {

  const dispatch = useDispatch();

  //const authService = new AuthService();
  const setGeneralStoreData = async () => {
    const dataService = new GeneralDataService();
    const settingsService = new SettingsService();
    let config = await settingsService.GetConfig();
    let countries = await dataService.GetCountries();
    let languages = await dataService.GetLanguages();
    let timeZones = await dataService.GetTimeZones();
    let dateFormats = await dataService.GetDateFormats();
    batch(() => {
      dispatch(platformReducerActions.setConfigToStore(config));
      dispatch(A1002ReducerActions.setAllCountriesToStore(countries));
      dispatch(A1002ReducerActions.setAllLanguagesToStore(languages));
      dispatch(A1002ReducerActions.setAllTimeZonesToStore(timeZones));
      dispatch(A1002ReducerActions.setAllDateFormatsToStore(dateFormats));
    });
  }

  useEffect(() => {
    setGeneralStoreData()
  }, [])

  return (
    <div className="App">
      <NavigationContextProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <ApplicationWrapper />
          </BrowserRouter>
        </AuthContextProvider>
      </NavigationContextProvider>
    </div>
  );
}

export default App;
