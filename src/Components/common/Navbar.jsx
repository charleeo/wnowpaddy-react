import React,{useEffect,useState} from 'react';
import { Link} from 'react-router-dom';
import auth from '../../services/authService';
const NavBar = ()=>{
    const [user,setUser] = useState('');   
    useEffect(()=>{
      let interval= setInterval(() => {
       const token = auth.getCurrentUser()
        setUser(token);
      }, 5000);
      return () =>{
          clearInterval(interval) 
    }
})
return (
<>

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/" >SNOWPADDY</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
      </ul>
      <ul className="mr-auto d-flex">
        <li className="nav-item">
            <Link className="nav-link" to="/users">Users</Link>           
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/category-create">Post Categories</Link>           
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/sub-create">Post SubCategories</Link>           
        </li>
      {user && 
        <>
          <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
          </li>
          <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
          </li>
          </>
        }

        {!user &&
          <>    
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link  " to="/login">Login</Link>
            </li>
            </>
        }
      </ul>
      {/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>
{/* <nav className='navbar navbar-expand-lg'>
    <Link className="navbar-brand " to="/" id='logo'>kolo-vest</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-center " id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link className="nav-link" to='/'>Home 
          <span className="sr-only">(current)</span>
          </Link>
        </li >
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>           
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/how-it-works">How-it-works</Link>           
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users">Users</Link>           
        </li>
        {user && 
        <>
          <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
          </li>
          <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
          </li>
          </>
        }
        
        {!user &&
        <>    
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link  " to="/login">Login</Link>
          </li>
          </>
        }
      </ul>
    </div>
</nav> */}
</>
  )
}
export default NavBar;