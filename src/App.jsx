import React from 'react';
import ScoreboardController from './components/ScoreboardController';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Header/>
      <ScoreboardController/>
      <Footer/>
    </div>
  );
}

export default App;
