import { useRouter } from "next/router";
import { closeSpotlight, SpotlightProvider } from "@mantine/spotlight";

import { IconSearch } from "@tabler/icons";

const SpotLightSearch = ({ children }) => {

	const router = useRouter();

	const handleSearch = (event) => {
		if (event.key === "Enter" && event.target.value !== "") {
			router.push(`/?search_key=${event.target.value}`);
			closeSpotlight();
		}
	}

	return (
		<SpotlightProvider
			actions={[]}
			onKeyDown={handleSearch}
			searchIcon={<IconSearch size={18} />}
			searchPlaceholder="Search..."
		>
			{children}
		</SpotlightProvider>
	);
}

export default SpotLightSearch;