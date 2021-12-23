import { useEffect, useState } from "react"
import Pagination from "react-js-pagination"
import http from "../services/httpServices"
// import Pagination from './common/Pagination'

const Categories = ()=>{
    let [categories,setCategories] = useState(null)
    const [isLoading,setIsLoading] = useState(false);

    const perPage =1;
    async function getData (pageNumber=1){
        let endPoint = `${http.setURL()}/category/lists?page=${pageNumber}&per_page=${perPage}`
        setCategories(await http.post(endPoint))
        setIsLoading(false)
     }
    useEffect(()=>{
        setIsLoading(true)
         getData()
        },[])
    
    const renderData=()=>
    {
      const {data,current_page, total,per_page} = categories.data.response
      if(data && data.length > 0){
         return(
             <>
             
            { data.map(user=>(
                <div className="row justify-content-center mb-3" key={user.id}>
                    <div className="col col-md-6">
                    <div className="card p-4">
                        <div className="card-body">
                            <ul className="list-group border-0">
                                <li className="list-group-item">
                                    {user.name}
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
            </>
        )
          }else{
              return <p>No Data found</p>
          }
    }
    return(
    <section className={isLoading?'loader-wrapper':"categories"}>
        
        <span className={isLoading?"loader":""}></span>
        {categories!=null  && renderData()
        }
        {/* <Pagination/> */}
        {/* <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {
                    links.map((link,index)=>(
                    <li key={index} className="page-item">
                        <button className="page-link" 
                            onClick={()=>handleURLChange(link.url)} 
                            >
                            {
                            index===0?"Preevious":(index=== links.length -1 ? "Next":link.label)
                            }
                        </button>
                    </li>
                    ))
                    }

                </ul>
            </nav> */}
        {/* <div className="card text-center">No User was found</div> */}
 </section>
)
}

export default Categories