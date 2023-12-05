import { game, userData } from '@/hooks/states';
import { useSignalEffect } from '@preact/signals-react';
import React from 'react';

type Props = {};

const Letters = (props: Props) => {
	const [guessedLetters, setGuessedLetters] = React.useState<string[]>([]);

	useSignalEffect(() => {
		const playerId = userData.value?.userId;
		const currentWordToGuess = game.value?.currentWord;
		if (!currentWordToGuess || !playerId) return;
		const guessedLettersState = currentWordToGuess.guesses[playerId];
		if (!guessedLettersState) return;
		setGuessedLetters(guessedLettersState);
	});

	function handleLetterClick(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		letter: string
	): void {
		console.log(letter);
	}

	return (
		<div className='flex flex-row flex-wrap justify-center gap-4 max-w-[30rem]'>
			{/* GET THE ALFABETH AS ARRAY */}
			{Array.from(Array(26).keys()).map((key) => {
				const letter = String.fromCharCode(key + 97);
				const guessed = guessedLetters.includes(letter);
				return (
					<button
						disabled={guessed}
						onClick={(e) => handleLetterClick(e, letter)}
						className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-400 rounded-xl flex items-center justify-center text-2xl ${
							!guessed ? '' : 'opacity-30'
						}`}
						key={letter}>
						{letter.toUpperCase()}
					</button>
				);
			})}
		</div>
	);
};

export default Letters;
