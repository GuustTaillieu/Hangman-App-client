import { game, userData } from '@/hooks/states';
import { useSignalEffect } from '@preact/signals-react';
import React from 'react';

const Word = () => {
	const [word, setWord] = React.useState<string[]>([]);

	useSignalEffect(() => {
		const playerId = userData.value?.userId;
		const currentWord = game.value?.currentWord;
		if (!game.value || !playerId || !currentWord) return;
		const wordState = currentWord.word.split('').map(() => '_');
		const guessedLettersState = currentWord.guesses[playerId];
		if (guessedLettersState) {
			currentWord.word.split('').forEach((letter, index) => {
				if (guessedLettersState.includes(letter)) {
					wordState[index] = letter;
				}
			});
		}
		setWord(wordState);
	});

	return (
		<div className='flex flex-row flex-wrap gap-4'>
			{word.map((letter, index) => {
				return letter == '_' ? (
					<div
						className='w-12 h-12 border-b-2 border-blue-500'
						key={index}></div>
				) : (
					<div
						className='w-12 h-12 border-b-2 border-blue-500 flex items-center justify-center text-2xl'
						key={index}>
						{letter.toUpperCase()}
					</div>
				);
			})}
		</div>
	);
};

export default Word;
