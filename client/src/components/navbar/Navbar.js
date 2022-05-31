import classes from './Navbar.module.css';
import logo from '../../assets/img/svgrepo.svg';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import avatarLogo from '../../assets/img/user-avatar.svg';
import {API_URL} from '../../config';

export const Navbar = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(state => state.user.isAuth);
	const currentUser = useSelector(state => state.user.currentUser);
	const avatar = currentUser.avatar ? `${API_URL}${currentUser.avatar}` : avatarLogo;

	return (
		<div className={classes.navbar}>
			<div className={classes.container}>
				<img src={logo} alt="logo" className={classes.navbar__logo}/>
				<div className={classes.navbar__header}>MERN CLOUD</div>
				{!isAuth && <div className={classes.navbar__login}><Link to="/login">Log In</Link></div>}
				{!isAuth && <div className={classes.navbar__registration}><Link to="/registration">Sign up</Link></div>}
				{isAuth && <div className={classes.navbar__login} onClick={() => dispatch(logout())}>Log out</div>}
				{isAuth && 
					<Link to="/profile">
						<div className={classes.navbar__img_container}>
							<img className={classes.navbar__avatar} src={avatar} alt="avatar" />
						</div>
					</Link>}
			</div>
		</div>
	);
};