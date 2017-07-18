import { combineReducers } from 'redux';

import userReducer from './userReducer'
import firebaseUserReducer from './firebaseUserReducer'
import PropertiesRentReducer from './PropertiesRentReducer'
import PropertiesSellReducer from './PropertiesSellReducer'
import SearchPropertiesRentReducer from './SearchPropertiesRentReducer'
import SearchPropertiesSellReducer from './SearchPropertiesSellReducer'
import PropertyRent from './singlePropertyRentReducer'
import PropertySell from './singlePropertySellReducer'
import Message from './messageReducers.js'

export default combineReducers({
  user: userReducer,
  message: Message,
  propertiesRent: PropertiesRentReducer,
  searchPropertiesRent: SearchPropertiesRentReducer,
  searchPropertiesSell: SearchPropertiesSellReducer,
  propertiesSell: PropertiesSellReducer,
  firebaseUserReducer: firebaseUserReducer,
  propertyRent: PropertyRent,
  propertySell: PropertySell
})
