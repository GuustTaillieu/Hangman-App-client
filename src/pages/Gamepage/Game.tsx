import React from 'react';
import StageImage from './StageImage';
import Word from './Word';
import Letters from './Letters';
import { game, userData } from '@/hooks/states';

export const Game = () => {
	return (
		<>
			<StageImage />
			<Word />
			<Letters />
		</>
	);
};

export const GameWaiting = () => {
	const isOwnWord = React.useMemo(() => {
		const currentWord = game.value?.currentWord;
		if (!currentWord) return false;
		return currentWord.owner.id === userData.value?.userId;
	}, [game.value]);

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

	const isFinishedRound = () =>
		finshedRound ? (
			<h2 className='text-4xl font-medium text-center'>
				Waiting for the other players to finish the round...
			</h2>
		) : null;

	return isOwnWord ? (
		<h2 className='text-4xl font-medium text-center'>
			Waiting for the other players to guess your word...
		</h2>
	) : (
		isFinishedRound()
	);
};
