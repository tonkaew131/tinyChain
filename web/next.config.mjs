/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'promptpay.io',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'media.tenor.com',
            },
            {
                protocol: 'https',
                hostname: 'akaracarbon.athichal.com',
            },
        ],
    },
};

export default nextConfig;
