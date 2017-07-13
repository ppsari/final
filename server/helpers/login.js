require('dotenv').config();
let jwt = require('jsonwebtoken');
let CryptoJS = require('crypto-js');

const getUserDetail = (token,callback) => {
  jwt.verify(token, process.env.SECRET_KEY, callback);
}

//udah cek pasti ada makanya ga perlu callback
const getUserId = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
}

const createToken = (user_data) => {
  let token = jwt.sign(user_data, process.env.SECRET_KEY)
  return token;
}

const hashPassword = (password) => {
  let hashPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
  return hashPassword;
}

const checkPassword = (password,hashPassword) => {
  return password === CryptoJS.AES.decrypt(hashPassword, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
}

module.exports = {
  checkPassword,
  getUserDetail,
  getUserId,
  createToken,
  hashPassword,

}