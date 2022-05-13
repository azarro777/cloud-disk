import classes from "./Input.module.css";

export const Input = (props) => {
	return (
	<input 
		onChange={(event) => props.setValue(event.target.value)}
		value={props.value}
		type={props.type} 
		placeholder={props.placeholder}
		/>
	)
};