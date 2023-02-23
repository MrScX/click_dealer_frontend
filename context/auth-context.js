import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import axios from "utils/axiosInstance";

export const AuthContext = createContext({
	isLoggedIn: false,
	appLoaded: false,
	user: null,
	login: (user, redirect) => {},
	logout: (redirect) => {}
});

export const AuthContextProvider = (props) => {

	const history = useRouter();

	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [appLoaded, setAppLoaded] = useState(false);

	const authenticate = async () => {

		try {

			const user = JSON.parse(localStorage.getItem("user"));

			if (user && user.token) {

				const { data } = await axios.post(
					"/auth/authenticate", null,
					{ headers: { Authorization: `Bearer ${user.token}` } }
				);

				setAppLoaded(true);
				return login({ ...data.user, token: user.token });
			}

			clearAuthState();
			setAppLoaded(true);

		} catch (err) {
			console.log(err);
			setAppLoaded(true);

			if (err.response) {

				const { status } = err.response;

				if ([404, 401, 500].includes(status)) {
					clearAuthState();
					return history.push("/");
				}
			}
		}
	}

	useEffect(() => {
		authenticate();
	}, []);

	const clearAuthState = () => {
		localStorage.removeItem("user");
		setUser(null);
		setIsLoggedIn(false);
	}

	const login = (user, redirect) => {
		localStorage.setItem("user", JSON.stringify(user));
		setUser(user);
		setIsLoggedIn(true);
		setCookie("token", user.token, {
			maxAge:  30 * 24 * 60 * 60
		});

		if (redirect) {
			history.push(redirect);
		}
	}

	const logout = (redirect = "/") => {
		clearAuthState();
		history.push(redirect);
	}

	return (
		<AuthContext.Provider
			value={{
				appLoaded,
				isLoggedIn,
				user,
				login,
				logout
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
