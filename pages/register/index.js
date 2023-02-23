import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { showNotification } from "@mantine/notifications";
import Link from "next/link";
import axios from "utils/axiosInstance";
import * as yup from "yup";

import { handleResponseError } from "utils/utils";

const TypeSchema = yup.object().shape({
	name: yup.string().min(2, "Min 2 characters").required("Name is required"),
	email: yup.string().email("Invalid Email").required("Email is required"),
	password: yup.string().min(6, "Password must be at least 6 characters long").required("Password is required!"),
	re_password: yup.string().oneOf([yup.ref("password"), null], "Passwords must match!").required("Re-Password is required!")
});

const Register = () => {

	const router = useRouter();

	const isMobile = useMediaQuery("(max-width: 540px)", true, { getInitialValueInEffect: false });
	const inputSize = isMobile ? "md" : "lg";

	const { register, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } = useForm({
		resolver: yupResolver(TypeSchema),
		mode: "onBlur"
	});

	const handleRegistration = async (values) => {

		try {

			await axios.post("/auth/register", values);

			showNotification({
				title: "Success!",
				message: "Registration successful!",
				color: "green"
			});

			reset();
			router.push("/sign-in");

		} catch (err) {
			handleResponseError(err);
		}
	}

	return (
		<div className="pt-20 pl-8 pr-8 flex flex-col items-center justify-center sm:pt-24 sm:pl-0 sm:pr-0">
			<div className="w-full sm:w-2/5">
				<div>
					<h1 className="font-bold text-3xl">
						Join to start your journey
					</h1>
					<p className="text-gray-500">
						Get started with a free account
					</p>
				</div>

				<form onSubmit={handleSubmit(handleRegistration)}>
					<Stack mt={20}>
						<div className="accounts-input">
							<TextInput
								size={inputSize}
								placeholder="Your name"
								{...register("name")}
							/>
							<p>
								{errors.name?.message}
							</p>
						</div>
						<div className="accounts-input">
							<TextInput
								size={inputSize}
								type="email"
								placeholder="Your email"
								{...register("email")}
							/>
							<p>
								{errors.email?.message}
							</p>
						</div>
						<div className="accounts-input">
							<PasswordInput
								size={inputSize}
								placeholder="Your password"
								{...register("password")}
							/>
							<p>
								{errors.password?.message}
							</p>
						</div>
						<div className="accounts-input">
							<PasswordInput
								size={inputSize}
								placeholder="Re-Type Password"
								{...register("re_password")}
							/>
							<p>
								{errors.re_password?.message}
							</p>
						</div>
						<p className="text-xs text-gray-400 text-center [word-spacing: 2px]">
							By logging in you agree to our {" "}
							<Link href="/terms">
								<a className="no-underline transition-all duration-200 text-sky-500 font-bold hover:text-sky-600">
									Terms of Use
								</a>
							</Link>
							{""} and have read and understood our {""}
							<Link href="/privacy">
								<a className="no-underline transition-all duration-200 text-sky-500 font-bold hover:text-sky-600">
									Privacy Policy
								</a>
							</Link>
						</p>
						<Button
							type="submit"
							className="bg-gray-800 hover:bg-gray-900"
							size={inputSize}
							loading={isSubmitting}
							disabled={!isValid || isSubmitting}
						>
							Register
						</Button>
						<p className="text-sm">
							Already have an account? {" "}
							<Link href="/sign-in">
								<a className="no-underline transition-all duration-200 text-sky-500 font-bold hover:text-sky-600">
								Sign In
								</a>
							</Link>
						</p>
					</Stack>
				</form>
			</div>
		</div>
	);
}

export const getStaticProps = async () => {
	return {
		props: {
			onlyLoggedOut: true
		}
	}
}

export default Register;