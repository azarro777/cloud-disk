import { useDispatch, useSelector } from 'react-redux';
import classes from './Uploader.module.css';
import { UploadFile } from './UploadFile';
import { hideUploader } from '../../../reducers/uploadReducer';

export const Uploader = () => {
	const files = useSelector(state => state.upload.files);
	const isVisible = useSelector(state => state.upload.isVisible);
	const dispath = useDispatch();
	
	return ( isVisible &&
		<div className={classes.uploader}>
			<div className={classes.uploader__header}>
				<div className={classes.uploader__title}>Downloads</div>
				<button onClick={() => dispath(hideUploader())} className={classes.uploader__close}>X</button>
			</div>
			{files.map(file => <UploadFile key={file.id} file={file}/>)}
		</div>
);
};