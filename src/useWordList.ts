import {useEffect, useState} from "react";

export const useWordList = () => {
    const [words, setWords] = useState<string[]>([])


    useEffect(() => {
        fetch('./words.txt')
            .then(r => r.text())
            .then(t => setWords(t.split('\n')))
    }, [])

    return words;
}
