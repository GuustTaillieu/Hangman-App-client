import { type } from 'os';
import { Frame } from 'stompjs';

type Game = {
	id: string;
	name: string;
	host: Player;
	status: GameStatus;
	players: Player[];
	words: WordToGuess[];
};

type Player = {
	id: string;
	name: string;
	score: number;
};

type WordToGuess = {
	word: string;
	state: string;
	owner: Player;
	belongingGame: Game;
	guessed: boolean;
	guessedLetters: string[];
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

type TClientActions = {
	subToLobbyActivities: (callback: (frame: Frame) => void) => void;
	subToGameActivities: (
		gameId: string,
		callback: (frame: Frame) => void
	) => void;
};
