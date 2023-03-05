import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import ChessBoard from './Components/Chessboard/ChessBoard';
function App() {

  return (
    <div id="App">
      <ChessBoard/>
    </div>
  
  );
}

export default App;
