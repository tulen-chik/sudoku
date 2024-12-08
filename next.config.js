// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/auth/login',
                permanent: true, // или false, если это временное перенаправление
            },
        ];
    },
};

module.exports = nextConfig;