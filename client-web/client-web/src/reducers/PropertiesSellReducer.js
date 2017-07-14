const initialState = [
  {
    "_id": "5966cd6835400c6092943edf",
    "descr": "senin harga naik ed",
    "image": "http://modeltheme.com/mt_urbanpoint/wp-content/uploads/2017/05/apartment_03-800x500.jpg",
    "_ownerId": "5966bacbbc397545e2290f93",
    "_categoryId": "5966c422b3a95452ff5018bc",
    "name": "rumah jeruk purut",
    "city": "Jakarta barat",
    "price": {
      "descr": "sell",
      "amount": 30000000
    },
    "__v": 0,
    "_accessId": [
      "5966c448b3a95452ff5018be"
    ],
    "isActive": true,
    "status": "sell"
  },
  {
    "_id": "5966cd9835400c6092943ee0",
    "descr": "apartemen mewah dijual ga sama isi",
    "image": "http://modeltheme.com/mt_urbanpoint/wp-content/uploads/2017/05/penthouse_03-800x500.jpg",
    "_ownerId": "5966bb1ac4dd55460f57048d",
    "_categoryId": "5966c422b3a95452ff5018bc",
    "name": "apartemen mewah",
    "city": "Jakarta selatan",
    "price": {
      "descr": "sell",
      "amount": 20000000
    },
    "__v": 0,
    "_accessId": [
      "5966c443b3a95452ff5018bd",
      "5966c448b3a95452ff5018be"
    ],
    "isActive": true,
    "status": "sell"
  }
]

export default (state = initialState, action) => {
  if(action.type === 'GET_DATA_SELL') {
    return [action.payload];
  }
  return state
}
