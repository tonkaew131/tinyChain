/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'promptpay.io',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
