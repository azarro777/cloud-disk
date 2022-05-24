import React from 'react';
import dirLogo from '../../../../assets/img/folder-svgrepo-com.svg';
import fileLogo from '../../../../assets/img/file-svgrepo-com.svg';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import classes from './File.module.css';
import { useDispatch, useSelector } from 'react-redux';

export const File = ({file}) => {
	const dispatch = useDispatch();
	const currentDir = useSelector(state => state.files.currentDir);

	const openDirHandler = (file) => {
		if(file.type === 'dir') {
			dispatch(pushToStack(currentDir));
			dispatch(setCurrentDir(file._id));
		};
	};

	return (
		<div className={classes.file} onClick={() => openDirHandler(file)}>
			<img src={file.type === 'dir' ? dirLogo : fileLogo} alt="folder" className={classes.file__img}/>
			<div className={classes.file__name}>{file.name}</div>
			<div className={classes.file__date}>{file.date.slice(0, 10)}</div>
			<div className={classes.file__size}>{file.size}</div>
		</div>
	);
};