import { type } from 'os';
import { Frame } from 'stompjs';

type TGame = {
	id: string;
	name: string;
	host: TPlayer;
	status: TGameStatus;
	players: TPlayer[];
	words: TWordToGuess[];
	currentWord: TWordToGuess | null;
};

type TPlayer = {
	id: string;
	name: string;
	score: number;
	wrongGuesses: number;
};

type TWordToGuess = {
	word: string;
	owner: TPlayer;
	guesses: { [playerId: string]: string[] };
};

type TGameStatus =
	| 'WAITING_FOR_PLAYERS'
	| 'WAITING_FOR_WORDS'
	| 'STARTED'
	| 'FINISHED';

type TLobbyActivityType =
	| 'GAME_CREATED'
	| 'GAME_JOINED'
	| 'LOBBY_JOINED'
	| 'GAME_REMOVED';

type TLobbyActivity = {
	type: TLobbyActivityType;
	data: any;
};

type TGameActivityType = 'GAME_UPDATED';

type TGameActivity = {
	type: TGameActivityType;
	data: any;
};

type TClientSubscriptions = {
	subToLobbyActivities: (callback: (frame: Frame) => void) => void;
	subToGameActivities: (
		gameId: string,
		callback: (frame: Frame) => void
	) => void;
	unsubFromGameActivities: () => void;
};

type TClientSender = {
	joinLobby: () => void;
	createGame: (gameName: string) => void;
	joinGame: (gameId: string) => void;
	startGame: () => void;
	sendWord: (word: string) => void;
	guessLetter: (letter: string) => void;
	resetGame: () => void;
};
