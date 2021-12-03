import JWTDecode  from 'jwt-decode';

const tokenKey = 'token'
function logout() {
localStorage.removeItem(tokenKey);
}
function getCurrentUser(){
    try {
        const jwt = getJWT()
        const decodedToken = JWTDecode(jwt)
        const date = new Date();
        const now = date.getTime()
        const timeStamp=(Math.ceil(now/1000));
        if(timeStamp > decodedToken.exp)return null;
        else  return decodedToken
    }catch(error) {
    return null
    }
 }
 const setJWT= (token)=>{
  localStorage.setItem(tokenKey,token);
 }
 const getJWT=()=>{
   return localStorage.getItem(tokenKey)
 }
 const auth = {getCurrentUser,logout,setJWT,getJWT}
 export default auth

 
