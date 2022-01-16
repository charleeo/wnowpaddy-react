import axios from "axios";
// import { toast } from "react-toastify";
import auth from './authService';

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) console.log("Logging the error", error);
  // toast.error("There was an unexpected error herer");
  return Promise.reject(error);
});

// calling protcted api
function setJwtHeaders() {
  let token =  auth.getJWT();

  return {
    headers: {
      'Content-type':'application/json',
       Authorization: `Bearer ${token}` }
    };
}
function setURL(){
  return 'http://127.0.0.1:8000/api'
  //   return 'https://d-save.herokuapp.com'
}
function setImagesURL(){
  return 'http://127.0.0.1:8000/'
}
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
      'content-type':'application/octet-stream',
      Authorization: auth.getCurrentUser()
  },
});
const http= {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwtHeaders,
  setURL,
  instance,
  setImagesURL
};
export default http;
