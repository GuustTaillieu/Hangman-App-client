const SUB = {
	LOBBY_ACTIVITIES: '/lobby/activities',
	GAME_ACTIVITIES: (gameId: string) => `/topic/game.${gameId}`,
};
const SEND = {
	JOIN_LOBBY: '/app/lobby/join',
	CREATE_GAME: '/app/lobby/create-game',
	START_GAME: '/app/game/start',
	JOIN_GAME: '/app/game/join',
};

export { SUB, SEND };
