import  React from 'react';
import Input from '../Forms/Input';


const UsersData = ({user})=>{
  return(
    <div className="row justify-content-center   register">
      <div className="col-md-6 col-sm-12  shadow bg-white p-2">
        <div className="card p-4">
          <div className="card-header">
            <h4 className='text-center'>{user.name} Page</h4> 
          </div>
          <div className="card-body p-4">
          </div>
            <Input
              name ='email'
              type="email"
              label="Email Address"
              value={user.email}
              readOnly
            />
            <Input
              name ='name'
              label="User Name"
              value={user.name}
              placeholder='enter your user name here'
              readOnly
            />
        </div>
      </div>
    </div>
  )
}
export default UsersData
