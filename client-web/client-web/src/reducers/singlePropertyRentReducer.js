const initialState = {
    "_id": "5966c710af03e056224c474e",
    "descr": "rumah bagus diatas bukit banyak bonus setan ed",
    "image": "rumahPDI.jpg",
    "_ownerId": "5966bacbbc397545e2290f93",
    "_categoryId": "5966c422b3a95452ff5018bc",
    "name": "rumah pondok indah ed",
    "city": "Jakarta ed",
    "__v": 0,
    "_accessId": [
      "5966c443b3a95452ff5018bd",
      "5966c448b3a95452ff5018be"
    ],
    "price": {
      "descr": "hour",
      "amount": 10
    },
    "status": "rent"
  }

export default (state = initialState, action) => {
  if(action.type === 'CHANGE_DESCRIPTION') {
    return {...state, descr: action.payload};
  }
  else if(action.type === 'CHANGE_IMAGE') {
    return {...state, image: action.payload};
  }
  else if(action.type === 'CHANGE_CATEGORY') {
    return {...state, _categoryId: action.payload};
  }
  else if(action.type === 'CHANGE_NAME') {
    return {...state, name: action.payload};
  }
  else if(action.type === 'CHANGE_PRICE') {
    return {...state, price: action.payload};
  }
  else if(action.type === 'CHANGE_ACCESS') {
    return {...state, _accessId: action.payload};
  }
  else if(action.type === 'CHANGE_ACTIVE') {
    return {...state, isActive: action.payload};
  }
  else if(action.type === 'CHANGE_CITY') {
    return {...state, city: action.payload};
  }
  else if(action.type === 'CHANGE_STATUS') {
    return {...state, status: action.payload};
  }
  return state
}
