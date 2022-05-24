import axios from "axios";
import {API_URL} from "../config";
import { setFiles, addFile } from "../reducers/fileReducer";

export const getFiles = (dirId) => {
	return async dispatch => {
		try {
			const response = await axios.get(`${API_URL}api/files/${dirId ? '?parent='+dirId : ''}`, {
				headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
			});
			dispatch(setFiles(response.data));
		} catch (error) {
			alert(error.response.data.message)
		}
	}
}

export const createDir = (dirId, name) => {
	return async dispatch => {
		try {
			const response = await axios.post(`${API_URL}api/files`, 
			{name, parent: dirId, type: 'dir'},
			{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
			dispatch(addFile(response.data));
		} catch (error) {
			alert(error.response.data.message)
		}
	}
}

export const uploadFile = (file, dirId) => {
	return async dispatch => {
		try {
			const formData = new FormData();
			formData.append('file', file);
			if (dirId) {
				formData.append('parent', dirId);
			}
			const response = await axios.post(`${API_URL}api/files/upload`, formData,
			{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
		onUploadProgress: progressEvent => {
			const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
			console.log('total', totalLength); //! Console log!
			if (totalLength) {
				let progress = Math.round((progressEvent.loaded * 100) / totalLength);
				console.log(progress); //! Console log!
			};
		}
		});
			dispatch(addFile(response.data));
		} catch (error) {
			alert(error.response.data.message)
		}
	}
}