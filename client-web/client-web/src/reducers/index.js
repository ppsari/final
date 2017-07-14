import { combineReducers } from 'redux';

import userReducer from './userReducer'
import firebaseUserReducer from './firebaseUserReducer'
import PropertiesRentReducer from './PropertiesRentReducer'
import PropertiesSellReducer from './PropertiesSellReducer'

export default combineReducers({
  user: userReducer,
  propertiesRent: PropertiesRentReducer,
  propertiesSell: PropertiesSellReducer,
  firebaseUserReducer: firebaseUserReducer,
})
