import Link from "next/link";
import { 
	IconBrandDribbble, 
	IconBrandFacebook, 
	IconBrandGithub, 
	IconBrandInstagram, 
	IconBrandTwitter 
} from "@tabler/icons";

const Footer = () => {

	return (
		<footer className="bg-white">
			<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
				<p className="text-center mt-8 border-t border-gray-100 pt-8 text-gray-600 mb-6">
					Find Us On Social Media
				</p>
				<ul className="col-span-2 flex justify-center gap-6 lg:col-span-5">
					<li>
						<a
							href="/"
							rel="noreferrer"
							target="_blank"
							className="text-gray-700 transition hover:opacity-75"
						>
							<span className="sr-only">Facebook</span>
							<IconBrandFacebook />
						</a>
					</li>

					<li>
						<a
							href="/"
							rel="noreferrer"
							target="_blank"
							className="text-gray-700 transition hover:opacity-75"
						>
							<span className="sr-only">Instagram</span>
							<IconBrandInstagram />
						</a>
					</li>

					<li>
						<a
							href="/"
							rel="noreferrer"
							target="_blank"
							className="text-gray-700 transition hover:opacity-75"
						>
							<span className="sr-only">Twitter</span>
							<IconBrandTwitter />
						</a>
					</li>

					<li>
						<a
							href="/"
							rel="noreferrer"
							target="_blank"
							className="text-gray-700 transition hover:opacity-75"
						>
							<span className="sr-only">GitHub</span>
							<IconBrandGithub />
						</a>
					</li>

					<li>
						<a
							href="/"
							rel="noreferrer"
							target="_blank"
							className="text-gray-700 transition hover:opacity-75"
						>
							<span className="sr-only">Dribbble</span>
							<IconBrandDribbble />
						</a>
					</li>
				</ul>

				<div className="mt-8 border-t border-gray-100 pt-8">
					<div className="sm:flex sm:justify-between">
						<p className="text-xs text-gray-500">
							&copy; {new Date().getFullYear()}, click-dealer.mrscx.com. All rights reserved.
						</p>

						<nav className="mt-8 sm:mt-0">
							<ul className="flex flex-wrap justify-start gap-4 text-xs lg:justify-end">
								<li>
									<Link href="/terms">
										<a className="text-gray-500 transition hover:opacity-75">
											Terms & Conditions
										</a>
									</Link>
								</li>

								<li>
									<Link href="/privacy">
										<a className="text-gray-500 transition hover:opacity-75">
											Privacy Policy
										</a>
									</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;