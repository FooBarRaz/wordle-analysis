import {frequencyByOccurrences, frequencyByPresence, totalLetters} from "../dataMapper";

describe('dataMapper functions', function () {
    let words: string[];

    beforeEach(function () {
        words = ['foo', 'bar', 'baz']
    });

    describe('frequency by occurrences', function () {
        describe('given an array of words', function () {
            it('should return an object with frequency of each letter', function () {
                const result = frequencyByOccurrences(words);

                expect(result['b']).toEqual(2/9);
                expect(result['f']).toEqual(1/9);
                expect(result['o']).toEqual(2/9);
                expect(result['r']).toEqual(1/9);
            });
        });
    });

    describe('frequency by presence', function () {
        describe('given an array of words', function () {
            it('should count the number of words the letter appears in', function () {
                const result = frequencyByPresence(words);

                expect(result['b']).toEqual(2/3);
                expect(result['f']).toEqual(1/3);
                expect(result['o']).toEqual(1/3);
                expect(result['r']).toEqual(1/3);
                expect(result['a']).toEqual(2/3);
            });
        });

    });

    describe('totalLetters', function () {
        it('should sum chars in word list', function () {
            const result = totalLetters(words);
            expect(result).toEqual(9);
        });

    });
});
