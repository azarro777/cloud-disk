import classes from "./Authorization.module.css";
import { Input } from "../../utils/input/Input";
import { useState } from "react";
import { registration } from "../../actions/user";

export const Authorization = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className={classes.authorization}>
			<div className={classes.authorization__header}>Registration</div>
			<Input value={email} setValue={setEmail} type="text" placeholder="Insert email"/>
			<Input value={password} setValue={setPassword} type="password" placeholder="Inser password"/>
			<button className={classes.authorization__btn} onClick={() => registration(email, password)}>Register</button>
		</div>
	);
};