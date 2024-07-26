import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="bg-lightblue w-full">
      <div className="container mx-auto flex justify-between items-center p-4 md:p-6">
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src="pelota-de-baloncesto.png" alt="Icono 1" className="h-10 md:h-16" />
          <span className="text-xl md:text-4xl font-bold text-green-800">U-BasketBoard</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
