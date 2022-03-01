import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
import { Link} from 'react-router-dom';
import menus from './menus';
import auth from '../../services/authService';

const useStyles = makeStyles((theme) => ({

  toolbar: {
    borderBottom: `3px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent : "space-between",
    overflowY :"hidden"
  },
  toolbarTitle: {
    fontSize :"2rem",
    textTransform : "uppercase"
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
toobarsearch:{
  transform :"scale(2)"
},

  '@media (max-width: 480px)' : {
    toolbar:{
      
    },

    toolbarTitle: {
      fontSize :"1.5rem",

    },
  },
  
}));

export default function Header() {
  const classes = useStyles();
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
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          Snow Paddy
        </Typography>
          <Toolbar className={classes.toobarsearch}>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Toolbar>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            to={section.url}
            className={classes.toolbarLink}
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