import { Text, Group, useMantineTheme } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons";

const DropZoneRenderer = ({ title, multiple = false, onDrop }) => {

	const theme = useMantineTheme();

	return (

		<Dropzone
			multiple={multiple}
			maxSize={6 * 1024 ** 2}
			onDrop={onDrop}
			accept={IMAGE_MIME_TYPE}
		>
			<Group
				position="center"
				spacing="xl"
				style={{ 
					minHeight: 100, 
					pointerEvents: "none" 
				}}
			>
				<Dropzone.Accept>
					<IconUpload
						size={50}
						stroke={1.5}
						color={theme.colors[theme.primaryColor][6]}
					/>
				</Dropzone.Accept>
				<Dropzone.Reject>
					<IconX
						size={50}
						stroke={1.5}
						color={theme.colors.red[6]}
					/>
				</Dropzone.Reject>
				<Dropzone.Idle>
					<IconPhoto size={50} stroke={1.5} />
				</Dropzone.Idle>

				<div>
					<Text size="lg" inline>
						{title}
					</Text>
					<Text size="sm" color="dimmed" inline mt={7}>
						File should not exceed 6MB
					</Text>
				</div>
			</Group>
		</Dropzone>
	);
}

export default DropZoneRenderer;