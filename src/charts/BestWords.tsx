import {frequencyByOccurrences, onlyUnique, wordScoreWeighted} from "../functions/dataMapper";
import {useEffect, useState} from "react";
import {isEqual} from 'lodash';
import {fiveLetterWords} from "../data/words";

export const BestWords = () => {
    const [blacklist, setBlacklist] = useState<string[]>([]);
    const [wordsWithWeightedScores, setWords] = useState<{ word: string, score: number }[]>([]);
    const frequenciesByOccurrence = frequencyByOccurrences(fiveLetterWords);

    useEffect(() => {
        const filteredFrequencyList = Object.keys(frequenciesByOccurrence)
            .filter(letter => !blacklist.includes(letter))
            .reduce((prev, curr) => ({
                ...prev, [curr]: frequenciesByOccurrence[curr]
            }), {})

        const result = fiveLetterWords.map(eachWord => {
            const score = wordScoreWeighted(eachWord, filteredFrequencyList);
            return {word: eachWord, score}
        })
            .filter(words => words.word.split('').filter(onlyUnique).length === words.word.length)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);

        setWords(result);

    }, [blacklist, frequenciesByOccurrence]);

    return <>
        <h3>Best words</h3>
        <label htmlFor="blacklist">Exclude letters (comma separated)</label>
        <br/>
        <input type="text" name="blacklist" onChange={(e) => {
            const letters = e.target.value;
            let strings = letters.split(',');
            if (!isEqual(strings, blacklist)) {
                setBlacklist(strings)
            }
        }}/>
        <ul style={{listStyle: 'none'}}>
            {wordsWithWeightedScores.map(eachWord => (<li>{eachWord.word}: {eachWord.score}</li>))}
        </ul>
    </>
}
