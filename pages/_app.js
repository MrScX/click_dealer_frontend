import { Fragment, useContext } from "react";
import { Flex, Loader, MantineProvider } from "@mantine/core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";

import Layout from "components/Layout/Layout";

import { ModalsProvider } from "@mantine/modals";
import { AuthContext, AuthContextProvider } from "context/auth-context";
import { NotificationsProvider } from "@mantine/notifications";
import SpotLightSearch from "components/SpotLightSearch/SpotLightSearch";

import "../styles/globals.css";
import "../styles/nprogress.scss";

NProgress.configure({
	minimum: 0.3,
	easing: "ease",
	speed: 800,
	showSpinner: false
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const queryClient = new QueryClient();

const WrappedComponent = ({ Component, pageProps }) => {

	const { protectedRoute, onlyLoggedOut } = pageProps;
	const { appLoaded, isLoggedIn } = useContext(AuthContext);

	if (!appLoaded) {
		return (
			<Flex justify="center" align="center" h="300px">
				<Loader />
			</Flex>
		);
	}

	if (protectedRoute && !isLoggedIn) {
		Router.push("/sign-in");
		return null;
	}

	if (onlyLoggedOut && isLoggedIn) {
		Router.push("/");
		return null;
	}

	return <Component {...pageProps} />;
}

const ClickDealerApp = ({ Component, pageProps }) => {

	return (
		<Fragment>
			<Head>
				<title>Click Dealer</title>
			</Head>

			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<MantineProvider
					theme={{
						fontFamily: "Lato, sans-serif",
						colorScheme: "light",
					}}
				>
					<AuthContextProvider>
						<NotificationsProvider position="top-right">
							<ModalsProvider>
								<SpotLightSearch>
									<Layout>
										<WrappedComponent
											Component={Component}
											pageProps={pageProps}
										/>
									</Layout>
								</SpotLightSearch>
							</ModalsProvider>
						</NotificationsProvider>
					</AuthContextProvider>
				</MantineProvider>
			</QueryClientProvider>
		</Fragment>
	);
}

export default ClickDealerApp;