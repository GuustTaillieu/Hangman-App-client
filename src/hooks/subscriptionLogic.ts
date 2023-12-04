import { Frame } from 'stompjs';
import {
	clientActions,
	connected,
	game,
	lobbyActivity,
	stompClient,
} from './states';
import { SUB } from '@/enums/mailboxes';
import { NextRouter } from 'next/router';
import Stomp from 'stompjs';
import { TGameActivity } from '@/types';

export function onConnected(
	frame?: Frame | undefined,
	router?: NextRouter,
	client?: Stomp.Client
) {
	connected.value = true;
	if (!client) return;
	makeClientActions(client);
	router?.push('/Connectedpage');
}

export const subscribtionAlreadyExists = (callbackName: string) => {
	const subscriptions = stompClient.value?.subscriptions! as {
		[key: string]: { name: string };
	};
	return Object.values(subscriptions).some(
		(subscription) => subscription.name === callbackName
	);
};

function makeClientActions(client: Stomp.Client) {
	clientActions.value = {
		subToLobbyActivities: (callback: (frame: Frame) => void) => {
			if (!subscribtionAlreadyExists('lobbyActivities')) {
				client.subscribe(SUB.LOBBY_ACTIVITIES, callback);
			}
		},
		subToGameActivities: (
			gameId: string,
			callback: (frame: Frame) => void
		) => {
			if (!subscribtionAlreadyExists('handleGameActivity')) {
				client.subscribe(`/topic/game.${gameId}`, callback);
			}
		},
	};
}
