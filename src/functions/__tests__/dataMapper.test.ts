import {letterFrequency, totalLetters} from "../dataMapper";

describe('dataMapper functions', function () {
    let words: string[];

    beforeEach(function () {
        words = ['foo', 'bar', 'baz']
    });

    describe('letterFrequency', function () {
        describe('given an array of words', function () {
            it('should return an object with frequency of each letter', function () {
                const result = letterFrequency(words);

                expect(result['b']).toEqual(2/9);
                expect(result['f']).toEqual(1/9);
                expect(result['o']).toEqual(2/9);
                expect(result['r']).toEqual(1/9);
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
