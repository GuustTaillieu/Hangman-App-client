const SUB = {
	LOBBY_ACTIVITIES: '/lobby/activities',
	GAME_ACTIVITIES: (gameId: string) => `/topic/game.${gameId}`,
};
const SEND = {
	JOIN_LOBBY: '/app/lobby/join',
	CREATE_GAME: '/app/lobby/create-game',
	JOIN_GAME: '/app/game/join',
	START_GAME: '/app/game/start',
	SEND_WORD: '/app/game/send-word',
	GUESS_LETTER: '/app/game/guess-letter',
	RESET_GAME: '/app/game/reset',
};

export { SUB, SEND };
