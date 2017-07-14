import { combineReducers } from 'redux';

import userReducer from './userReducer'
import PropertiesRentReducer from './PropertiesRentReducer'
import PropertiesSellReducer from './PropertiesSellReducer'

export default combineReducers({
  user: userReducer,
  propertiesRent: PropertiesRentReducer,
  propertiesSell: PropertiesSellReducer,
})
