import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

class ClickDealerDocument extends Document {

	static getInitialProps = getInitialProps;

	render() {

		return (
			<Html lang="en">
				<Head>
					<meta charSet="utf-8" />
					<meta name="description" content="Click Dealer - Vehicle Management Portal" />
					<meta property="og:title" content="Click Dealer" />
					<meta property="og:description" content="Click Dealer - Vehicle Management Portal" />
					<meta property="og:site_name" content="Click Dealer" />
					<meta property="og:url" content="https://click-dealer.mrscx.me" />
					<meta property="og:type" content="website" />

					<meta name="apple-mobile-web-app-capable" content="yes" />

					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="default"
					/>

					<meta
						name="apple-mobile-web-app-title"
						content="Click Dealer"
					/>

					<meta name="format-detection" content="telephone=no" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="theme-color" content="#ffffff" />

					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
					<link rel="manifest" href="/manifest.json" />

					<link rel="canonical" href="https://click-dealer.mrscx.me" />

					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
					<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default ClickDealerDocument;
