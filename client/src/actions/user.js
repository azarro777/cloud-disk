import axios from "axios";
import {API_URL} from "../config";

export const registration = async (email, password) => {
	try {
		const response = await axios.post(`${API_URL}api/auth/registration`, {
		email,
		password
		});
		alert(response.data.message);

	} catch (error) {
		alert(error.response.data.message);
	}
}