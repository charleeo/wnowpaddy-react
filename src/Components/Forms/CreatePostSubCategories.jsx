import {useEffect, useState} from 'react';
import httpServices from '../../services/httpServices';
import auth from '../../services/authService';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

export default function CreatePostSubCategories(){

  const [inputText, setInputText] = useState({
    name: ""
  })
   const [isLoading,setIsLoading] = useState(false);
   let [categories,setCategories] = useState(null)
  
   const onChange = e => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    })
  }
  
  const {name,category_id}=inputText
  const  history = useHistory();
  const handleSubmit = async e => {
    e.preventDefault()
   const subCategoryObject = {name,category_id}
   const url = `${httpServices.setURL()}/category/sub-create`;
   try {
    setIsLoading(true)
    const responses = await httpServices.post(url, subCategoryObject);
    let responseStatus = responses.data.status
    let message = ''
    if(responseStatus === false){
        message = responses.data.response ===null? responses.data.message : responses.data.response[0].message
        setIsLoading(false)
        console.log(responses)
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
        setInputText({name:''})
        history.push('/sub/categories')
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

let endPoint = `${httpServices.setURL()}/category/lists`
    useEffect(()=>{
        async function getData (){
            setCategories(await httpServices.post(endPoint))
            }
            getData()
    },[endPoint])

 return  (
    <div className={isLoading?'loader-wrapper':"row justify-content-center p-5 login"}>
     {isLoading?<span className="loader"></span>:
        <div className='col-md-6 col-sm-12'>
          <div className="card border-0 shadow p-3">
            <div className='card-header '>
              <h1 className="text-center">Sub Category</h1>
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
                <div className='form-group'>
                  <label htmlFor='name'>Category</label>
                  <select  
                   placeholder="enter  name here"
                    name="category_id" 
                    onChange={onChange}
                    className="form-control">
                        <option value="">select a category</option>
                        {categories && categories.status !==false && categories.data !==null? categories.data.response.map((cat)=>(
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        )):<option>No categories found</option>}
                    </select>
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