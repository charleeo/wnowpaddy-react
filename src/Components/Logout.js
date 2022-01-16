import {useEffect} from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import auth from "../services/authService";

const Logout=()=> {
  const history = useHistory();
  useEffect(()=>{
     auth.logout()
     Swal.fire({
        title: 'Success!',
        text: "Logged out",
        icon: 'success',
        showConfirmButton:false,
        timer:2000
    }) 
    setTimeout(function(){
        history.push('/')
    },2000)  
  }) 
  return(null)
}

export default Logout;
