import classes from "./Navbar.module.css";
import logo from "../../assets/img/svgrepo.svg";
import { useState } from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";

export const Navbar = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(state => state.user.isAuth);
	return (
		<div className={classes.navbar}>
			<div className={classes.container}>
				<img src={logo} alt="logo" className={classes.navbar__logo}/>
				<div className={classes.navbar__header}>MERN CLOUD</div>
				{!isAuth && <div className={classes.navbar__login}><Link to="/login">Log In</Link></div>}
				{!isAuth && <div className={classes.navbar__registration}><Link to="/registration">Sign up</Link></div>}
				{isAuth && <div className={classes.navbar__login} onClick={() => dispatch(logout())}>Log out</div>}

			</div>
		</div>
	);
};