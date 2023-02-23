import { Fragment } from "react";
import { useWatch } from "react-hook-form";
import { Title, Flex } from "@mantine/core";

import ImageFilePreview from "components/ImageFilePreview/ImageFilePreview";

const PreviewVehicleImage = ({ control }) => {

	const { img_url, img_url_blob } = useWatch({ control });

	return (
		(img_url_blob || img_url) &&
		<Fragment>
			<Title order={3} size="h4">
				Image Preview
			</Title>
			<Flex>
				<ImageFilePreview
					height={100}
					{...img_url_blob ? { file: img_url_blob } : { src: img_url }}
				/>
			</Flex>
		</Fragment>
	);
}

export default PreviewVehicleImage;