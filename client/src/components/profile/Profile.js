import { useDispatch } from "react-redux";
import { deleteAvatar, uploadAvatar } from "../../actions/user";
import classes from './Profile.module.css';
import upload from '../../assets/img/upload-svgrepo-com.svg';

export const Profile = () => {
	const dispatch = useDispatch();

	const changeHandler = (event) => {
		const file = event.target.files[0];
		dispatch(uploadAvatar(file));

	};
	return (
		<div className={classes.profile__block}>
			<button className={classes.profile__delete_btn} 
			onClick={() => dispatch(deleteAvatar())}>Remove avatar</button>
			{/* <input 
			className={classes.profile__download} 
			accept="image/*" 
			onChange={event => changeHandler(event)} 
			type='file' 
			/> */}
			<button className={classes.profile__upload}>
					<label htmlFor="disk__upload-input" placeholder="download avatar">
						<img src={upload} alt="upload" className={classes.profile__upload_img}/>
					</label>
					<input  type="file" id="disk__upload-input" className={classes.profile__upload_input}/>
				</button>
		</div>
);
};