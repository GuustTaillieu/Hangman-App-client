import { TLobbyActivity } from '@/types';
import { signal } from '@preact/signals-react';
import Stomp from 'stompjs';

export const userData = signal({ username: '', userId: '' });
export const connected = signal(false);
export const stompClient = signal<Stomp.Client | null>(null);
export const lobbyActivity = signal<TLobbyActivity | null>(null);
