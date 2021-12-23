import { useState } from "react"
import { Modal,Button } from "react-bootstrap"
import Pagination from "react-js-pagination"
import Swal from "sweetalert2"
import auth from "../../services/authService"
import http from "../../services/httpServices"
import CreatePost from "../Forms/CreatePost"
import { postDetails } from "./PostDetails"

export const PostsData = ({getData,posts,getSinglePost,post})=>{
    const [show, setShow] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const handleCloseEditPostModal = ()=> setShowEditModal(false)

    const handleShowEditModal = () => { 
        return setShowEditModal(true)
    }
  
    const handleDelete= async (postID)=>{
        let endPoint = `${http.setURL()}/posts/delete/${postID}`
       const response = await http.post(endPoint,http.setJwtHeaders())
       console.log(postID)
        Swal.fire({
            title: 'Are you sure you want to delete!',
            text: "This action can not be reversed",
            icon: 'warning',
            confirmButtonText: 'OK'
          },
          console.log('deleted')
          )
        getData()
    }
  const handleCloseAllOPenedModal=()=>{
      handleClose()
      handleCloseEditPostModal()
  }
  const {data,current_page, total,per_page} = posts.data.response
 
  /*** */
  const getUserDetails =(postUserID)=>{
    const userDetails = JSON.parse(auth.getUser())
    if(userDetails && postUserID == userDetails.id){
      return(
          <>
        <Button variant="warning" onClick={()=>{
            handleShowEditModal()
        }}>Edit</Button>
        <Button variant="danger" onClick={()=>{
            handleDelete(post)
        }}>Delete</Button>
        </>
      )
    }
  }
/*** */
  if(data && data.length > 0){
        return(
        <> 
        { data.map(post=>(
            <div className="row justify-content-center mb-3" key={post.id}>
                <div className="col col-md-6">
                <div className="card p-4">
                    <div className="card-body">
                        <ul className="list-group border-0">
                            <li className="list-group-item d-flex">
                                <p className="mr-4">
                                    {post.title}
                                </p> 
                                <Button 
                                className="btn btn-primary" 
                                onClick={()=>{
                                    getSinglePost(post.id)
                                    handleShow()
                                }
                                }
                                >
                                View
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
            )
        )
    }
    <Pagination
    activePage={current_page}
    itemsCountPerPage= {per_page}
    totalItemsCount={total}
    pageRangeDisplayed={5}
    onChange={(pageNumber)=>getData(pageNumber)}
    />
    {/* Details Modal */}
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Body>
            {post !==null && postDetails(post)}
        </Modal.Body>
        <Modal.Footer>
            {post && getUserDetails(post.data.response.user_id)}
          <Button variant="secondary" onClick={handleClose}>Ok</Button>
        </Modal.Footer>
      </Modal>
    {/* Edit Modal here */}
    <Modal show={showEditModal}  size='lg'>
        <Modal.Body>
            <CreatePost
            editPostData ={post?post:""}
            getData = {getData}
            // handleModalClose={handleCloseEditPostModal}
            closeAllOpenedModal = {handleCloseAllOPenedModal}
            />
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-primary" onClick={handleCloseEditPostModal}>Ok</Button>
        </Modal.Footer>
      </Modal>
    </>
    )
    }else{
        return(
            <p>No data was found</p>
        )
    }
}
