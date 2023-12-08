import MainWrapper from '@/components/MainWrapper';
import {
	clientSender,
	lobbyActivity,
	stompClient,
	userData,
} from '@/hooks/states';
import { Game } from '@/types';
import { useSignalEffect } from '@preact/signals-react';
import { useRouter } from 'next/router';
import React, { MouseEvent } from 'react';

type Props = {};

const Connectedpage = ({}: Props) => {
	const router = useRouter();
	const [games, setGames] = React.useState<Game[]>([]);
	const gameName = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		clientSender.value?.joinLobby();
	}, []);

	const onGameCreated = () => {
		const game: Game = lobbyActivity.value?.data;
		if (games.includes(game)) return;
		setGames((prev) => [...prev, lobbyActivity.value?.data]);
		gameName.current!.value = '';
		const isHost = game.host.id === userData.value.userId;
		if (isHost) {
			router.push('/Gamelobby');
		}
	};
	const onLobbyJoined = () => {
		const game = lobbyActivity.value?.data;
		setGames(game);
	};

	const onGameRemoved = () => {
		const games: Game[] = lobbyActivity.value?.data;
		setGames(games);
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
			case 'GAME_REMOVED':
				onGameRemoved();
				break;
			default:
				break;
		}
	});

	function handleCreateGame(event: MouseEvent): void {
		event.preventDefault();
		if (!gameName.current) return;
		if (gameName.current.value.length < 3) return;
		clientSender.value?.createGame(gameName.current.value);
	}

	function handleJoinGame(gameId: string): void {
		clientSender.value?.joinGame(gameId);
		router.push('/Gamelobby');
	}

	return (
		<MainWrapper>
			<div className='h-[50rem] flex flex-col items-center justify-center gap-8'>
				<h2 className='text-4xl font-medium'>Games:</h2>
				<ul className='flex flex-col gap-4 w-full overflow-y-auto max-h-[20rem] bg-slate-900 rounded-md px-4 py-3'>
					{games.length > 0 ? (
						games.map((game) => (
							<li
								onClick={() => handleJoinGame(game.id)}
								key={game.id}
								className='text-2xl font-medium text-center p-2 last:border-b-0 border-b-2 border-slate-700 cursor-pointer'>
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
						title='Game name should be at least 3 characters long'
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
		</MainWrapper>
	);
};

export default Connectedpage;
