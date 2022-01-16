import { useEffect, useState, useRef } from "react"
import { Modal, Button } from "react-bootstrap"
import Pagination from "react-js-pagination"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import auth from "../../services/authService"
import http from "../../services/httpServices"
import CreatePost from "../Forms/CreatePost"

export const PostsData = ({getData,posts,showCreate,closeModal})=>{
  const {data,current_page, total,per_page} = posts.data.response
  const [showEditModal, setShowEditModal] = useState(false)
  let [post,setPost] = useState('')
  
  const handleCloseEditPostModal = ()=> {
      setShowEditModal(false)
    //   setPost('')//since create and edit uses one modal
  }
  
  const handleShowEditModal = () => { 
      return setShowEditModal(true)
  }

  const deletePost= async (postID)=>{
      let endPoint = `${http.setURL()}/posts/${postID}`
      return  await http.post(endPoint,{},http.setJwtHeaders())
  }

  const handleDelete= (postID)=>{
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
             let response = await deletePost(postID)
            Swal.fire({
                  icon: 'success',
                  title: response.data.message,
                  showConfirmButton: false,
                  timer: 1500
              })
              getData()
          } 
      })
  }

  const getSinglePost= async (id)=>{
    let endPoint = `${http.setURL()}/posts/${id}`
    let data = await http.get(endPoint)
    if(data){
        setPost(data)
    }
   }
   
  const checkIfUserCanModifyPost =(post)=>{
    const userDetails = JSON.parse(auth.getUser())
    if(auth.getCurrentUser() && post.user_id === userDetails.id){
      return(
        <>
            <button className="btn btn-warning mr-4" onClick={ async()=>{
                await getSinglePost(post.id)
                handleShowEditModal()
            }}>Edit</button>
            <button className="btn btn-danger" onClick={()=>{
                handleDelete(post.id)
            }}>Delete</button>
        </>
      )
    }
  }

  const splitPostBody=(body)=>{
    let postBody = body.slice(0,200)
    if(body.length > postBody.length) return `${postBody}...` 
    else return postBody
  }
/*** */
  if(data && data.length > 0){
        return(
        <> 
        { data.map(post=>(
            <div className="row justify-content-center mb-3" key={post.id}>
                <div className="col-md-6">
                <div className="card p-4 border-0">
                    <div className="card-body shadow-lg">
                        <h5>
                            {post.title}
                        </h5>
                        <img src={ post.file_small_size_url} alt={post.title} className ="img img-thumbnail d-block "/>
                        <hr />
                        <p>{splitPostBody(post.body)}</p>
                        <Link  
                        className="btn btn-primary" 
                            to = {`/${post.id}/post`}
                        >
                        Details
                        </Link>
                        {checkIfUserCanModifyPost(post)}
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
    linkClass ="my-page-link"
    />
{/* Edit post */}
    <Modal show={post?showEditModal:showCreate} onHide={post?handleCloseEditPostModal:closeModal}  size='lg'>
        <Modal.Body>
            <CreatePost
                editPostData ={post}
                getData ={getData}
                closeAllOpenedModal ={post?handleCloseEditPostModal:closeModal} 
            />
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-primary" onClick={post?handleCloseEditPostModal:closeModal}>Ok</Button>
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
