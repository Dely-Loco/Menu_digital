"use client";
import { useState } from "react";
import Image from "next/image";

export default function PromoModal() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-2xl shadow-lg text-center max-w-sm w-full">
        {/* Botón X arriba a la derecha */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
          onClick={() => setShow(false)}
        >
          ✖
        </button>

        {/* Imagen de la Dely Negra */}
        <div className="mb-4">
          <Image
            src="/dely-negra.jpeg" // 👈 coloca tu imagen en /public
            alt="La Dely Negra"
            width={100}
            height={100}
            className="mx-auto rounded-full"
          />
        </div>

        {/* Texto */}
        <h2 className="text-xl font-bold mb-4">📸 ¡La Dely Negra te invita!</h2>
        <p className="mb-4">
          Tómate una foto, etiquétanos en Instagram y recibe un{" "}
          <b>cóctel gratis 🍹</b>.
        </p>
      </div>
    </div>
  );
}
