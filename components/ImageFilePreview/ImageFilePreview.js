import styles from "./style.module.scss";

const ImageFilePreview = ({ file, src, height }) => {

	const imageUrl = src ? src : URL.createObjectURL(file);

	return (
		<div className={styles["ImageFilePreview"]}>
			<img
				src={imageUrl}
				style={{ 
					height: height || 100, 
					width: height || 100, 
					objectFit: "cover", 
					borderRadius: "5px",
					boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.1)",
				}}
				{...src ? {} : { onLoad: () => URL.revokeObjectURL(imageUrl) }}
			/>
		</div>
	);
}

export default ImageFilePreview;