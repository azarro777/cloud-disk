import classes from "./Authorization.module.css";
import { Input } from "../../utils/input/Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";



export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	return (
		<div className={classes.authorization}>
			<div className={classes.authorization__header}>Log In</div>
			<Input value={email} setValue={setEmail} type="text" placeholder="Insert email"/>
			<Input value={password} setValue={setPassword} type="password" placeholder="Inser password"/>
			<button className={classes.authorization__btn} onClick={() => dispatch(login(email, password))} >Enter</button>
		</div>
	);
};