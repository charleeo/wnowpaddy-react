import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import { Link} from 'react-router-dom';
import menus from './menus';
import auth from '../../services/authService';
import { TextField } from '@material-ui/core';
import {useStyles} from './useStyle';
export default function Header() {
  const [showSearchTextField,setShowSearchTextField] = useState(false)
  const handleSearchTextField=()=>{
    if(!showSearchTextField){
        setShowSearchTextField(true)
    }else setShowSearchTextField(false)
  }
  const [showMenuItems,setShowMenuItems] = useState(false)
  const handleShowMenuItems=()=>{
    if(!showMenuItems){
        setShowMenuItems(true)
    }else setShowMenuItems(false)
  }
  const classes= useStyles();
  const sections = menus.menusItems();
  const [user,setUser] = useState(null);  
    useEffect(()=>{
      let interval= setInterval(() => {
       const token = auth.getCurrentUser()
        setUser(token);
      }, 5000);
      return () =>{
          clearInterval(interval) 
      }
    },[])
  return (
    <React.Fragment>
      <Toolbar className={classes().toolbar} id ="header">
        <Typography
          component="div"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes().toolbarTitle}
        >
          <Link to ='/'>Snow Paddy</Link>
        </Typography>
          <Toolbar searchToolBar id="toolbars">
            <TextField 
              className= {classes().searchField}
              style ={{
                display: showSearchTextField? "flex":"none",
                transition: "all 8s linear"
              }}
            />
            <IconButton onClick={handleSearchTextField}>
              <SearchIcon fontSize='large' />
            </IconButton>
              <HorizontalSplitIcon
                id ="bars"
                onClick ={handleShowMenuItems}
              />
          </Toolbar>
      </Toolbar>
      <Toolbar component="nav" variant="regular"
        onClick={handleShowMenuItems}
        id = {showMenuItems? 'nav-menu-items':"nav-menu-items2"}
        className={classes().toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            to={section.url}
            className={classes().toolbarLink}
            onClick={handleShowMenuItems}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};