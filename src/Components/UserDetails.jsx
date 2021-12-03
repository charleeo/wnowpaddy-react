import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDocumentTitle from "../CustomHooks/useDocumentTitle";
import http from "../services/httpServices";
import UsersData from "./common/UsersData";
const UserDetails = ()=>{
  const {id} = useParams()
  let [user,setUser] = useState(null)
 const [isLoading,setIsLoading] = useState(false)
  let endPoint = `${http.setURL()}/users/${id}`
  useEffect(()=>{
       setIsLoading(true)
       async function getData (){
          setUser(await http.get(endPoint,http.setJwtHeaders()))
          setIsLoading(false)
       }
       getData()
  },[endPoint])

  if(user) {user = user.data.response}
  useDocumentTitle(`${user?user.name:""} details page`)
  return(
      <>
        <section className={isLoading?"loader-wrapper":"user-details"}>
          <div className={isLoading?"loader":""}></div>
          {user &&
          <UsersData user={user} />
          }
        </section>
      </>
  )
}

export default UserDetails