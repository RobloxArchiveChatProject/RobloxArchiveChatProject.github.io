/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		loader: "akamai",
		path: "https://robloxarchivechatproject.github.io",
	},
};

module.exports = nextConfig;
