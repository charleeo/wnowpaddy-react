import {useState} from 'react';
import httpServices from '../../services/httpServices';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

export default function PostCategories(props){

  const [inputText, setInputText] = useState({
    name: ""
  })
   const [isLoading,setIsLoading] = useState(false);
  
   const onChange = e => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    })
  }

  const {name}=inputText
  const  history = useHistory();
  const handleSubmit = async e => {
    e.preventDefault()
   const loginObject = {name}
   const url = `${httpServices.setURL()}/category/create`;
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
        Swal.fire({
            text: message,
             title:"",
            icon: 'success',
            confirmButtonText: 'OK',
            width:100+"%"
          })
        setIsLoading(false)
        setInputText({name:''})
        history.push('/categories')
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
 return  (
    <div className={isLoading?'loader-wrapper':"row justify-content-center p-5 login"}>
     {isLoading?<span className="loader"></span>:
        <div className='col-md-6 col-sm-12'>
          <div className="card border-0 shadow p-3">
            <div className='card-header '>
              <h1 className="text-center">POST CATEGORIES</h1>
            </div>
            <div className='card-body shadow-lg'>             
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='name'>name</label>
                  <input type='text' 
                   placeholder="enter  name here"
                    value={name}
                    name="name" 
                    onChange={onChange}
                    className="form-control" />
                </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-bg " disabled={isLoading||(!name)?true:false}> Create
                </button>  
              </div>
              </form>
            </div>
            <hr/>
          </div>
        </div>
      }
      </div>
    )
}