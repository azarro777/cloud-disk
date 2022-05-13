import {configureStore} from "@reduxjs/toolkit";
import fileReducer from "./fileReducer";
import userReducer from "./userReducer";

export const store = configureStore({
	reducer: {
		user: userReducer,
		files: fileReducer
	}
})