import {ref} from '../config/constants'

export const request = (_sellerId,type="add") => {
  // console.log(_sellerId)
  ref.child(`request/${_sellerId}`)
  .transaction(tot => {
    // console.log(tot);
    return (type !== "add") ? 0 : ((tot || 0 )+1);
  })
}

export const listenRequest = (_sellerId, callback) => {
  ref.child(`request/${_sellerId}`)
  .on('value', callback);
}