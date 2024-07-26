import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-darkblue text-gray-300 p-4 md:p-6 w-full">
      <div className="container mx-auto text-center">
        <p className="text-xs md:text-sm">
          &copy; {new Date().getFullYear()} Uriel_CoffeAndCode. Todos los derechos reservados.
        </p>
        <p className="mt-2 text-xs md:text-sm">
          Desarrollado por <span className="font-bold">Uriel Aguilar Mauricio</span> para Balon en el Cesto.
        </p>
        <p className="mt-2 text-xs md:text-sm">
          Contacto: <a href="mailto:aguilaruriel368@gmail.com" className="underline">aguilaruriel368@gmail.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;