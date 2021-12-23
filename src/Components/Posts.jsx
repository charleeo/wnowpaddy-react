import { useEffect, useState } from "react"
import { PostsData } from "./Data/Posts"
import http from "../services/httpServices"
import CreatePost from "./Forms/CreatePost"
import { Modal,Button } from "react-bootstrap"
import auth from "../services/authService"

const Posts = ()=>{
    let [posts,setPosts] = useState(null)
    let [post,setPost] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const handleCloseEditPostModal = ()=> setShowEditModal(false)

    const perPage =5;
    // Fetch array of data
    const getData =  async (pageNumber=1)=>{
        let endPoint = `${http.setURL()}/posts/all?page=${pageNumber}&per_page=${perPage}`
        setPosts(await http.post(endPoint))
        setIsLoading(false)
     }
//  Get single data
   const getSinglePost= async (id)=>{
        let endPoint = `${http.setURL()}/posts/${id}`
        setPost(await http.get(endPoint))
        setIsLoading(false)
    }

    //useEffect hook for those data that will be fected when screen loads
    useEffect(()=>{
        setIsLoading(true)
         getData()
        },[])
const handleCloseAllOPenedModal=()=>{
      handleClose()
      handleCloseEditPostModal()
  }
    return (
        <>
        <Button variant="primary" onClick={handleShow}>
          Create Post
        </Button>
        <section className={isLoading?'loader-wrapper':"categories"}>
            <span className={isLoading?"loader":""}></span>
        {
            posts!==null  && 
            <PostsData 
            getData = {getData}
            posts = {posts}
            getSinglePost = {getSinglePost}
            post={post}
            />
        }
        </section>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>Create Post</Modal.Title>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Header>
        <Modal.Body>
            <CreatePost 
            // handleModalClose={handleClose}
            closeAllOpenedModal ={handleCloseAllOPenedModal}
            getData = {getData}
            />
        </Modal.Body>
      </Modal>
    </>
    )
}

export default Posts