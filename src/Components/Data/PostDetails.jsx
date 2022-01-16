import http from "../../services/httpServices"

export const PostDetails=({post})=>{
    
       let {title,body,writer,sub_category_name,name,file_url} = post.data.response 
        return (
        <>
            <div className="card border-0">
                <div className="bg-default">
                    <h4 className="text-center">{title}</h4>
                </div>
                <div className="card-body shadow-lg">
                    <img 
                    src={file_url} 
                    alt={writer}
                    className="img img-thumbnail"
                     />
                     <hr />
                    <p className="p-2">{body}</p>
                    <small>Written by: {writer}</small>
                    <hr />
                    <small>In: {sub_category_name}</small>
                    <hr />
                    <small>Category: {name}</small>
                    <hr />
                </div>
            </div>
        </>
        )
  } 