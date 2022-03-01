import {useState} from 'react';
import httpServices from '../../services/httpServices';
import { Link, Redirect } from 'react-router-dom';
import auth from '../../services/authService';
import Swal from 'sweetalert2';

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link  from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
// import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from '../styles/useLoginCSS';


export default function Login(props){

  const [inputText, setInputText] = useState({
    email: "",
    password: ""
  })
  const [isChecked,setIsChecked] = useState(false)
   const [isLoading,setIsLoading] = useState(false);
  
   const onChange = e => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    })
  }

  const handleCheckboxChange =()=>{
    console.log(isChecked)
    setIsChecked(!isChecked)
  }

  const {email,password}=inputText
  const handleSubmit = async e => {

    e.preventDefault()
    const {state}= props.location;

   const loginObject = {email,password,remember_me:isChecked}
   const url = `${httpServices.setURL()}/users/login`;
   try {
    setIsLoading(true)
    const responses = await httpServices.post(url, loginObject);
    let responseStatus = responses.data.status
    let message = ''
    if(responseStatus === false){
        message = responses.data.response ===null? responses.data.message : responses.data.response[0].message
        setIsLoading(false)
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error'
        })
    }else if(responseStatus === true){
        message = responses.data.message
        setIsLoading(false)
        auth.setJWT(responses.data.response.access_token)
        auth.setUser(JSON.stringify(responses.data.response.user))
        Swal.fire({
            text: message,
            icon: 'success',
            showConfirmButton:false,
            timer:2000,
            title:"Success"
          })
        setIsLoading(false)
        setInputText({email:'',password:''})
        // window.location = state ? state.from.pathname : "/";
        props.history.push(state?state.from.pathname:"/")
    }
   } catch (ex) {

    if(ex.response !== undefined || ex.statusCode < 500  ){
        Swal.fire({
            title: 'Error!',
            text: ex.response.data.error,
            icon: 'error'
        })
    }
    else {
        Swal.fire({
            title: 'Error!',
            text: "There was an unexpected error. Please try again",
            icon: 'error'
        })
    }
    setIsLoading(false)
  }
}

const classes = useStyles();
if(auth.getCurrentUser()){ return <Redirect to= '/'/>}

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={12} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}> 
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={onChange}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox  color="primary" name="remember_me" checked={isChecked} value={true} onChange={handleCheckboxChange} />}
              label="Remember me"
            />
            {isLoading ?<div className="loader"></div>:
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isLoading||(!password || !email)?true:false}
              >
              Sign In
            </Button>}
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to ="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}