import { useDispatch } from 'react-redux';
import { removeUploadFile } from '../../../reducers/uploadReducer';
import classes from './Uploader.module.css';

export const UploadFile = ({file}) => {
	const dispath = useDispatch();

	return (
		<div className={classes.upload__file}>
			<div className={classes.upload__file_header}>
				<div className={classes.upload__file_name}>{file.name}</div>
				<button className={classes.uploader__close} onClick={() => dispath(removeUploadFile(file.id))}>X</button>
			</div>
			<div className={classes.upload__file_progress__bar}>
				<div className={classes.upload__file_upload__bar} style={{width: file.progress + "%"}}/>
				<div className={classes.upload__file_percent}>{file.progress}%</div>
			</div>
		</div>
);
};