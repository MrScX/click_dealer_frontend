import { Button, Grid, Text } from "@mantine/core";
import { closeAllModals, openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { deleteVehicle } from "api/vehicles";
import { useState } from "react";
import { vehicleStatus } from "utils/consts";

const VehicleDetailsModal = ({ vehicle, token, refetchVehicles, openVehicleUpdateModal }) => {

	const [deleteingVehicle, setDeleteingVehicle] = useState(false);

	const openDeleteModal = () => {
		openConfirmModal({
			title: "Are you sure?",
			children: (
				<Text size="sm">
					You are about to delete this vehicle. This action cannot be undone.
				</Text>
			),
			confirmProps: {
				loading: deleteingVehicle, 
				disabled: deleteingVehicle ,
				className: "bg-red-500 hover:bg-red-600"
			},
			cancelProps: {
				loading: deleteingVehicle, 
				disabled: deleteingVehicle 
			},
			labels: { 
				confirm: "Confirm", 
				cancel: "Cancel", 
			},
			onCancel: () => closeAllModals(),
			onConfirm: async () => {

				setDeleteingVehicle(true);

				try {
					
					await deleteVehicle(vehicle._id, token, false);

					showNotification({
						title: "Vehicle deleted!",
						message: "The vehicle has been deleted successfully",
						color: "green"
					});
					
					refetchVehicles();
					closeAllModals();

				} catch (error) {
					console.log(error);
				}

				setDeleteingVehicle(false);
			},
		});
	}
	
	return (
		<div>
			<Grid>
				<Grid.Col lg={6} md={12}>
					<img className="w-full rounded" src={vehicle.img_url} />
				</Grid.Col>
				<Grid.Col lg={6} md={12}>
					<h2 className="font-bold text-xl mb-5">
						Details
					</h2>
					<p className="mb-2">
						Make: {vehicle.make}
					</p>
					<p className="mb-2">
						Model: {vehicle.model}
					</p>
					<p className="mb-2">
						Year: {vehicle.year}
					</p>
					<p className="mb-2">
						Color: {vehicle.color}
					</p>
					<p className="mb-2">
						Description: {vehicle.description}
					</p>
					<p className="mb-2">
						Price: {vehicle.price}
					</p>
					<p className="mb-2">
						Status: {vehicle.status === vehicleStatus.DISCONTINUED ? "Discontinued" : "Available"}
					</p>
					<p className="mb-2">
						Registration: {vehicle.registration}
					</p>
					<p className="mb-2">
						Registration Date: {new Date(vehicle.registration_date).toLocaleDateString()}
					</p>
				</Grid.Col>
			</Grid>
			<Grid mt={15}>
				<Grid.Col lg={6} md={12}>
					<Button
						fullWidth
						loading={deleteingVehicle}
						disabled={deleteingVehicle}
						type="button"
						className="bg-slate-700 text-white font-bold hover:bg-slate-600"
						onClick={() => openVehicleUpdateModal(
							vehicle._id,
							{
								make: vehicle.make,
								model: vehicle.model,
								year: vehicle.year,
								color: vehicle.color,
								description: vehicle.description,
								price: vehicle.price,
								status: vehicle.status,
								registration: vehicle.registration,
								registration_date: vehicle.registration_date,
								img_url: vehicle.img_url
							}
						)}
					>
						Edit
					</Button>
				</Grid.Col>
				<Grid.Col lg={6} md={12}>
					<Button
						fullWidth
						loading={deleteingVehicle}
						disabled={deleteingVehicle}
						type="button"
						color="red"
						variant="outline"
						onClick={openDeleteModal}
					>
						Delete
					</Button>
				</Grid.Col>
			</Grid>
		</div>
	);
}

export default VehicleDetailsModal;