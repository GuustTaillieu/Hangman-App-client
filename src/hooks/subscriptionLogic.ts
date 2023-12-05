import Stomp, { Frame } from 'stompjs';
import {
	clientSender,
	clientSubscriptions,
	connected,
	game,
	stompClient,
	userData,
} from './states';
import { SEND, SUB } from '@/enums/mailboxes';
import { NextRouter } from 'next/router';

export function onConnected(
	frame?: Frame | undefined,
	router?: NextRouter,
	client?: Stomp.Client
) {
	connected.value = true;
	if (!client) return;
	makeClientSubscriptions(client);
	makeClientSender(client);
	router?.push('/Connectedpage');
}

const subscribtionAlreadyExists = (callbackName: string) => {
	const subscriptions = stompClient.value?.subscriptions! as {
		[key: string]: { name: string };
	};
	return Object.values(subscriptions).some(
		(subscription) => subscription.name === callbackName
	);
};

function makeClientSubscriptions(client: Stomp.Client) {
	clientSubscriptions.value = {
		subToLobbyActivities: (callback: (frame: Frame) => void) => {
			if (!subscribtionAlreadyExists(callback.name)) {
				client.subscribe(SUB.LOBBY_ACTIVITIES, callback);
			}
		},
		subToGameActivities: (
			gameId: string,
			callback: (frame: Frame) => void
		) => {
			if (!subscribtionAlreadyExists(callback.name)) {
				client.subscribe(SUB.GAME_ACTIVITIES(gameId), callback);
			}
		},
	};
}
function makeClientSender(client: Stomp.Client) {
	clientSender.value = {
		joinLobby() {
			client.send(SEND.JOIN_LOBBY, {}, userData.value.userId);
		},
		createGame(gameName) {
			const playerId = userData.value?.userId;
			client.send(SEND.CREATE_GAME, {
				playerId,
				gameName,
			});
		},
		joinGame(gameId) {
			const playerId = userData.value?.userId;
			client.send(SEND.JOIN_GAME, {
				gameId,
				playerId,
			});
		},
		startGame() {
			const gameId = game.value?.id;
			const playerId = userData.value?.userId;
			client.send(SEND.START_GAME, {
				gameId,
				playerId,
			});
		},
		sendWord(word) {
			const gameId = game.value?.id;
			const playerId = userData.value?.userId;
			client.send(SEND.SEND_WORD, {
				gameId,
				playerId,
				word,
			});
		},
		guessLetter(letter) {
			const gameId = game.value?.id;
			const playerId = userData.value?.userId;
			client.send(SEND.SEND_WORD, {
				gameId,
				playerId,
				letter,
			});
		},
	};
}
