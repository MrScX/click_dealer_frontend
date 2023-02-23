import axios from "axios";
import { API_ROOT } from "./consts";

const axiosInstance = axios.create({ 
	baseURL: `${API_ROOT}/v1`
});

export default axiosInstance;