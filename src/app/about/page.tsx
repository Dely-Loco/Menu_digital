// src/app/about/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Houzze Tec',
  description: 'Conoce más sobre Houzze Tec, nuestra misión, visión y el equipo detrás de nuestra innovación tecnológica.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12 md:py-16">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Sobre <span className="text-gradient-houzze">Houzze Tec</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Innovando para tu futuro tecnológico. Descubre quiénes somos y qué nos impulsa.
          </p>
        </header>

        <section className="mb-12 md:mb-16 p-6 md:p-8 bg-white shadow-xl rounded-2xl border border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Nuestra Misión</h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center max-w-2xl mx-auto">
            {/* MODIFICA ESTE TEXTO */}
            En Houzze Tec, nuestra misión es acercar la tecnología más avanzada e innovadora a tu vida diaria,
            ofreciendo productos de vanguardia que combinan diseño, funcionalidad y una experiencia de usuario excepcional.
            Buscamos ser tu aliado tecnológico, facilitando tu conexión con el futuro.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="p-6 md:p-8 bg-white shadow-xl rounded-2xl border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Nuestra Visión</h2>
            <p className="text-gray-700 leading-relaxed">
              {/* MODIFICA ESTE TEXTO */}
              Ser la tienda de tecnología líder en innovación y confianza en Colombia, reconocida por nuestra
              curada selección de productos, nuestro compromiso con la calidad y un servicio al cliente
              que supere todas las expectativas. Queremos inspirar y potenciar a nuestros clientes a través de la tecnología.
            </p>
          </div>
          <div className="p-6 md:p-8 bg-white shadow-xl rounded-2xl border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Por Qué Elegirnos</h2>
            <ul className="space-y-3 text-gray-700 leading-relaxed">
              {/* MODIFICA ESTOS PUNTOS */}
              <li className="flex items-start">
                <span className="text-orange-500 font-bold mr-2 mt-1">✓</span> 
                <span>Productos innovadores y de alta calidad cuidadosamente seleccionados.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 font-bold mr-2 mt-1">✓</span> 
                <span>Atención al cliente personalizada y experta.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 font-bold mr-2 mt-1">✓</span> 
                <span>Compromiso con la satisfacción y la confianza de nuestros clientes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 font-bold mr-2 mt-1">✓</span> 
                <span>Precios competitivos y promociones atractivas.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Sección Opcional: Nuestro Equipo (puedes descomentar y personalizar si lo deseas) */}
        {/* <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Nuestro Equipo</h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Detrás de Houzze Tec hay un equipo apasionado por la tecnología y dedicado a brindarte la mejor experiencia.
          </p>
          {/* Aquí podrías añadir fotos y descripciones del equipo si lo tienes */}
        {/* </section> */}

      </main>
    </div>
  );
}