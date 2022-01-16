export const CreatePostHTML=(props)=>{
  const {
    isLoading,handleSubmit,title,body,sub_category_id, text,onChange,subCategories,editPostData,id,submitText,handleFileUpload
} = props
    return(
    <div className={isLoading?'loader-wrapper':"row justify-content-center"}>
     {isLoading?<span className="loader"></span>:
        <div className='col-md-11 col-sm-12'>
          <div className="card shadow border-0">
            <div className='card-heade '>
              <h4 className="text-center">{text} Post</h4>
            </div>
            <div className='card-body'>             
              <form onSubmit={handleSubmit}>
                <div className='form-group mb-2'>
                  <label htmlFor='title'>Title</label>
                  <input type='text' 
                   placeholder="enter post title"
                    value={title}
                    name="title" 
                    onChange={onChange}
                    className="form-control" />
                </div>

                <div className='form-group mb-2'>
                  <label htmlFor='title'>Body</label>
                  <textarea
                  rows='10'
                   placeholder="enter post body"
                    value={body}
                    name="body" 
                    onChange={onChange}
                    className="form-control" />
                </div>
                
                <div className='form-group'>
                <input type="file" name="file"  onChange={handleFileUpload} />
                </div>
                <div className='form-group'>
                  <label htmlFor='name'>Sub Category</label>
                  <select  
                    name="sub_category_id" 
                    onChange={onChange}
                    className="form-control">
                        <option  value={editPostData?editPostData.data.response.sub_category_id: ""}>{editPostData?editPostData.data.response.sub_category_name: "select a sub category"}</option>
                        {subCategories && subCategories.status !==false && subCategories.data !==null? subCategories.data.response.map((subCat)=>(
                            <option key={subCat.id} value={subCat.id}>{subCat.sub_category_name}</option>
                        )):<option>No posts found</option>}
                    </select>
                </div>
                <input type="hidden" value={id} name="post_id"/>
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary mt-3" disabled={isLoading||(!title || !body || !sub_category_id)?true:false}> {submitText}
                </button>  
              </div>
              </form>
            </div>
            <hr/>
          </div>
        </div>
      }
      </div>
    )
}