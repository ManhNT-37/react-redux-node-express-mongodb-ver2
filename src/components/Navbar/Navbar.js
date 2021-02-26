import React, { useState, useEffect } from 'react';
import useStyles from './style';
import memories from '../../images/memories.png';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';


const Navbar = () => {
    const classes = useStyles();
    const dispath = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
      dispath({type: LOGOUT});
      
      history.push('/');
      setuser(null);
    };
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
      const token = user?.token;
      setuser(JSON.parse(localStorage.getItem('profile')));
    },[location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">ManhNT</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Đăng xuất</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Đăng ký</Button>
        )}
      </Toolbar>
      </AppBar>
    )
}

export default Navbar
