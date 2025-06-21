/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Common Next.js setting
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Standard Cloudinary hostname
        // port: '', // Not usually needed for Cloudinary
        // pathname: '/your-cloud-name/image/upload/**', // Optional: scope to your specific cloud name and path
      },
      // You can add other domains here if needed, e.g., for S3
      // {
      //   protocol: 'https',
      //   hostname: 'your-s3-bucket-name.s3.your-aws-region.amazonaws.com',
      // },
    ],
  },
  // Other Next.js configurations can go here
  // For example, if you need to set up environment variables publicly:
  // env: {
  //   NEXT_PUBLIC_CUSTOM_VAR: process.env.NEXT_PUBLIC_CUSTOM_VAR,
  // },
};

export default nextConfig;
