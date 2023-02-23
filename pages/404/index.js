import { Title, Text, Button, Container, Group } from "@mantine/core";
import { useRouter } from "next/router";

const NotFound = () => {

	const router = useRouter();

	const getBack = () => {
		router.push("/")
	}

	return (
		<Container className="pt-20 pb-25">
			<div className="text-center font-black text-20xl text-gray-200">
				404
			</div>
			
			<Title className="text-center font-black text-4xl">
				What were you looking for again?
			</Title>
			
			<Text 
				color="dimmed" 
				size="lg" 
				align="center" 
				className="mt-10 mb-10 w-2/3 mx-auto"
			>
				Unfortunately, your page was not found. You may have mistyped the address, or the page has
				been moved to another URL.
			</Text>

			<Group position="center">
				<Button 
					color="cyan"
					variant="subtle" 
					size="md" 
					onClick={getBack}
				>
					Take me back to home page
				</Button>
			</Group>
		</Container>
	);
}

export default NotFound;