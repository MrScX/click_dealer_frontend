import { useContext } from "react";
import { Button, Stack, TextInput, Select } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";
import { Controller, useForm } from "react-hook-form";
import { showNotification } from "@mantine/notifications";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "@mantine/dates";
import axios from "utils/axiosInstance";
import * as yup from "yup";

import DropZoneRenderer from "components/DropZoneRenderer/DropZoneRenderer";
import PreviewVehicleImage from "components/PreviewVehicleImage/PreviewVehicleImage";

import { AuthContext } from "context/auth-context";
import { handleResponseError } from "utils/utils";
import { vehicleStatus } from "utils/consts";
import s3Uploader from "utils/s3Uploader";

const VariantTypeSchema = yup.object().shape({
	make: yup.string().min(2, "Min 2 characters").required("Make is required"),
	model: yup.string().min(2, "Min 2 characters").required("Model is required"),
	year: yup.string().min(4, "Min 4 characters").required("Year is required"),
	color: yup.string().min(2, "Min 2 characters").required("Color is required"),
	price: yup.number().positive().typeError("Invalid Price").required("Price is required"),
	description: yup.string().min(2, "Min 2 characters").required("Description is required"),
	registration: yup.string().min(2, "Min 2 characters").required("Registration is required"),
	registration_date: yup.date().required("Registration Date is required"),
	status: yup.number().required("Status is required"),

	img_url_blob: yup.mixed().test("img_url_blob", "Image is required", function (value) {
		const { img_url } = this.parent;
		return value || img_url;
	}),

	img_url: yup.string().test("img_url", "Image is required", function (value) {
		const { img_url_blob } = this.parent;
		return value || img_url_blob;
	})
});

const VehicleCreateModal = ({ updateId, defaultValues, refetchVehicles }) => {

	const { user } = useContext(AuthContext);

	const { control, setValue, register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm({
		defaultValues: defaultValues ? 
			{ 
				...defaultValues, 
				registration_date: new Date(defaultValues.registration_date) 
			} : {},
		resolver: yupResolver(VariantTypeSchema),
		mode: "onBlur"
	});

	const handleVehicleImgDrop = (file) => {
		setValue("img_url_blob", file, { shouldValidate: true });
	}

	const onSubmit = async (values) => {

		try {

			const payload = { ...values };

			if (payload.img_url_blob) {

				const imgUrl = await s3Uploader(
					payload.img_url_blob.type,
					`${Math.round(Math.random() * 10000)}-${payload.img_url_blob.name}`,
					"vehicle-images",
					payload.img_url_blob,
					user.token
				);

				if (!imgUrl) {

					showNotification({
						title: "Oops!",
						message: "Something went wrong while uploading the vehicle image. Please try again.",
						color: "red"
					});

					return;
				}

				payload.img_url = imgUrl;
			}

			delete payload.cover_image_blob;

			if (updateId) {

				await axios.patch(
					`/vehicle/${updateId}`, payload,
					{ headers: { Authorization: `Bearer ${user.token}` } }
				);

			} else {

				await axios.post(
					"/vehicle/new", payload,
					{ headers: { Authorization: `Bearer ${user.token}` } }
				);
			}

			refetchVehicles();

			showNotification({
				title: "Success",
				message: `Product ${updateId ? "updated" : "created"} successfully`,
				color: "green"
			});

			closeAllModals();

		} catch (error) {
			handleResponseError(error);
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack>
					<div className="accounts-input">
						<TextInput
							{...register("make")}
							label="Make"
							placeholder="Enter vehicle make"
						/>
						{
							errors && errors.make &&
							<p>
								{errors.make.message}
							</p>
						}
					</div>
					<div className="accounts-input">
						<TextInput
							{...register("model")}
							label="Model"
							placeholder="Enter model"
						/>
						{
							errors && errors.model &&
							<p>
								{errors.model.message}
							</p>
						}
					</div>
					<div className="accounts-input">
						<TextInput
							{...register("year")}
							label="Year"
							placeholder="Ex: 2020"
						/>
						{
							errors && errors.year &&
							<p>
								{errors.year.message}
							</p>
						}
					</div>

					<div className="accounts-input">
						<TextInput
							{...register("color")}
							label="Color"
							placeholder="Ex: Red, Blue, Green"
						/>
						{
							errors && errors.color &&
							<p>
								{errors.color.message}
							</p>
						}
					</div>
					<div className="accounts-input">
						<TextInput
							{...register("description")}
							label="Description"
							placeholder="Enter vehicle description"
						/>
						{
							errors && errors.description &&
							<p>
								{errors.description.message}
							</p>
						}
					</div>

					<div className="accounts-input">
						<TextInput
							{...register("registration")}
							label="Registration"
							placeholder="Enter vehicle registration"
						/>
						{
							errors && errors.registration &&
							<p>
								{errors.registration.message}
							</p>
						}
					</div>

					<div className="accounts-input">
						<Controller
							name="registration_date"
							control={control}
							render={({ field }) => (
								<DatePicker
									{...field}
									minDate={new Date()}
									placeholder="Pick registration date"
									label="Registration Date"
								/>
							)}
						/>
						{
							errors && errors.registration_date &&
							<p>
								{errors.registration_date.message}
							</p>
						}
					</div>

					<div className="accounts-input">
						<TextInput
							{...register("price")}
							label="Price"
							placeholder="Enter vehicle price"
						/>
						{
							errors && errors.price &&
							<p>
								{errors.price.message}
							</p>
						}
					</div>

					<div className="accounts-input">
						<Controller
							name="status"
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									data={[
										{ label: "AVAILABLE", value: vehicleStatus.AVAILABLE },
										{ label: "DISCONTINUED", value: vehicleStatus.DISCONTINUED }
									]}
									label="Status"
									placeholder="Select vehicle status"
								/>
							)}
						/>
					</div>

					<Stack>
						<DropZoneRenderer
							title="Drag the image here or click to upload"
							onDrop={files => handleVehicleImgDrop(files[0])}
						/>
						<PreviewVehicleImage control={control} />
					</Stack>

					<Button
						type="submit"
						className="bg-gray-800 text-white hover:bg-gray-700"
						loading={isSubmitting}
						disabled={isSubmitting || !isValid}
					>
						{updateId ? "Update" : "Create"}
					</Button>
				</Stack>
			</form>
		</div>
	);
}

export default VehicleCreateModal;