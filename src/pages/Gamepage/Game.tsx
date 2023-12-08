import React from 'react';
import StageImage from './StageImage';
import Word from './Word';
import Letters from './Letters';
import { game, userData } from '@/hooks/states';
import GuessingWordOf from './GuessingWordOf';

const MAX_GUESSES = 10;

export const Game = () => {
	return (
		<>
			<GuessingWordOf />
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
	}, [game.value, userData.value]);

	const finishedRound = React.useMemo(() => {
		const userTest = userData.value;
		const gameTest = game.value;
		console.log(userTest, gameTest);

		if (!userTest || !gameTest) return false;

		const playerStatus = gameTest.players.find(
			(player) => player.id === userTest.userId
		);
		const currentWord = gameTest.currentWord;
		if (!playerStatus || !currentWord) return false;

		const guessedTheWord = currentWord.word.split('').every((letter) => {
			return currentWord.guesses[playerStatus.id].includes(letter);
		});

		console.log(playerStatus.wrongGuesses);
		return playerStatus.wrongGuesses === MAX_GUESSES || guessedTheWord;
	}, [game.value, userData.value]);

	const isFinishedRound = React.useMemo(() => {
		return finishedRound ? (
			<h2 className='text-4xl font-medium text-center'>
				You are out of guesses
				<br />
				<span className='text-2xl'>
					Waiting for the other players to finish the round...
				</span>
			</h2>
		) : null;
	}, [finishedRound]);

	return isOwnWord ? (
		<h2 className='text-4xl font-medium text-center'>
			It's your word.
			<br />
			<span className='text-2xl'>
				Waiting for the other players to guess your word...
			</span>
		</h2>
	) : (
		isFinishedRound
	);
};
