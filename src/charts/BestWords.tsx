import {useWordList} from "../useWordList";
import {frequencyByOccurrences, onlyUnique, wordScoreWeighted} from "../functions/dataMapper";
import {useEffect, useState} from "react";

export const BestWords = () => {
    const fiveLetterWords = useWordList().filter(word => word.length === 5);
    const [blacklist, setBlacklist] = useState<string[]>([]);
    const [wordsWithWeightedScores, setWords] = useState<{ word: string, score: number }[]>([]);
    const frequenciesByOccurrence = (frequencyByOccurrences(fiveLetterWords));

    useEffect(() => {
        const result = fiveLetterWords.map(eachWord => {
            const filteredFrequencyList = Object.keys(frequenciesByOccurrence)
                .filter(letter => !blacklist.includes(letter))
                .reduce((prev, curr) => ({
                    ...prev, [curr]: frequenciesByOccurrence[curr]
                }), {})
            const score = wordScoreWeighted(eachWord, filteredFrequencyList);
            return {word: eachWord, score}
        })
            .filter(words => words.word.split('').filter(onlyUnique).length === words.word.length)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);

        setWords(result);

    }, [blacklist,fiveLetterWords, frequenciesByOccurrence]);


    return <>
        <h3>Best words</h3>
        <label htmlFor="blacklist">Exclude letters (comma separated)</label>
        <br/>
        <input type="text" name="blacklist" onChange={(e) => {
            const letters = e.target.value;
            let strings = letters.split(',');
            setBlacklist(strings)
        }}/>
        <ul>
            {wordsWithWeightedScores.map(eachWord => (<li>{eachWord.word}: {eachWord.score}</li>))}
        </ul>
    </>
}
