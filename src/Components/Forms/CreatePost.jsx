import {useEffect, useState} from 'react';
import httpServices from '../../services/httpServices';
import Swal from 'sweetalert2';
import useDocumentTitle from '../../CustomHooks/useDocumentTitle';
import { CreatePostHTML } from './html/createPost';

export default function CreatePost({getData,editPostData,closeAllOpenedModal}){
  // console.log(editPostData)
  const [isLoading,setIsLoading] = useState(false);
  const [file, setFile] = useState('')
  let [subCategories, setSubCategories] = useState(null)
  
  let {title:editTitle,body:editBody,sub_category_id:editSubcategoryID,id}= editPostData?editPostData.data.response:""
 
  let text = editPostData?"Edit": "Create"
  
  let submitText = editPostData?"Update post":"Create post"
  
  let endPoint = `${httpServices.setURL()}/category/sub-lists/`
  
  let documentTitleText = editPostData?`Update ${editTitle} post`:"Create post"

   useDocumentTitle(documentTitleText)
  const [inputText, setInputText] = useState({
    title: editPostData?editTitle:"", 
    body:editPostData?editBody:"",
    sub_category_id:editPostData?editSubcategoryID :"",
    post_id:editPostData?id:""
  })
  
   const onChange = e => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    })
  }
  
  const handleFileUpload =(e)=>{
    setFile(e.target.files[0])
  }
  
  
  const {title,body,sub_category_id,post_id}= inputText//destructure the object data
  
  const handleSubmit = async e => {
    const formData = new FormData()
    formData.append('file',file)
    formData.append('sub_category_id',sub_category_id)
    formData.append('title',title)
    formData.append('body',body)
    formData.append('post_id',post_id)
    e.preventDefault()
  //  const postObject = {sub_category_id,body,title,post_id,file}
   
   let url = `${httpServices.setURL()}/posts/`;
   if(editPostData){
    url = `${httpServices.setURL()}/posts/update`;
   }
   try {
    setIsLoading(true)
    const responses = await httpServices.post(url, formData,httpServices.setJwtHeaders());
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
          icon: 'success',
          title: message,
          showConfirmButton: false,
          timer: 1500
          })
        getData()//this is to refresh the data when a new record is saved
        closeAllOpenedModal()
    }
   } catch (ex) {
   console.log(ex)
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
useEffect(()=>{
    async function getData (){
        setSubCategories(await httpServices.post(endPoint))
        }
        getData()
},[endPoint])



 return  (
    <CreatePostHTML
     isLoading={isLoading}
     handleSubmit ={handleSubmit}
     title ={title}
     text = {text}
     onChange = {onChange}
     body = {body}
     sub_category_id = {sub_category_id}
     editPostData = {editPostData?editPostData:""}
     id ={id}
     submitText={submitText}
     subCategories ={subCategories}
     handleFileUpload={handleFileUpload}
    />
    )
}
