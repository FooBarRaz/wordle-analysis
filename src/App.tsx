import React from 'react';
import './App.css';
import {useWordList} from "./useWordList";
import { LettersHistogram } from './charts/LettersHistogram';

function App() {
  return (
    <div className="App">
        <LettersHistogram />
    </div>
  );
}

export default App;
