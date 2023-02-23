import axios from "utils/axiosInstance";

import { handleResponseError } from "utils/utils";

export const fetchVehicles = async (searchQuery, token, logError) => {

	try {

		let baseUrl = "/vehicle/all";

		if (searchQuery) {
			baseUrl = `${baseUrl}?searchQuery=${searchQuery}`;
		}

		const { data } = await axios.get(
			baseUrl, 
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		return data.vehicles;
		
	} catch (err) {

		if (logError) {
			console.log(err);
		} else {
			handleResponseError(err);
		}

		return [];
	}
}

export const deleteVehicle = async (vehicleId, token, logError) => {
	try {

		await axios.delete(
			`/vehicle/${vehicleId}`, 
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		return true;
		
	} catch (err) {

		if (logError) {
			console.log(err);
		} else {
			handleResponseError(err);
		}

		return false;
	}
}