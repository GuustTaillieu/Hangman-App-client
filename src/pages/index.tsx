import MainWrapper from '@/components/MainWrapper';
import {
	clientSubscriptions,
	lobbyActivity,
	stompClient,
	userData,
} from '@/hooks/states';
import { onConnected } from '@/hooks/subscriptionLogic';
import { useSignalEffect } from '@preact/signals-react';
import { useRouter } from 'next/router';
import React, { MouseEvent } from 'react';
import SockJs from 'sockjs-client';
import Stomp, { Frame } from 'stompjs';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
	const router = useRouter();
	const [error, setError] = React.useState<string>('');

	function connectUser(event: MouseEvent): void {
		event.preventDefault();

		const socket: WebSocket = new SockJs('http://localhost:8080/ws');
		const client: Stomp.Client = Stomp.over(socket);
		stompClient.value = client;
		const userId = uuidv4();
		userData.value.userId = userId;

		stompClient.value.connect(
			{
				username: userData.value.username,
				userId: userId,
			},
			(e) => onConnected(e, router, client),
			onerror
		);
	}

	const onLobbyActivity = (frame: Frame) => {
		lobbyActivity.value = JSON.parse(frame.body);
	};

	function onerror(error: string | Frame) {
		setError("Couldn't connect to server");
	}

	useSignalEffect(() => {
		if (!clientSubscriptions.value) return;
		clientSubscriptions.value.subToLobbyActivities(onLobbyActivity);
	});

	return (
		<MainWrapper>
			<form
				action='#'
				className='flex flex-col items-center justify-center gap-8'>
				<h1 className='text-6xl font-medium mb-20 text-center'>
					Welcome to Hangman
				</h1>
				<h2 className='text-2xl font-medium text-center'>
					Enter your username:
				</h2>
				<div className='flex flex-row gap-4'>
					<input
						autoFocus
						onChange={(event) =>
							(userData.value.username = event.target.value)
						}
						type='text'
						placeholder='Username'
						className='w-full border-2 rounded-md px-4 py-2 text-2xl font-medium drop-shadow-lg outline-none transition-all text-slate-900'
					/>
					<button
						className='bg-gradient-to-br from-blue-400 to-blue-600 px-4 py-3 text-white font-medium rounded-md text-2xl w-full drop-shadow-lg hover:drop-shadow-xl transition-all hover:scale-105'
						onClick={connectUser}>
						Connect
					</button>
				</div>
				<p className='empty:hidden bg-red-500 text-white px-4 py-2 rounded-md'>
					{error}
				</p>
			</form>
		</MainWrapper>
	);
}
