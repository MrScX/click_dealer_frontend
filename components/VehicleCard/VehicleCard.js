import { Card, Text, Badge, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import ItemPhoto from "components/ItemPhoto/ItemPhoto";

import { vehicleStatus } from "utils/consts";
import { formatCurrency, getPortionOfString } from "utils/utils";

const useStyles = createStyles((theme, _params, getRef) => {

	const image = getRef("image");

	return {
		card: {
			position: "relative",
			cursor: "pointer",
			height: 380,
			backgroundColor: theme.colors.gray[0],

			[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
				height: 280,
			},

			[`&:hover .${image}`]: {
				transform: "scale(1.03)",
			},
		},

		image: {
			ref: image,
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			width: "100%",
			height: "100%",
			transition: "transform 500ms ease",
		},

		color: {
			position: "absolute",
			top: 0,
			right: 0,
			zIndex: 101,
			padding: "10px",
			backgroundColor: "#FFC700",
			color: "#333",
			fontSize: "12px",
			fontWeight: 500,
			borderTopRightRadius: theme.radius.md,
			borderBottomLeftRadius: theme.radius.md,

			[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
				padding: "5px",
				fontSize: "10px",
			},
		},

		overlay: {
			position: "absolute",
			top: "65%",
			left: 0,
			right: 0,
			bottom: 0,
			backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 95%)",

			[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
				top: "50%",
			},
		},

		content: {
			height: "100%",
			position: "relative",
			display: "flex",
			flexDirection: "column",
			justifyContent: "flex-end",
			zIndex: 1,
		},

		title: {
			color: theme.white,
			marginBottom: 5,
			fontSize: "15px",

			[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
				fontSize: "12px",
			},
		},

		price: {
			display: "flex",
			alignItems: "baseline",

			[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
				justifyContent: "space-between",
			},
		},

		priceMain: {
			color: "#FFC700",
			fontSize: "13px",
			fontWeight: 700,
			margin: "0px"
		},

		bodyText: {
			color: theme.colors.dark[2],
			marginLeft: 7,
		},

		contentMeta: {
			display: "flex",
			justifyContent: "space-between",

			[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
				flexDirection: "column",
			},
		},
	};
});

const VehicleCard = ({ make, model, year, color, image, price, status, onClick }) => {

	const { classes } = useStyles();
	const isMobile = useMediaQuery("(max-width: 540px)", true, { getInitialValueInEffect: false });

	return (
		<Card
			p="lg"
			shadow="lg"
			className={classes.card}
			radius="md"
			onClick={onClick}
		>
			<div className={classes.color}>
				{color}
			</div>

			<ItemPhoto
				src={image}
				className={classes.image}
				quality={60}
				layout="fill"
				objectPosition="top"
			/>

			<div className={classes.overlay} />

			<div className={classes.content}>
				<div>
					<Text size="lg" className={classes.title} weight={500}>
						{getPortionOfString(`${make}, ${model}, ${year}`, 50)}
					</Text>

					<div className={classes.contentMeta}>
						<div className={classes.price}>
							<p className={classes.priceMain}>
								$ {formatCurrency(price)}
							</p>
						</div>

						<Badge
							color={status === vehicleStatus.AVAILABLE ? "cyan" : "red"}
							size={isMobile ? "xs" : "sm"}
							mt={isMobile ? "5px" : "0px"}
						>
							{
								status === vehicleStatus.AVAILABLE ?
								"Available" :
								"Discontinued"
							}
						</Badge>
					</div>
				</div>
			</div>
		</Card>
	);
}

export default VehicleCard;