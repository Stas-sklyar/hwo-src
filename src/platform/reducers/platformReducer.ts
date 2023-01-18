import { appsReducer } from 'platform/reducers/appsReducer'
import { configReducer } from 'platform/reducers/configReducer'

export const platformReducer = {
    config: configReducer,  
    applications: appsReducer
}


