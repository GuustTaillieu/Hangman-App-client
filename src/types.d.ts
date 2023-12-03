import { type } from 'os';

type Game = {
	id: string;
	name: string;
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

type TLobbyActivityType = 'GAME_CREATED' | 'PLAYER_LEFT' | 'LOBBY_JOINED';

type TLobbyActivity = {
	type: TLobbyActivityType;
	data: any;
};
