import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";

const Layout = (prop) => {

	return (
		<div>
			<Navbar />

			<main>
				{prop.children}
			</main>

			<Footer />
		</div>
	);
}

export default Layout;