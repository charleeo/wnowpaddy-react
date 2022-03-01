import  React,{useState} from 'react';
import Input from './Input';
import httpServices from '../../services/httpServices'
import { Link, Redirect } from 'react-router-dom';
import auth from '../../services/authService';
import Swal from 'sweetalert2';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link  from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from '../styles/useLoginCSS';

const Register = (props)=>{
  const data = {
    email:"",password:"",name:"", password_confirmation:""
  }
  const [values,setValues]= useState(data||{});
  const handleChange=(e)=>{
    setValues({
      ...values,[e.target.name]:e.target.value
    })
  }
  const [isLoading,setIsLoading] = useState(false);
  
  const {email,password,name,password_confirmation} = values;
  const  handleSubmit= async(e)=>{
    e.preventDefault()
    const dataToSubmit = {email,password,name,password_confirmation};
    const url = `${httpServices.setURL()}/users/create`;
   try {
     
    setIsLoading(true);
    const responses = await httpServices.post(url, dataToSubmit);
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
        setValues({email:'',password:'',name:'',password_confirmation:''})
        setIsLoading(false)
        Swal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonText: 'success'
          })
        setTimeout(function(){
          props.history.push('/login')
        },500)
    }
   } catch (ex) {
    if(ex.response !== undefined ){
        Swal.fire({
            title: 'Error!',
            text: ex.message,
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        // setError(ex.response.data.error)
    }
    else {
        Swal.fire({
            title: 'Error!',
            text:"There was an error from the back",
            icon: 'error',
            confirmButtonText: 'OK'
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
              onChange={handleChange}
              value={values.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              autoComplete="name"
              value={values.name}
              onChange={handleChange}
              name ='name'
              label="User Name"
              value={values.name}
              placeholder='enter your user name here'
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
              onChange={handleChange}
              id="password"
              autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name ='password_confirmation'
              label="Password Confirmation"
              type="password"
              onChange ={handleChange}
              value={values.password_confirmation}
              placeholder='Confirm Passord'
              id="password"
              autoComplete="current-password"
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
              Sign Up
            </Button>}
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to ="/login" variant="body2">
                  {"have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
export default Register
