import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {useWordList} from "../useWordList";
import {frequencyByOccurrences, frequencyByPresence} from "../functions/dataMapper";
import {useState} from "react";

export const LettersHistogram = () => {
    const words = useWordList();
    const fiveLetterWords = words.filter(w => w.length === 5);
    const [sortKey, setSortKey] = useState('5lw');
    const studies = {
        occurrence: frequencyByOccurrences,
        presence: frequencyByPresence
    };
    const [study, setStudy] = useState<keyof typeof studies>('presence');

    function formatData(words: string[]) {
        let studyToUse = studies[study];
        const allWordsHistogram = studyToUse(words);
        const fiveLetterWordsHistogram = studyToUse(fiveLetterWords);

        return Object.entries(allWordsHistogram).map(eachEntry => {
            const [letter, frequency] = eachEntry;
            return {
                name: letter,
                ['all']: frequency
            }
        })
            .reduce((prev, curr) => {
                const appended = {
                    ...curr,
                    '5lw': fiveLetterWordsHistogram[curr.name] || 0
                }
                return [...prev, appended]
            }, [] as any).sort((a: any, b: any) => b[sortKey] as number - (a[sortKey] as number));
    }

    const data = formatData(words);
    return (<>
        <form onChange={val => {
            setStudy((val.target as any).value);
        }}>
            <input type="radio" id="presence" name="study" value="presence" checked={study === 'presence'}/>
            <label htmlFor="presence">Presence in words</label>
            <input type="radio" id="occurrence" name="study" value="occurrence" checked={study === 'occurrence'}/>
            <label htmlFor="occurrence">Occurrences in words</label>
        </form>

        <form onChange={val => {
            setSortKey((val.target as any).value);
        }}>
            <input type="radio" id="all" name="sortBy" value="all" checked={sortKey === 'all'}/>
            <label htmlFor="all">All Words</label>
            <input type="radio" id="5lw" name="sortBy" value="5lw" checked={sortKey === '5lw'}/>
            <label htmlFor="5lw">Five Letter Words</label>
        </form>

        <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="all" fill="#8884d8"/>
            <Bar dataKey="5lw" fill="#82ca9d"/>
        </BarChart></>)
}
