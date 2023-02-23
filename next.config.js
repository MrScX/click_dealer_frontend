/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: [
			"d1th8ghf625mqw.cloudfront.net"
		],
	}
};

module.exports = nextConfig;
