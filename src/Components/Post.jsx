import { useEffect, useState } from "react"
import { useParams } from "react-router"
import http from "../services/httpServices"
import { PostDetails } from "./Data/PostDetails"

export const Post = ()=>{
    const {id} = useParams()
    let [post,setPost] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
   const getSinglePost= async ()=>{
     setIsLoading(true)
    let endPoint = `${http.setURL()}/posts/${id}`
    setPost(await http.get(endPoint))
    setIsLoading(false)
    }

    useEffect(()=>{
        setIsLoading(true)
        getSinglePost()
   },[])

return (
        <section className={isLoading?'loader-wrapper':"categories"}>
            <span className={isLoading?"loader":""}></span>
            {post && post.data.status !==false && post.data.response!=null? <PostDetails post={post}/>:<p>No data was found</p> }
        </section>
    )
}