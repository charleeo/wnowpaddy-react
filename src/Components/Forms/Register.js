import  React,{useState} from 'react';
import Input from './Input';
import httpServices from '../../services/httpServices'
import { Link, Redirect } from 'react-router-dom';
import auth from '../../services/authService';
import Swal from 'sweetalert2';

const Register = (props)=>{
  const data = {
    email:"",password:"",name:"", password_confirmation:""
  }
  const [values,setValues]= useState(data||{});
  const handleChange=(e)=>{
    setValues({
      ...values,[e.target.name]:e.target.value
    })
  }
  const [isLoading,setIsLoading] = useState(false);
  
  const {email,password,name,password_confirmation} = values;
  const  handleSubmit= async(e)=>{
    e.preventDefault()
    const dataToSubmit = {email,password,name,password_confirmation};
    const url = `${httpServices.setURL()}/users/create`;
   try {
     
    setIsLoading(true);
    const responses = await httpServices.post(url, dataToSubmit);
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
        setValues({email:'',password:'',name:'',password_confirmation:''})
        setIsLoading(false)
        Swal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonText: 'success'
          })
        setTimeout(function(){
          props.history.push('/login')
        },500)
    }
   } catch (ex) {
    if(ex.response !== undefined ){
        Swal.fire({
            title: 'Error!',
            text: ex.message,
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        // setError(ex.response.data.error)
    }
    else {
        Swal.fire({
            title: 'Error!',
            text:"There was an error from the back",
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
    setIsLoading(false)
    }
  }
  if(auth.getCurrentUser()) return <Redirect to= '/'/>
  return(
    <div className={isLoading?"loader-wrapper":"row justify-content-center register"}>
     {isLoading?<div className={"loader"}></div>:
      <div className="col-md-6 col-sm-12  shadow bg-white py-2">
        <div className="card  ">
          <div className="card-header">
            <h4 className='text-center'>Register To Get Started</h4> 
          </div>
          <div className="card-body p-4">
          </div>
          <form onSubmit={handleSubmit} className='shadow-lg p-3'>
            <Input
              name ='email'
              type="email"
              label="Email Address"
              handleChange={handleChange}
              value={values.email}
            />
            <Input
              name ='name'
              label="User Name"
              handleChange={handleChange}
              value={values.name}
              placeholder='enter your user name here'
            />
            <Input
              name ='password'
              label="Password"
              type="password"
              handleChange={handleChange}
              value={values.password}
              placeholder='enter your password'
            />
            <Input
              name ='password_confirmation'
              label="Password Confirmation"
              type="password"
              handleChange={handleChange}
              value={values.password_confirmation}
              placeholder='Confirm Passord'
            />
            <div className="d-flex justify-content-center">
              <button className="btn btn-bg" 
                disabled={isLoading || !email || !name || !password?true:false}>Register</button>  
            </div>
          </form>
            <hr/>
            <div className="">
              <p className='text-center'>Have An Account? &nbsp;<Link to='/login'>Login</Link> </p>
            </div>
        </div>
      </div>
    }
    </div>
  )
}
export default Register
