import MainWrapper from '@/components/MainWrapper';
import { clientSender, lobbyActivity, userData } from '@/hooks/states';
import { Game } from '@/types';
import { useSignalEffect } from '@preact/signals-react';
import { useRouter } from 'next/router';
import React, { MouseEvent } from 'react';
import GameList from './GameList';
import CreateGameForm from './CreateGameForm';
import pages from '@/constants/pages';

const Lobby = () => {
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
			router.push(pages.GAME_LOBBY);
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
		router.push(pages.GAME_LOBBY);
	}

	return (
		<MainWrapper>
			<div className='h-[50rem] flex flex-col items-center justify-center gap-8'>
				<h2 className='text-4xl font-medium'>Games:</h2>
				<GameList games={games} handleJoinGame={handleJoinGame} />
				<CreateGameForm
					handleCreateGame={handleCreateGame}
					gameName={gameName}
				/>
			</div>
		</MainWrapper>
	);
};

export default Lobby;