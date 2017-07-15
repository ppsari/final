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
  if(action.type === 'GET_PROPERTY_RENT') {
    return action.payload
  }
  return state
}
