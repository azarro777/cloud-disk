import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, searchFiles, uploadFile } from '../../actions/file';
import {FileList} from './fileList/FileList';
import { Popup } from './Popup';
import classes from './Disk.module.css';
import { setCurrentDir, setPopupDisplay, popToStack, setView } from '../../reducers/fileReducer';
import upload from "../../assets/img/upload-svgrepo-com.svg";
import createFolder from "../../assets/img/folder-create-svgrepo-com.svg";
import goBack from "../../assets/img/arrow-go-back-svgrepo-com.svg";
import { Uploader } from './uploader/Uploader';
import { showLoader } from '../../reducers/appReducer';

export const Disk = () => {
	const dispatch = useDispatch();
	const currentDir = useSelector(state => state.files.currentDir);
	const loader = useSelector(state => state.app.loader);
	const dirStack = useSelector(state => state.files.dirStack);
	const [dragEnter, setDragEnter] = useState(false);
	const [sort, setSort] = useState('type');
	const [searchName, setSearchName] = useState('');
	const [searchTimeout, setSearchTimeout] = useState(false);

	useEffect(()=> {
		dispatch(getFiles(currentDir, sort));
	}, [currentDir, sort]);

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

	const searchChangeHandler = (event) => {
		setSearchName(event.target.value);
		if (searchTimeout !== false) {
			clearTimeout(searchTimeout);
		}
		if(event.target.value !== '') {
			setSearchTimeout(setTimeout((value) => {
				console.log(value); //! Console log!
				dispatch(searchFiles(value));
				setSearchName('');
			}, 1000, event.target.value))
		} else {
			dispatch(getFiles(currentDir));
		}
	};

	if(loader) {
		return (
			<div className={classes.loader}>
				<div className={classes.lds_ripple}><div></div><div></div></div>
			</div>
		)
	}

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
					<input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="disk__upload-input" className={classes.disk__upload_input}/>
				</button>
				<div className={classes.disk__inputs}>
				<input 
					type="text" 
					value={searchName} 
					onChange={(event) => searchChangeHandler(event)} 
					placeholder="Search..." 
					className={classes.disk__input}
				/>
					<select value={sort} onChange={(event) => setSort(event.target.value)} className={classes.disk__select}>
						<option value="name">name</option>
						<option value="type">type</option>
						<option value="date">date</option>
					</select>
					<button className={classes.disk__plate} onClick={() => dispatch(setView('plate'))}></button>
					<button className={classes.disk__list} onClick={() => dispatch(setView('list'))}></button>
				</div>
			</div>
			<FileList/>
			<Popup/>
			<Uploader/>
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
