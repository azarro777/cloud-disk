import React from 'react';
import dirLogo from '../../../../assets/img/folder-svgrepo-com.svg';
import fileLogo from '../../../../assets/img/file-svgrepo-com.svg';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import classes from './File.module.css';
import { useDispatch, useSelector } from 'react-redux';
import downloadBtn from '../../../../assets/img/download-svgrepo-com.svg';
import deleteBtn from '../../../../assets/img/delete-svgrepo-com.svg';
import { downloadFile, deleteFile } from '../../../../actions/file';
import {sizeFormat} from '../../../../utils/input/sizeFormat';

export const File = ({file}) => {
	const dispatch = useDispatch();
	const currentDir = useSelector(state => state.files.currentDir);
	const view = useSelector(state => state.files.view);

	const openDirHandler = (file) => {
		if(file.type === 'dir') {
			dispatch(pushToStack(currentDir));
			dispatch(setCurrentDir(file._id));
		};
	};

	const downloadHandler = (event) => {
		event.stopPropagation();
		downloadFile(file);
	};

	const deleteHandler = (event) => {
		event.stopPropagation();
		dispatch(deleteFile(file));
	};

	if(view === "list") {
		return (
			<div className={classes.file} onClick={() => openDirHandler(file)}>
				<img src={file.type === "dir" ? dirLogo : fileLogo} alt="folder" className={classes.file__img}/>
				<div className={classes.file__name}>{file.name}</div>
				<div className={classes.file__date}>{file.date.slice(0, 10)}</div>
				<div className={classes.file__size}>{sizeFormat(file.size)}</div>
				{file.type !== "dir" && 
				<button onClick={(event) => downloadHandler(event)} className={classes.file__btn && classes.file__download}>
					<img src={downloadBtn} alt="download" className={classes.file__button_img}/>
				</button>}
				<button onClick={(event) => deleteHandler(event)} className={classes.file__btn && classes.file__delete}>
					<img src={deleteBtn} alt="delete" className={classes.file__button_img}/>
				</button>
			</div>
		);
	};
	if(view === "plate") {
		return (
			<div className={classes.file__plate} onClick={() => openDirHandler(file)}>
				<img src={file.type === "dir" ? dirLogo : fileLogo} alt="folder" className={classes.file__plate_img}/>
				<div className={classes.file__plate_name}>{file.name}</div>
				<div className={classes.file__plate_btns}>
					{file.type !== "dir" && 
					<button onClick={(event) => downloadHandler(event)} className={classes.file__btn && classes.file__plate_download}>
						<img src={downloadBtn} alt="download" className={classes.file__plate_button_img}/>
					</button>}
					<button onClick={(event) => deleteHandler(event)} className={classes.file__btn && classes.file__plate_delete}>
						<img src={deleteBtn} alt="delete" className={classes.file__plate_button_img}/>
					</button>
				</div>
			</div>
		);
	}
};