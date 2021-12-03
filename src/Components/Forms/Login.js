import {useState} from 'react';
import httpServices from '../../services/httpServices';
import { Link, Redirect } from 'react-router-dom';
import auth from '../../services/authService';
import Swal from 'sweetalert2';

export default function Login(props){

  const [inputText, setInputText] = useState({
    email: "",
    password: ""
  })
   const [isLoading,setIsLoading] = useState(false);
  
   const onChange = e => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    })
  }

  const {email,password}=inputText
  const handleSubmit = async e => {
    e.preventDefault()
    const {state}= props.location;

   const loginObject = {email,password}
   const url = `${httpServices.setURL()}/users/login`;
   try {
    setIsLoading(true)
    const responses = await httpServices.post(url, loginObject);
    let responseStatus = responses.data.status
    let message = ''
    if(responseStatus === false){
        message = responses.data.response ===null? responses.data.message : responses.data.response[0].message
        setIsLoading(false)
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error'
        })
    }else if(responseStatus === true){
        message = responses.data.message
        setIsLoading(false)
        auth.setJWT(responses.data.response.access_token)
        Swal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonText: 'OK'
          })
        setIsLoading(false)
        setInputText({email:'',password:''})
        // window.location = state ? state.from.pathname : "/";
        props.history.push(state?state.from.pathname:"/")
    }
   } catch (ex) {

    if(ex.response !== undefined || ex.statusCode < 500  ){
        Swal.fire({
            title: 'Error!',
            text: ex.response.data.error,
            icon: 'error'
        })
    }
    else {
        Swal.fire({
            title: 'Error!',
            text: "There was an unexpected error. Please try again",
            icon: 'error'
        })
    }
    setIsLoading(false)
  }
}
if(auth.getCurrentUser()){ return <Redirect to= '/'/>}
 return  (
    <div className={isLoading?'loader-wrapper':"row justify-content-center p-5 login"}>
     {isLoading?<span className="loader"></span>:
        <div className='col-md-6 col-sm-12'>
          <div className="card border-0 shadow p-3">
            <div className='card-header '>
              <h1 className="text-center">Login To Account</h1>
            </div>
            <div className='card-body shadow-lg'>             
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input type='email' 
                   placeholder="enter your account's email"
                    value={email}
                    name="email" 
                    onChange={onChange}
                    className="form-control" />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input type='password'
                  placeholder="enter your password"
                  value={password}
                  name="password"
                  onChange={onChange}
                  className="form-control"/>
                </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-bg " disabled={isLoading||(!password || !email)?true:false}> Login
                </button>  
              </div>
              </form>
            </div>
            <hr/>
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div><small>Don't have an account</small>?  <Link to='/register'>Register</Link> 
                </div>
              </div>
              <div className="col-md-7">
                <div >Forgot Password?  <Link to='/forgot-password'>Recover Password</Link>
                </div>
              </div>
            </div>
            <hr/>
          </div>
        </div>
      }
      </div>
    )
}