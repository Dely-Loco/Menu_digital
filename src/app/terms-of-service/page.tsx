// src/app/terms-of-service/page.tsx

// No necesitas "use client" aquí ya que es una página estática de contenido
// a menos que añadas interactividad como un botón que use hooks.
// Por ahora, la mantendré como Server Component.

import { Metadata } from 'next'; // Para los metadatos

export const metadata: Metadata = {
  title: 'Términos de Servicio | Houzze Tec',
  description: 'Lee nuestros términos y condiciones de servicio para Houzze Tec.',
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-12 space-y-8"> {/* Añadido padding responsivo */}
      <header className="text-center mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Términos de Servicio</h1>
        {/* Mostramos la fecha de última actualización de forma estática o puedes gestionarla de otra forma */}
        <p className="text-sm text-gray-500 mt-2">Última actualización: 1 de Junio, 2025</p> 
        {/* O si quieres que sea la fecha actual de renderizado (menos común para términos): */}
        {/* <p className="text-muted-foreground">Última actualización: {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</p> */}
      </header>
      
      <section className="space-y-3 pb-4 border-b border-gray-200"> {/* Añadido padding inferior y borde */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">1. Acuerdo de los Términos</h2>
        <p className="text-gray-700 leading-relaxed">
          Al utilizar nuestros servicios, usted acepta estar sujeto a estos Términos. Si no está de acuerdo con estos Términos, no utilice los servicios. Podemos modificar los Términos en cualquier momento, a nuestra entera discreción. Si lo hacemos, se lo haremos saber publicando los Términos modificados en el Sitio o mediante otras comunicaciones.
        </p>
      </section>

      <section className="space-y-3 pb-4 border-b border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">2. Uso de los Servicios</h2>
        <p className="text-gray-700 leading-relaxed">
          Puede utilizar los Servicios solo si tiene 18 años o más y no tiene prohibido el uso de los Servicios según la ley aplicable. Usted se compromete a no utilizar los Servicios para ningún propósito ilegal o no autorizado.
        </p>
      </section>
      
      <section className="space-y-3 pb-4 border-b border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">3. Cuentas</h2>
        <p className="text-gray-700 leading-relaxed">
          Cuando crea una cuenta con nosotros, debe proporcionarnos información precisa, completa y actualizada en todo momento. El incumplimiento de esta obligación constituye una violación de los Términos, lo que puede resultar en la terminación inmediata de su cuenta en nuestro Servicio.
        </p>
      </section>

      <section className="space-y-3 pb-4 border-b border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">4. Compras</h2>
        <p className="text-gray-700 leading-relaxed">
          {/* CORRECCIÓN AQUÍ */}
          Si desea comprar cualquier producto o servicio disponible a través del Servicio (&quot;Compra&quot;), es posible que se le solicite que proporcione cierta información relevante para su Compra, incluyendo, entre otros, el número de su tarjeta de crédito, la fecha de vencimiento de su tarjeta de crédito, su dirección de facturación y su información de envío.
        </p>
      </section>
      
      {/* Puedes añadir más secciones aquí según lo necesites: */}
      {/* Contenido, Propiedad Intelectual, Terminación, Descargo de Garantías, Limitación de Responsabilidad, Ley Aplicable, etc. */}

      <section className="space-y-3 pt-4"> {/* Añadido padding superior */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">5. Contáctanos</h2>
        <p className="text-gray-700 leading-relaxed">
          Si tiene alguna pregunta sobre estos Términos, por favor contáctenos en <a href="mailto:legal@houzzetec.com" className="text-orange-600 hover:underline">legal@houzzetec.com</a>.
        </p>
      </section>
      
      <footer className="mt-10 pt-8 border-t border-gray-300 text-center"> {/* Mejorado el footer de la página */}
        <p className="text-xs text-gray-500 max-w-xl mx-auto">
          Estos son términos de servicio de plantilla. Debe consultar con un profesional legal para asegurarse de que cumpla con sus necesidades específicas y con todas las leyes y regulaciones aplicables. Houzze Tec no se hace responsable del uso de esta plantilla sin la debida asesoría legal.
        </p>
      </footer>
    </div>
  );
}