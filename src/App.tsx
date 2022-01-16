import React from 'react';
import './App.css';
import {LetterFrequencyChart} from './charts/LetterFrequencyChart';
import {Link, Route, Routes} from "react-router-dom";
import {BestWords} from "./charts/BestWords";

function App() {
  return (
    <div className="App">
        <h1>Wordle Analysis</h1>
        <nav>
            <Link to="/charts">Charts</Link>
            <br/>
            <Link to="/best-words">Best Words</Link>
            <br/>
            <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a>
        </nav>

        <Routes>
            <Route path="/charts" element={<LetterFrequencyChart />} />
            <Route path="/best-words" element={<BestWords />} />
        </Routes>
    </div>
  );
}

export default App;
