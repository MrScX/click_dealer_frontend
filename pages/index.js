import { useState, useEffect, useContext } from "react";
import { Container, SimpleGrid, Button, Loader, Flex } from "@mantine/core";
import { getCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import { openModal } from "@mantine/modals";
import qs from "query-string";

import VehicleCard from "components/VehicleCard/VehicleCard";
import VehicleCreateModal from "components/VehicleCreateModal/VehicleCreateModal";
import VehicleDetailsModal from "components/VehicleDetailsModal/VehicleDetailsModal";

import { IconSearch } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import { fetchVehicles } from "api/vehicles";
import { AuthContext } from "context/auth-context";
import { isArrayAndHasContent } from "utils/utils";

const NoVehicleFound = () => (
	<div className="flex flex-col justify-center items-center">
		<IconSearch size={60} />
		<h2 className="mt-2 mb-2 font-bold text-2xl">
			No Products Found
		</h2>
		<p className="text-gray-500">
			Try fine tuning your search
		</p>
	</div>
);

const Home = (props) => {

	const { vehicles: initVehicles, error } = props;

	const { user } = useContext(AuthContext);

	const [searchQuery, setSearchQuery] = useState(null);
	const [enableVehicleFetch, setEnableVehicleFetch] = useState(false);

	useEffect(() => {

		// Skip router.query from useRouter, it's null initially
		// So, if there's a query in the url, vehicle will be fetched twice
		const query = qs.parse(window.location.search);

		if (query) {
			setSearchQuery(query.search_key);
		}

		setEnableVehicleFetch(true);

	}, [window.location.search]);

	const { data: updatedVehicles, refetch } = useQuery({
		queryKey: ["allVehicles", searchQuery],
		queryFn: () => fetchVehicles(searchQuery, user.token, true),
		enabled: enableVehicleFetch,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
		retry: false
	});

	const vehicles = updatedVehicles || initVehicles;

	const openVehicleCreateModal = (updateId, defaultValues) => {

		openModal({
			title: `${updateId ? "Update" : "Create New"} Vehicle`,
			styles: () => ({
				title: {
					fontSize: "24px",
					fontWeight: "bold",
				},
			}),
			size: "lg",
			centered: true,
			children: (
				<VehicleCreateModal 
					updateId={updateId}
					defaultValues={defaultValues}
					refetchVehicles={refetch}
				/>
			),
		});
	}

	const openVehicleDetailsModal = (vehicle) => {

		openModal({
			title: `${vehicle.make}, ${vehicle.model}, ${vehicle.year}`,
			styles: () => ({
				title: {
					fontSize: "24px",
					fontWeight: "bold",
				},
			}),
			size: "lg",
			centered: true,
			children: (
				<VehicleDetailsModal 
					vehicle={vehicle} 
					token={user.token} 
					refetchVehicles={refetch} 
					openVehicleUpdateModal={openVehicleCreateModal}
				/>
			),
		});
	}

	if (error) {
		showNotification({
			title: "Something went wrong!",
			message: "Please try again later",
			color: "red"
		});
	}

	return (
		<Container size="xl">
			<div className="flex justify-between bg-slate-900 mb-5 mt-12 p-5 rounded-md">
				<h1 className="text-white font-bold text-2xl">
					Browse Vehicles
				</h1>
				<Button
					onClick={() => openVehicleCreateModal(null, null)}
					type="button"
					className="bg-green-500 text-white font-bold hover:bg-green-600"
				>
					Add Vehicle
				</Button>
			</div>
			{
				isArrayAndHasContent(vehicles) ?
					<SimpleGrid
						cols={4}
						breakpoints={[
							{ maxWidth: "md", cols: 3, spacing: "md" },
							{ maxWidth: "sm", cols: 2, spacing: "sm" }
						]}
					>
						{
							vehicles.map(vehicle => (
								<VehicleCard
									key={vehicle._id}
									make={vehicle.make}
									model={vehicle.model}
									year={vehicle.year}
									color={vehicle.color}
									image={vehicle.img_url}
									price={vehicle.price}
									status={vehicle.status}
									onClick={() => openVehicleDetailsModal(vehicle)}
								/>
							))
						}
					</SimpleGrid> :
					<div className="mt-10">
						<NoVehicleFound />
					</div>
			}
		</Container>
	);
}

export const getServerSideProps = async ({ req, res }) => {

	try {
		const token = getCookie("token", { req, res });

		const vehicles = await fetchVehicles(null, token, true);

		return {
			props: {
				vehicles,
				protectedRoute: true,
			},
		};
	} catch (error) {
		console.log(error);

		return {
			props: {
				vehicles: [],
				protectedRoute: true,
				error: true,
			},
		};
	}
}

export default Home;
