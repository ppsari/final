const initialState = {
    "_id": "5966cd6835400c6092943edf",
    "descr": "senin harga naik ed",
    "image": "rumahPDI.jpg",
    "_ownerId": "5966bacbbc397545e2290f93",
    "_categoryId": "5966c422b3a95452ff5018bc",
    "name": "rumah jeruk purut",
    "city": "Jakarta barat",
    "price": 1.0e+22,
    "__v": 0,
    "_accessId": [
      "5966c448b3a95452ff5018be"
    ],
    "isActive": true,
    "status": "sell"
  }

export default (state = initialState, action) => {
  if(action.type === 'GET_PROPERTY_SELL') {
    return action.payload;
  }
  return state
}
