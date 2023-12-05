import { type } from 'os';
import { Frame } from 'stompjs';

type Game = {
	id: string;
	name: string;
	host: Player;
	status: GameStatus;
	players: Player[];
	words: WordToGuess[];
	currentWord: WordToGuess | null;
};

type Player = {
	id: string;
	name: string;
	score: number;
	wrongGuesses: number;
};

type WordToGuess = {
	word: string;
	owner: Player;
	guesses: { [playerId: string]: string[] };
};

type GameStatus =
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
