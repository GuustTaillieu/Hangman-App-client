import { clientSender, game, userData } from '@/hooks/states';
import { useSignalEffect } from '@preact/signals-react';
import React from 'react';

type Props = {};

const Letters = (props: Props) => {
	const [guessedLetters, setGuessedLetters] = React.useState<string[]>([]);
	const noMoreGuesses = React.useRef(false);

	function checkIfOutOfGuesses(playerId: string) {
		const mistakes = game.value?.players.find(
			(player) => player.id === playerId
		)?.wrongGuesses;
		if (mistakes === 10) {
			noMoreGuesses.current = true;
		}
	}

	useSignalEffect(() => {
		const playerId = userData.value?.userId;
		const guessedLettersState = getGuessesForPlayer(playerId);
		if (!guessedLettersState) return;
		setGuessedLetters(guessedLettersState);
		checkIfOutOfGuesses(playerId);
	});

	function handleLetterClick(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		letter: string
	): void {
		clientSender.value?.guessLetter(letter);
	}

	return (
		<div className='flex flex-row flex-wrap justify-center gap-4 max-w-[30rem]'>
			{Array.from(Array(26).keys()).map((key) => {
				const letter = String.fromCharCode(key + 97);
				const guessed =
					guessedLetters.includes(letter) || noMoreGuesses.current;
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

function getGuessesForPlayer(playerId: string): string[] | undefined {
	const currentWordToGuess = game.value?.currentWord;
	if (!currentWordToGuess) return;
	const guessedLettersState = currentWordToGuess.guesses[playerId];
	return guessedLettersState;
}
