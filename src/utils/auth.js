import Cookies from 'js-cookie'

const TokenKey = 'token'
const TokenType = 'token_type'
const TokenId = 'token_id'
const TokenAccountName='token_accountName'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTokenType() {
  return Cookies.get(TokenType)
}
export function setTokenType(token) {
  return Cookies.set(TokenType, token)
}
export function removeTokenType() {
  return Cookies.remove(TokenType)
}
//Cookies存储用户id
export function getTokenId() {
  console.log('token_id')
  return Cookies.get(TokenId)
}
export function setTokenId(token) {
  return Cookies.set(TokenId, token)
}
export function removeTokenId(){
  return Cookies.remove(TokenId)
}

//Cookies存储用户名称
export function setAccountName(token){
  return Cookies.set(TokenAccountName,token)
}
export function getAccountName(){
  return Cookies.get(TokenAccountName)
}
export function removeAccountName(){
  return Cookies.remove(TokenAccountName)
}