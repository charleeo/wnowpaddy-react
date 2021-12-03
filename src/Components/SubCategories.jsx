import { useEffect, useState } from "react"
import http from "../services/httpServices"

const SubCategories = ()=>{
    let [subCategories,setSubCategories] = useState(null)
    const [isLoading,setIsLoading] = useState(false);
    let endPoint = `${http.setURL()}/category/sub-lists?per_page=5`
    useEffect(()=>{
        setIsLoading(true)
        async function getData (){
            setSubCategories(await http.post(endPoint))
            setIsLoading(false)
         }
         getData()
        },[endPoint])
    
    if(subCategories && subCategories.status !== false){
       subCategories= subCategories.data.response.data
    }
    return(
    <section className={isLoading?'loader-wrapper':"subCategories"}>
        <span className={isLoading?"loader":""}></span>
        {subCategories!=null && subCategories.length > 0?  subCategories.map(subCat=>(
            <div className="row justify-content-center mb-3" key={subCat.id}>
                <div className="col col-md-6">
                <div className="card p-4">
                    <div className="card-body">
                        <ul className="list-group border-0">
                            <li className="list-group-item">
                                {subCat.sub_category_name}
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
                )
            )
       :
       <div className="card text-center">No User was found</div>
        }
 </section>
)
}

export default SubCategories