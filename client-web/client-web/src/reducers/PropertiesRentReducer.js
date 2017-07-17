const initialState = [
  {
    "_id": "5966c710af03e056224c474e",
    "descr": "rumah bagus diatas bukit banyak bonus setan ed",
    "image": "http://modeltheme.com/mt_urbanpoint/wp-content/uploads/2017/05/duplex_house_01-800x500.jpg",
    "_ownerId": "5966bacbbc397545e2290f93",
    "_categoryId": "5966c422b3a95452ff5018bc",
    "name": "rumah pondok indah",
    "city": "Jakarta ed",
    "__v": 0,
    "_accessId": [
      "5966c443b3a95452ff5018bd",
      "5966c448b3a95452ff5018be"
    ],
    detail: {
      luasBangunan: null,
      luasTanah: null,
      perabotan: null,
      listrik: null,
      lantai: null,
      fasilitas: [],
    },
    "price": {
      "descr": "hour",
      "amount": 10
    },
    "status": "rent"
  },
  {
    "_id": "5966c96e61351559ee979d3f",
    "descr": "rumah jeruk purut",
    "image": "http://modeltheme.com/mt_urbanpoint/wp-content/uploads/2017/05/villa_02-800x500.jpg",
    "name": "rumah jeruk purut",
    "city": "Jakarta barat",
    "__v": 1,
    "_categoryId": "5966c422b3a95452ff5018bc",
    "_ownerId": "5966bacbbc397545e2290f93",
    "_accessId": [
      "5966c443b3a95452ff5018bd"
    ],
    "price": {
      "descr": "day",
      "amount": 119922
    },
    "status": "rent"
  }
]

export default (state = initialState, action) => {
  if(action.type === 'GET_DATA_RENT') {
    return action.payload;
  }
  return state
}
