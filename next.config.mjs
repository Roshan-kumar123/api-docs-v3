/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            }
    ]}
};

/* It could also be achieved like this 
module.exports = {
    images: {
      domains: ['images.unsplash.com'],
    },
  };
*/  

export default nextConfig;
