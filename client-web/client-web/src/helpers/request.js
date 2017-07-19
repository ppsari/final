import {ref} from '../config/constants'

export const request = (props,type="add") => {
  ref.child(`request/${props.sellerId}`)
  .transaction(data => {
    data = JSON.parse(data);

    if (data === null) data = {}
    if (type === 'add') {
      if (typeof data.tot === 'undefined') data.tot = 1;
      else data.tot = (data.tot || 0) + 1;
      if (typeof data.props === 'undefined') data.props = [props];
      else data.props.push(props);

    }
    else {
      data.props = [];
      data.tot = 0;
    }
    // return data;
    return JSON.stringify(data)
  })
}

export const listenRequest = (_sellerId, callback) => {
  ref.child(`request/${_sellerId}`)
  .on('value', callback);
}