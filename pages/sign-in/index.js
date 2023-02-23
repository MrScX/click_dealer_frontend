import { useContext } from "react";
import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { showNotification } from "@mantine/notifications";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import axios from "utils/axiosInstance";
import * as yup from "yup";

import { AuthContext } from "context/auth-context";
import { handleResponseError } from "utils/utils";

const TypeSchema = yup.object().shape({
	email: yup.string().email("Invalid Email").required("Email is required"),
	password: yup.string().min(6, "Password must be at least 6 characters long").required("Password is required!"),
});

const SignIn = () => {

	const isMobile = useMediaQuery("(max-width: 540px)", true, { getInitialValueInEffect: false });
	const inputSize = isMobile ? "md" : "lg";

	const { login } = useContext(AuthContext);

	const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm({
		resolver: yupResolver(TypeSchema),
		mode: "onBlur"
	});

	const handleSignIn = async (values) => {

		try {

			const { data } = await axios.post(
				"/auth/login",
				{
					email: values.email,
					password: values.password
				}
			);

			login(data.user, "/");

			showNotification({
				title: "Successfully Signed In",
				message: `Welcome back ${data.data.payload.name}!`,
				color: "green"
			});

		} catch (err) {
			handleResponseError(err);
		}
	}

	return (
		<div className="pt-20 pl-8 pr-8 flex flex-col items-center justify-center sm:pt-24 sm:pl-0 sm:pr-0">
			<div className="w-full sm:w-2/5">
				<div>
					<h1 className="font-bold text-3xl">
						Welcome Back 👋
					</h1>
					<p className="text-gray-500">
						Sign in to manage your dealership
					</p>
				</div>

				<form onSubmit={handleSubmit(handleSignIn)}>
					<Stack mt={20}>
						<div className="accounts-input">
							<TextInput
								size={inputSize}
								placeholder="Enter your email"
								{...register("email")}
							/>
							<p>
								{errors.email?.message}
							</p>
						</div>
						<div className="accounts-input">
							<PasswordInput
								size={inputSize}
								placeholder="Enter your password"
								{...register("password")}
							/>
							<p>
								{errors.password?.message}
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
							size={inputSize}
							className="bg-gray-800 hover:bg-gray-900"
							loading={isSubmitting}
							disabled={!isValid || isSubmitting}
						>
							Sign In
						</Button>
						<p className="text-sm">
							Don't have an account? {" "}
							<Link href="/register">
								<a className="no-underline transition-all duration-200 text-sky-500 font-bold hover:text-sky-600">
									Register
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

export default SignIn;