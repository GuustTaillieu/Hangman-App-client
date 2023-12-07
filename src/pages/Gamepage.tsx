import React from 'react';
import StageImage from '../components/StageImage';
import Header from '../components/Header';
import Word from '../components/Word';
import Letters from '../components/Letters';
import ScreenComp from '../components/ScreenComp';
import { useSignalEffect } from '@preact/signals-react';
import { clientSender, game, stompClient, userData } from '@/hooks/states';
import { useRouter } from 'next/router';

type Props = {};

const Gamepage = ({}: Props) => {
	const router = useRouter();

	React.useEffect(() => {
		if (!stompClient.value?.connected) {
			router.push('/');
		}
	}, []);

	useSignalEffect(() => {
		if (!game.value) return;
		if (game.value.status === 'FINISHED') {
			router.push('/Gamelobby');
			clientSender.value?.resetGame();
		}
	});

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

	return (
		<ScreenComp>
			<div className='flex flex-col items-center justify-evenly gap-24 h-full w-full'>
				<Header />
				{isOwnWord ? (
					<h2 className='text-4xl font-medium text-center'>
						Waiting for the other players to guess your word...
					</h2>
				) : finshedRound ? (
					<h2 className='text-4xl font-medium text-center'>
						Waiting for the other players to finish the round...
					</h2>
				) : (
					<>
						<StageImage />
						<Word />
						<Letters />
					</>
				)}
			</div>
		</ScreenComp>
	);
};

export default Gamepage;
