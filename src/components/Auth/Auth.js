import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
//import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';
import Icon from './icon';
//import { signin, signup } from '../../actions/auth';
//import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';
import { AUTH } from '../../constants/actionTypes';
import { createUser } from '../../actions/user';

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const handleShowPassword = () => setShowPassword(!showPassword);
    const history = useHistory();
    const [postDataSignUp, setpostDataSignUp] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });

    const googleSuccess = async (res) => {
        console.log(res);
        const result = res?.profileObj;
        const token = res?.token;

        try {
            dispatch({type: AUTH, data: {result, token}});
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }
    const googleError = (error) => {
        console.log(error);
        //alert('Google Sign In was unsuccessful. Try again later');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(postDataSignUp);
        dispatch(createUser(postDataSignUp));
    }
    const handleChange = (e) => {
      setpostDataSignUp({...postDataSignUp, [e.target.name]: e.target.value});
    }

    const swichMode = () => {
        setIsSignup((prevIsSignup123) => !prevIsSignup123);
    }






    return (
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">{ isSignup ? 'Đăng ký' : 'Đăng nhập' }</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                { isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
                )}
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                { isSignup ? 'Đăng ký' : 'Đăng nhập' }
              </Button>
              <GoogleLogin
                clientId="446329387464-1p6fd74c9tmr67gqc3mabvr1329qp1e6.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} 
                  disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                    Đăng nhập bằng Google
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
              />
              <Grid container justify="flex-end">
                <Grid item>
                  <Button onClick={swichMode}>
                    { isSignup ? 'Đã có tài khoản? Đăng nhập' : "Chưa có tài khoản? Đăng ký" }
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      );
}

export default Auth
