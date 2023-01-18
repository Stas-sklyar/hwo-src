import { platformReducer } from 'platform/reducers/platformReducer';
import { A1002Reducer } from 'A1002/reducers/A1002Reducer';

import { combineReducers, applyMiddleware } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { composeWithDevTools } from 'redux-devtools-extension'

const allReducers = Object.assign({},
    platformReducer,
    A1002Reducer
);

export const rootReducer = combineReducers(allReducers);

export const store = configureStore({
    reducer: rootReducer,
    enhancers: [composeWithDevTools(applyMiddleware(),)]
})

export type RootState = ReturnType<typeof rootReducer>