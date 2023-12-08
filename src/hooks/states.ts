import {
	TGame,
	TClientSender,
	TClientSubscriptions,
	TLobbyActivity,
} from '@/types';
import { signal } from '@preact/signals-react';
import Stomp from 'stompjs';

export const userData = signal({ username: '', userId: '' });
export const connected = signal(false);
export const stompClient = signal<Stomp.Client | null>(null);
export const lobbyActivity = signal<TLobbyActivity | null>(null);
export const game = signal<TGame | null>(null);
export const clientSubscriptions = signal<TClientSubscriptions | null>(null);
export const clientSender = signal<TClientSender | null>(null);
