import classes from "./Registration.module.css";
import { Input } from "../../utils/input/Input";
import { useState } from "react";
import { registration } from "../../actions/user";

export const Registration = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className={classes.registration}>
			<div className={classes.registration__header}>Registration</div>
			<Input value={email} setValue={setEmail} type="text" placeholder="Insert email"/>
			<Input value={password} setValue={setPassword} type="password" placeholder="Inser password"/>
			<button className={classes.registration__btn} onClick={() => registration(email, password)}>Register</button>
		</div>
	);
};