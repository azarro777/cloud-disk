import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupDisplay } from '../../reducers/fileReducer';
import {Input} from '../../utils/input/Input';
import { createDir } from '../../actions/file';
import classes from './Disk.module.css';

export const Popup = () => {
	const dispatch = useDispatch();
	const [dirName, setDirName] = useState('');
	const popupDisplay = useSelector(state => state.files.popupDisplay);
	const currentDir = useSelector(state => state.files.currentDir);

	const createHandler = () => {
		dispatch(createDir(currentDir, dirName));
		dispatch(setPopupDisplay('none'));
		setDirName('');
	};

	return (
		<div className={classes.popup} onClick={() => dispatch(setPopupDisplay('none'))} style={{display: popupDisplay}}>
			<div className={classes.popup__content} onClick={event => event.stopPropagation()}>
				<div className={classes.popup__header}>
					<div className={classes.popup__title}>Create a new folder</div>
					<button className={classes.popup__close} onClick={() => dispatch(setPopupDisplay('none'))}>X</button>
				</div>
				<Input type="text" placeholder="input the folder name..." value={dirName} setValue={setDirName}/>
				<button className={classes.popup__create} onClick={() => createHandler()}>Create</button>
			</div>
		</div>
	);
};