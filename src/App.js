// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import { useState,useEffect } from 'react';
import  { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './assets/css/App.scss';
import Categories from './Components/Categories';
import Footer from './Components/common/Footer';
import NavBar from './Components/common/Navbar.jsx';
import ProtectedRoute from './Components/common/ProtectedRoute';
import PostCategories from './Components/Forms/CreatePostCategories';
import CreatePostSubCategories from './Components/Forms/CreatePostSubCategories';
import Login from './Components/Forms/Login';
import Register from './Components/Forms/Register';
import HomePage from './Components/HomePage.jsx';
import Logout from './Components/Logout';
import { Post } from './Components/Post';
import Posts from './Components/Posts';
import Profile  from './Components/Profile';
import SubCategories from './Components/SubCategories';
import UserDetails from './Components/UserDetails';
import User from './Components/Users';
import Header from './Components/common/Header'
import menus from './Components/common/menus'
function App() {


  return (
    <div className="App">
      <Router>
      {/* <NavBar/> */}
      <Header title='Snow Paddy' />
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route path = "/users"><User/></Route>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <ProtectedRoute path = "/profile" component={Profile}/>
          <Route path = "/user-details/:id/" component={UserDetails}/>
          <Route path="/logout" component={Logout} />
          <Route path = "/category-create"><PostCategories/></Route>
          <Route path = "/categories"><Categories/></Route>
          <Route path = "/sub/categories"><SubCategories/></Route>
          <Route path = "/sub-create"><CreatePostSubCategories/></Route>
          <Route path="/:id/post">
            <Post/>
          </Route>
          <Route path="/posts/all"><Posts/></Route>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
