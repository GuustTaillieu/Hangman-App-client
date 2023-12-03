import { Frame } from 'stompjs';
import { connected, lobbyActivity, stompClient } from './states';
import { SUB } from '@/enums/mailboxes';

export function onConnected(frame?: Frame | undefined) {
	connected.value = true;
	if (!stompClient.value) return;
	stompClient.value.subscribe(SUB.LOBBY_ACTIVITIES, onLobbyActivity);
}

const onLobbyActivity = (frame: Frame) => {
	lobbyActivity.value = JSON.parse(frame.body);
};
