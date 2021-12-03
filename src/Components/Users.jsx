import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../services/httpServices"

const User = ()=>{
    let [users,setUsers] = useState(null)
    const [isLoading,setIsLoading] = useState(false);
    let endPoint = `${http.setURL()}/users/`
    useEffect(()=>{
        setIsLoading(true)
        async function getData (){
            setUsers(await http.post(endPoint))
            setIsLoading(false)
         }
         getData()
        },[endPoint])
    
    if(users && users.status !== false){
        if(users.data && users.data.response !==null && users.data.response.length >0){
        users = users.data.response
        }
    }
    return(
    <section className={isLoading?'loader-wrapper':"users"}>
        <span className={isLoading?"loader":""}></span>
        {users!=null && users.length > 0?  users.map(user=>(
            <div className="row justify-content-center mb-3" key={user.id}>
                <div className="col col-md-6">
                <div className="card p-4">
                    <div className="card-body">
                        <ul className="list-group border-0">
                            <li className="list-group-item">
                                {user.name}
                            </li>
                            <li className="list-group-item">
                                {user.email}
                            </li>
                            <li className="list-group-item">
                                <Link to= {`/user-details/${user.id}/`}>View</Link>
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

export default User