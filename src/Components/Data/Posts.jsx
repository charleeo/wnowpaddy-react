import { Toolbar, Typography } from "@material-ui/core"
import { useEffect, useState, useRef } from "react"
import { Modal, Button } from "react-bootstrap"
import Pagination from "react-js-pagination"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import auth from "../../services/authService"
import http from "../../services/httpServices"
import CreatePost from "../Forms/CreatePost"
import { Share,Bookmark,Delete,Edit, MoreHoriz,LinkedIn,Facebook,Twitter,YouTube,Instagram } from "@material-ui/icons"
import ShareComponent from "./ShareComponent"
import httpService from './../../services/httpServices'
import HelmetMetaData from "./HelmetMetaData"


export const PostsData = ({getData,posts,showCreate,closeModal})=>{
  const {data,current_page, total,per_page} = posts.data.response
  const [showEditModal, setShowEditModal] = useState(false)
  let [post,setPost] = useState('')
  const moreOption = useRef(null)
  const handleCloseEditPostModal = ()=> {
      setShowEditModal(false)
    //   setPost('')//since create and edit uses one modal
  }

  const closeAllShowMoreOptionsThatOpened=()=>{
      let elements = document.querySelectorAll('.more_item');
      elements.forEach(el=>{
          if(el.classList.contains('more_item')){
            //   alert(el)
            el.classList.remove('more_item')
            el.classList.add('show-more-div')
          }
      })
  }

  const closeAllShareMoreOptionsThatOpened=()=>{
      let elements = document.querySelectorAll('.share_items');
      elements.forEach(el=>{
          if(el.classList.contains('share_items')){
            el.classList.remove('share_items')
            el.classList.add('share_item_div')
          }
      })
  }
  const handleShowMoreOption=(post_Id)=>{
        closeAllShareMoreOptionsThatOpened()
        moreOption.current = post_Id
        const domElement = document.getElementById("show_more_"+post_Id)
      
          if(domElement.classList.contains('show-more-div') && !domElement.classList.contains("more_item")){
              domElement.classList.remove('show-more-div')
              domElement.classList.add('more_item')
            }else if(domElement.classList.contains('more_item') && !domElement.classList.contains('show-more-div')){
              domElement.classList.add('show-more-div')
              domElement.classList.remove('more_item')
          }
  }
  const handleShareOption=(post_Id)=>{
      closeAllShowMoreOptionsThatOpened()
      moreOption.current = post_Id
      const domElement = document.getElementById("share_item_"+post_Id)
          if(domElement.classList.contains('share_item_div') && !domElement.classList.contains("share_items")){
              domElement.classList.remove('share_item_div')
              domElement.classList.add('share_items')
            }else if(domElement.classList.contains('share_items') && !domElement.classList.contains('share_item_div')){
              domElement.classList.add('share_item_div')
              domElement.classList.remove('share_items')
          }
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
      return(
        <div className="show-more-div card-footer border-0" id={`show_more_${post.id}`}
        >
        {/* {auth.getCurrentUser() && post.user_id === userDetails.id  &&  */}
         <>
            <button className="btn btn-primary btn-sm mx-2" onClick={ async()=>{
                await getSinglePost(post.id)
                handleShowEditModal()
            }} title="edit"><Edit/></button>
            <button className="btn btn-danger btn-sm  mx-3" onClick={()=>{
                handleDelete(post.id)
            }} title="delete"><Delete/></button>
            <button className="btn btn-info btn-sm" title="book mark">
                <Bookmark/>
            </button>
         </>
        {/* } */}
        </div>
      )
  }

  const splitPostBody=(post)=>{                                          
    let body = post.body
    let postBody = body.slice(0,150)
    if(body.length > postBody.length) return <>
     {postBody} <Link  
            className="btn btn-default" 
            to = {`/${post.id}/post`}  title="more">
            <MoreHoriz />
      </Link>
    </>
    else return postBody
  }
/*** */
  if(data && data.length > 0){
        return(
            <> 
        <div className="row justify-content-center px-4 mt-3">
            { data.map(post=>(
                        <div className="col-md-6 col-sm-6 shadow-lg mb-2 p-3" key={post.id}>
                            {/* <hr /> */}
                            <div className="card   border-0 shadow py-3">
                                <div className="card-body">
                                    <div className="row  justify-content-center">
                                        <div className="col-md-5 col-sm-12">
                                            <img src={ post.file_small_size_url} alt={post.title} className ="img img-thumbnail post-images"/>
                                        </div>
                                        <div className="col-md-7 col-sm-12">
                                            <div className="card border-0 shadow-lg py-5 inner-card">
                                                <div className="card-body">
                                                    <h5 className="text-center">
                                                        {post.title}
                                                    </h5>
                                                    <hr />
                                                    <p>
                                                    {splitPostBody(post)}
                                                    </p>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Footer */}
                                <div className="card-footer social-icons border-0">
                                    <button 
                                      className="btn btn-primary btn-sm m-2"
                                      onClick={()=>handleShareOption(post.id)}
                                      title="share"
                                    >
                                    Share
                                    <Share/>
                                    </button>

                                    <button 
                                    className="btn btn-primary btn-sm m-2"
                                    onClick ={()=>handleShowMoreOption(post.id)}
                                    title="more"
                                    >
                                          More
                                          <MoreHoriz />
                                      </button>
                                </div>
                                {checkIfUserCanModifyPost(post)}
                                <div id={`share_item_${post.id}`} className='share_item_div'>
                                    {/* <button className="btn btn-info btn-sm">
                                        <LinkedIn/>
                                    </button>
                                    <button className="btn btn-info btn-sm">
                                        <Twitter/>
                                    </button>
                                    <button className="btn btn-info btn-sm">
                                        <Facebook/>
                                    </button>
                                    <button className="btn btn-info btn-sm">
                                        <YouTube/>
                                    </button>
                                    <button className="btn btn-info btn-sm">
                                        <Instagram/>
                                    </button> */}
                                   
                                    <ShareComponent
                                        title={post.body}
                                        url ={`http://127.0.0.1:3000/${post.id}/post`}
                                        quote ={post.body}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                )
            }
    </div>
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

