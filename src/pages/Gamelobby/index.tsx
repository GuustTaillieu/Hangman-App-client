'use client';
import InGameScreen from '@/components/InGameScreen';
import MainWrapper from '@/components/MainWrapper';
import {
	clientSender,
	clientSubscriptions,
	game,
	lobbyActivity,
	userData,
} from '@/hooks/states';
import { TGameActivity } from '@/types';
import { useSignalEffect } from '@preact/signals-react';
import { useRouter } from 'next/router';
import React, { MouseEvent } from 'react';
import { Frame } from 'stompjs';
import PlayerList from './PlayerList';
import pages from '@/constants/pages';

const Gamelobby = () => {
	const router = useRouter();

	const handleGameActivity = (frame: Frame) => {
		const body: TGameActivity = JSON.parse(frame.body);

		if (body.type === 'GAME_UPDATED') {
			game.value = body.data;
			if (game.value?.status === 'WAITING_FOR_WORDS') {
				router.push(pages.CHOOSE_WORD);
			} else if (game.value?.status === 'STARTED') {
				router.push(pages.GAME_LOBBY);
			}
		}
	};

	const handleStartGame = (e: MouseEvent) => {
		clientSender.value?.startGame();
	};

	useSignalEffect(() => {
		if (!lobbyActivity.value) return;
		if (
			lobbyActivity.value.type !== 'GAME_CREATED' &&
			lobbyActivity.value.type !== 'GAME_JOINED'
		)
			return;
		game.value = lobbyActivity.value.data;
		const gameId = lobbyActivity.value.data.id;
		if (gameId === null) return;
		clientSubscriptions.value?.subToGameActivities(
			gameId,
			handleGameActivity
		);
	});

	return (
		<MainWrapper>
			<InGameScreen>
				{game.value !== null && (
					<div className='flex flex-col items-center justify-center gap-8'>
						<h2 className='text-4xl font-medium'>
							Game Lobby: {game.value.name}
						</h2>
						<h3 className='text-2xl font-medium'>Players:</h3>
						<PlayerList />
						<button
							onClick={handleStartGame}
							disabled={
								game.value.players.length < 2 ||
								game.value.host.id !== userData.value.userId
							}
							title={
								game.value.host.id !== userData.value.userId
									? 'Only the host can start the game and you need to be with at least 2 players'
									: ''
							}
							className='bg-gradient-to-br from-blue-400 to-blue-600 px-4 py-3 text-white font-medium rounded-md text-2xl w-full drop-shadow-lg hover:drop-shadow-xl transition-all hover:scale-105 disabled:opacity-30 disabled:hover:scale-100'>
							Start Game
						</button>
					</div>
				)}
			</InGameScreen>
		</MainWrapper>
	);
};

export default Gamelobby;
