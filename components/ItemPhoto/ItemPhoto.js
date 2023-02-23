import Image from "next/image";

const ItemPhoto = ({ 
	layout, width, height, 
	src, alt, title, sizes, 
	quality, objectFit = "cover", 
	className, wrapperStyle, 
	objectPosition = "center", onClick 
}) => {

	return (
		<div
			className={className}
			style={{ ...wrapperStyle }}
		>
			<Image
				src={src}
				alt={alt}
				title={title}
				sizes={sizes}
				width={width}
				height={height}
				onClick={onClick}
				blurDataURL={src}
				quality={quality}
				{...layout ? { layout } : {}}
				loading="lazy"
				placeholder="blur"
				objectFit={objectFit}
				objectPosition={objectPosition}
			/>
		</div>
	);
}

export default ItemPhoto;