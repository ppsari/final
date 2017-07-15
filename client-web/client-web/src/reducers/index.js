import { combineReducers } from 'redux';

import userReducer from './userReducer'
import firebaseUserReducer from './firebaseUserReducer'
import PropertiesRentReducer from './PropertiesRentReducer'
import PropertiesSellReducer from './PropertiesSellReducer'
import PropertyRent from './singlePropertyRentReducer'
import PropertySell from './singlePropertySellReducer'

export default combineReducers({
  user: userReducer,
  propertiesRent: PropertiesRentReducer,
  propertiesSell: PropertiesSellReducer,
  firebaseUserReducer: firebaseUserReducer,
  propertyRent: PropertyRent,
  propertySell: PropertySell
})
