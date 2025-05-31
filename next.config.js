/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... otras configuraciones que puedas tener ...
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '', // Déjalo vacío si usa el puerto estándar (443 para https)
        pathname: '/**', // Permite cualquier ruta dentro de ese hostname, ajusta si es necesario
      },
      // Puedes añadir más hostnames aquí si los necesitas, por ejemplo, 'images.unsplash.com'
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Si todavía usas imágenes de placeholder de aquí
        port: '',
        pathname: '/**',
      }
    ],
  },
};

module.exports = nextConfig;


