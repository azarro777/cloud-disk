import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile } from '../../actions/file';
import {FileList} from './fileList/FileList';
import { Popup } from './Popup';
import classes from './Disk.module.css';
import { setCurrentDir, setPopupDisplay, popToStack } from '../../reducers/fileReducer';
import upload from "../../assets/img/upload-svgrepo-com.svg";
import createFolder from "../../assets/img/folder-create-svgrepo-com.svg";
import goBack from "../../assets/img/arrow-go-back-svgrepo-com.svg";

export const Disk = () => {
	const dispatch = useDispatch();
	const currentDir = useSelector(state => state.files.currentDir);
	const dirStack = useSelector(state => state.files.dirStack);
	const [dragEnter, setDragEnter] = useState(false);

	useEffect(()=> {
		dispatch(getFiles(currentDir));
	}, [currentDir]);

	const showPopupHandler = () => {
		dispatch(setPopupDisplay('flex'));
	};

	const goBackHandler = () => {
		const backDirId = dirStack.slice(-1).toString();
		dispatch(setCurrentDir(backDirId));
		dispatch(popToStack());
	};

	const fileUploadHandler = (event) => {
		const files = [...event.target.files];
		files.forEach(file => dispatch(uploadFile(file, currentDir)));
	};

	const dragEnterHandler = (event) => {
		event.preventDefault();
		event.stopPropagation();
		setDragEnter(true);
	};

	const dragLeaveHandler = (event) => {
		event.preventDefault();
		event.stopPropagation();
		setDragEnter(false);
	};

	const dropHandler = (event) => {
		event.preventDefault();
		event.stopPropagation();
		let files = [...event.dataTransfer.files];
		files.forEach(file => dispatch(uploadFile(file, currentDir)));
		setDragEnter(false);
	};

	return ( !dragEnter ?
		<div 
		className={classes.disk} 
		onDragEnter={dragEnterHandler} 
		onDragLeave={dragLeaveHandler} 
		onDragOver={dragLeaveHandler}>
			<div className={classes.disk__btns}>
				<button className={classes.disk__black} onClick={() => goBackHandler()}>
					<img src={goBack} alt="go-back"/>
				</button>
				<button className={classes.disk__create} onClick={() => showPopupHandler()}>
					<img src={createFolder} alt="create-folder"/>
				</button>
				<button className={classes.disk__upload}>
					<label htmlFor="disk__upload-input">
						<img src={upload} alt="upload" className={classes.disk__upload_img}/>
					</label>
					<input multiple={true} onChange={(event) => {fileUploadHandler(event)}} type="file" id="disk__upload-input" className={classes.disk__upload_input}/>
				</button>
			</div>
			<FileList/>
			<Popup/>
		</div>
		:
		<div 
		className={classes.drop_area}
		onDrop={dropHandler}
		onDragEnter={dragEnterHandler} 
		onDragLeave={dragLeaveHandler} 
		onDragOver={dragEnterHandler}>Drag and drop files here.</div>
	);
};
