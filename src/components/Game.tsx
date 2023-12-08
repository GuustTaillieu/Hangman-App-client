import React from 'react';
import StageImage from './StageImage';
import Word from './Word';
import Letters from './Letters';
import { game, userData } from '@/hooks/states';

type Props = {};

export const Game = (props: Props) => {
	return (
		<>
			<StageImage />
			<Word />
			<Letters />
		</>
	);
};

export const GameWaiting = () => {
	const finshedRound = React.useMemo(() => {
		const userTest = userData.value;
		const gameTest = game.value;

		if (!userTest || !gameTest) return false;

		const playerStatus = gameTest.players.find(
			(player) => player.id === userTest.userId
		);
		const currentWord = gameTest.currentWord;

		if (!playerStatus || !currentWord) return false;

		const guessedTheWord = currentWord.word.split('').every((letter) => {
			return currentWord.guesses[playerStatus.id].includes(letter);
		});

		return playerStatus.wrongGuesses === 10 || guessedTheWord;
	}, [game.value]);

	return finshedRound ? (
		<h2 className='text-4xl font-medium text-center'>
			Waiting for the other players to finish the round...
		</h2>
	) : (
		<h2 className='text-4xl font-medium text-center'>
			Waiting for the other players to guess your word...
		</h2>
	);
};
