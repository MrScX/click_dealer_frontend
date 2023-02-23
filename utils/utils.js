import { showNotification } from "@mantine/notifications";

export const isDevelopment = () => process.env.NEXT_PUBLIC_ENVIRONMENT === "development";
export const isProduction = () => process.env.NEXT_PUBLIC_ENVIRONMENT === "production";

export const parseResponseError = (err) => {
	
	if (err.response) {

		const { data } = err.response;
		
		if (data.validation && data.validation.body) {
			return data.validation.body.message;
		} else if (data.message) {
			return data.message;
		} 
	}

	return "Please try again later.";
}

export const handleResponseError = (err) => {
	console.log(err);

	if (err.response) {

		showNotification({
			message: parseResponseError(err),
			title: "Oops! Something went wrong.",
			color: "red"
		});
	}
}

export const formatCurrency = (amount) => {
	return new Intl.NumberFormat("en-IN").format(amount);
}

export const getPortionOfString = (str, length) => {
	
	if (!str || typeof str !== "string") {
		return "";
	}

	return str.length > length ? str.substring(0, length) + "..." : str;
}

export const isArrayAndHasContent = (arr) => {
	return Array.isArray(arr) && arr.length > 0;
}