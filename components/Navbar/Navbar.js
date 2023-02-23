import { useContext } from "react";
import { ActionIcon, Button, Group } from "@mantine/core";
import { openSpotlight } from "@mantine/spotlight";
import Link from "next/link";

import { AuthContext } from "context/auth-context";

import { IconSearch } from "@tabler/icons";

const Navbar = () => {

	const { isLoggedIn, logout } = useContext(AuthContext);

	return (
		<nav className="bg-white border-b-2">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="flex flex-1 items-stretch justify-start">
						<Link href="/">
							<a className="flex flex-shrink-0 items-center">
								<img 
									className="block h-8 w-auto lg:hidden" 
									src="https://www.clickdealer.co.uk/wp-content/uploads/2020/02/ClickDealer_Logo_Colour.png" 
									alt="Your Company" 
								/>
								<img 
									className="hidden h-8 w-auto lg:block" 
									src="https://www.clickdealer.co.uk/wp-content/uploads/2020/02/ClickDealer_Logo_Colour.png" 
									alt="Your Company" 
								/>
							</a>
						</Link>
					</div>
					
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						{
							isLoggedIn &&
							<ActionIcon
								title="Search Vehicles"
								mr="10px"
								variant="outline"
								size="lg"
								radius={20}
								onClick={openSpotlight}
							>
								<span className="sr-only">
									Search Vehicles
								</span>
								<IconSearch size={18} />
							</ActionIcon>
						}

						<div className="relative ml-3">
							{
								isLoggedIn ? 
								<Button
									type="button"
									color="dark"
									variant="outline"
									onClick={() => logout("/sign-in")}
								>
									Logout
								</Button> :
								<Group>
									<Button
										type="button"
										color="dark"
										variant="outline"
									>
										<Link href="/sign-in">
											Sign In
										</Link>
									</Button>
									<Button
										type="button"
										className="bg-gray-900 hover:bg-gray-800"
									>
										<Link href="/register">
											Register
										</Link>
									</Button>
								</Group>
							}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;