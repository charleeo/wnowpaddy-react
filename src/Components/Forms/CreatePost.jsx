import {useEffect, useState} from 'react';
import httpServices from '../../services/httpServices';
import Swal from 'sweetalert2';
// import { useHistory } from 'react-router-dom';
import useDocumentTitle from '../../CustomHooks/useDocumentTitle';
import { CreatePostHTML } from './html/createPost';

export default function CreatePost({getData,editPostData,closeAllOpenedModal}){
  
  const [isLoading,setIsLoading] = useState(false);
  
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

  const {title,body,sub_category_id,post_id}= inputText//destructure the object data

  const handleSubmit = async e => {
    e.preventDefault()
   const postObject = {sub_category_id,body,title,post_id}
   let url = `${httpServices.setURL()}/posts/`;
   if(editPostData){
    url = `${httpServices.setURL()}/posts/update`;
   }
   try {
    setIsLoading(true)
    const responses = await httpServices.post(url, postObject,httpServices.setJwtHeaders());
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
        Swal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonText: 'OK'
          })
        getData()//this is to refresh the data when a new record is saved
        // handleModalClose()
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
      console.log(ex)
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
     editPostData = {editPostData}
     id ={id}
     submitText={submitText}
     subCategories ={subCategories}
    />
    )
}
