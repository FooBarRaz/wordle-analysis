import React from 'react';
import './App.css';
import {useWordList} from "./useWordList";
import { LettersHistogram } from './charts/LettersHistogram';
import {BestWords} from "./charts/BestWords";

function App() {
  return (
    <div className="App">
        <LettersHistogram />
        <BestWords />
    </div>
  );
}

export default App;
