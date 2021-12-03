import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../services/httpServices"

const Categories = ()=>{
    let [categories,setCategories] = useState(null)
    const [isLoading,setIsLoading] = useState(false);
    let endPoint = `${http.setURL()}/category/lists?per_page=5`
    useEffect(()=>{
        setIsLoading(true)
        async function getData (){
            setCategories(await http.post(endPoint))
            setIsLoading(false)
         }
         getData()
        },[endPoint])
    
    if(categories && categories.status !== false){
       categories= categories.data.response.data
        // console.log(categories.data.response.data)
        // if(categories.data && categories.data.response !==null && categories.data.response.length >0){
        // categories = categories.data.response.data
        // }
    }
    return(
    <section className={isLoading?'loader-wrapper':"categories"}>
        <span className={isLoading?"loader":""}></span>
        {categories!=null && categories.length > 0?  categories.map(user=>(
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
       :
       <div className="card text-center">No User was found</div>
        }
 </section>
)
}

export default Categories