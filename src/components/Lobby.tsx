import { SEND } from '@/enums/mailboxes';
import { lobbyActivity, stompClient, userData } from '@/hooks/states';
import { Game } from '@/types';
import { useSignalEffect } from '@preact/signals-react';
import React, { MouseEvent } from 'react';

type Props = {};

const Lobby = ({}: Props) => {
	const [games, setGames] = React.useState<Game[]>([]);
	const gameName = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		stompClient.value?.send(SEND.JOIN_LOBBY, {}, userData.value.userId);
	}, []);

	const onGameCreated = () => {
		if (games.includes(lobbyActivity.value?.data)) return;
		setGames((prev) => [...prev, lobbyActivity.value?.data]);
	};
	const onLobbyJoined = () => {
		setGames(lobbyActivity.value?.data);
	};

	useSignalEffect(() => {
		if (!lobbyActivity.value) return;
		switch (lobbyActivity.value.type) {
			case 'GAME_CREATED':
				onGameCreated();
				break;
			case 'LOBBY_JOINED':
				onLobbyJoined();
				break;
			default:
				break;
		}
	});

	function handleCreateGame(event: MouseEvent): void {
		event.preventDefault();
		stompClient.value?.send(SEND.CREATE_GAME, {
			playerId: userData.value.userId,
			gameName: gameName.current?.value,
		});
	}

	return (
		<div className='h-[50rem] flex flex-col items-center justify-center gap-8'>
			<h1 className='text-6xl font-medium mb-20'>Hangman</h1>
			<h2 className='text-2xl font-medium'>Games:</h2>
			<ul className='flex flex-col gap-4 w-full max-w-[30rem] overflow-y-auto max-h-[20rem] bg-slate-900 rounded-md px-4 py-3'>
				{games.length > 0 ? (
					games.map((game) => (
						<li
							key={game.name}
							className='text-2xl font-medium text-center'>
							{game.name}
						</li>
					))
				) : (
					<li className='text-2xl font-medium text-center italic'>
						No games yet
					</li>
				)}
			</ul>
			<form className='flex flex-row gap-4'>
				<input
					ref={gameName}
					placeholder='Game name'
					type='text'
					name='gameName'
					id='gameName'
					className='w-full border-2 rounded-md px-4 py-2 text-2xl font-medium drop-shadow-lg outline-none transition-all text-slate-900'
				/>
				<button
					type='submit'
					className='bg-gradient-to-br from-blue-400 to-blue-600 px-4 py-3 text-white font-medium rounded-md text-2xl w-full drop-shadow-lg hover:drop-shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
					onClick={handleCreateGame}>
					Create game
				</button>
			</form>
		</div>
	);
};

export default Lobby;
