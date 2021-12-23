export const postDetails=(post)=>{
    if(post !==undefined){
       let {title,body,writer,sub_category_name,name} = post.data.response 
        return (
            <div className="card border-0">
                <div className="bg-default">
                    <h4 className="text-center">{title}</h4>
                    <hr />
                </div>
                <div className="card-body">
                    <p className="p-2">{body}</p>
                    <small>Written by: {writer}</small>
                    <hr />
                    <small>In: {sub_category_name}</small>
                    <hr />
                    <small>Category: {name}</small>
                </div>
            </div>
        )
    }
  } 