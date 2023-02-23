import axios from "./axiosInstance";

import { S3_BASE } from "./consts";
import { handleResponseError } from "./utils";

const getSignedURL = async (image_name, image_type, folder, token) => {
	
	try {

		const params = {
			name: image_name,
			type: image_type
		};

		if (folder) {
			params.folder = folder;
		}

		const { data } = await axios.get(
			"/upload/s3-signed-url",
			{ 
				params,
				headers: { Authorization: `Bearer ${token}` } 
			}
		);

		return data.url;
		
	} catch (err) {
		handleResponseError(err);
		return false;
	}
}

const s3Uploader = async (image_type, image_name, folder, imageFile, token) => {

    try {

        const signedURL = await getSignedURL(image_name, image_type, folder, token);

        if (!signedURL) {
            return false;
        }

        await axios.put(
            signedURL.signedUrl, imageFile,
            { headers: { "Content-Type": image_type } }
        );

        return `${S3_BASE}/${signedURL.key}`;
        
    } catch (err) {
        handleResponseError(err);
        return false;
    }
}

export default s3Uploader;