import { useEffect, useState } from "react"
import { PostsData } from "./Data/Posts"
import http from "../services/httpServices"
import { Modal,Button } from "react-bootstrap"
import auth from '../services/authService'
import useDocumentTitle from "../CustomHooks/useDocumentTitle"

const Posts = ()=>{
  useDocumentTitle("Your one stop joint for juicy information")
   const user = auth.getCurrentUser();
    let [posts,setPosts] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [show, setShow] = useState(false)
     
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
      
    
    const perPage = 5
    const getData =  async (pageNumber=1)=>{
        let endPoint = `${http.setURL()}/posts/all?page=${pageNumber}&per_page=${perPage}`
        setPosts(await http.post(endPoint))
        setIsLoading(false)
     }
     
    useEffect(()=>{
        setIsLoading(true)
         getData()
        },[])
    
    return (
        <>
        {user &&
        <Button variant="button" onClick={handleShow}
         id  ="create_post_button"
        >
          Create Post
        </Button>
        }
        <section className={isLoading?'loader-wrapper':"categories"}>
            <span className={isLoading?"loader":""}></span>
        {
            posts!==null  && 
            <PostsData 
             getData = {getData}
             posts = {posts}
             showCreate={show}
             closeModal={handleClose}
            />
        }
        </section>
    </>
    )
}

export default Posts