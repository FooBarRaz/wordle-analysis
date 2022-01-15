export const letterFrequency = (words: string[]): Record<string, number> => {
    const charSum = totalLetters(words);

    let letterCounts = words.map(word => word.split(''))
        .reduce((prev, curr) => {
            curr.forEach(letter => prev[letter] = (prev[letter] || 0) + 1)
            return prev;
        }, {} as any);
    let map = Object.entries(letterCounts)
        .reduce((prev, curr) => {
            const [letter, count] = curr;
            prev[letter] = count as number / charSum;
            return prev;
        }, {} as any)
    return map;
}

export const totalLetters = (words: string[]) => {
    return words.map(word => word.length)
        .reduce((prev, curr) => prev + curr, 0)
}
