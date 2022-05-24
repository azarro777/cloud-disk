import React from 'react';
import { useSelector } from 'react-redux';
import {File} from './file/File';
import classes from './FileList.module.css';

export const FileList = () => {
	const files = useSelector(state => state.files.files);

	if(files.length === 0) {
		return <div className={classes.loader}>Files not found</div>
	};
	return (
		<div className={classes.filelist}>
			<div className={classes.filelist__header}>
				<div className={classes.filelist__name}>Name</div>
				<div className={classes.filelist__date}>Date</div>
				<div className={classes.filelist__size}>Size</div>
			</div>
			{files.map((file, index) => <File key={file._id} file={file}/>)}
		</div>
	);
};

