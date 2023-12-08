import pages from '@/constants/pages';
import {
	clientSender,
	clientSubscriptions,
	game,
	lobbyActivity,
} from '@/hooks/states';
import { useSignalEffect } from '@preact/signals-react';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
	children: React.ReactNode;
};

const InGameScreen = ({ children }: Props) => {
	const router = useRouter();

	useSignalEffect(() => {
		if (!game.value) return;
		if (game.value.status === 'FINISHED') {
			router.push(pages.GAME_LOBBY);
			clientSender.value?.resetGame();
		}
	});

	useSignalEffect(() => {
		if (!lobbyActivity.value) return;
		if (lobbyActivity.value.type === 'GAME_REMOVED') {
			game.value = null;
			clientSubscriptions.value?.unsubFromGameActivities();
			router.push(pages.LOBBY);
		}
	});

	return <>{children}</>;
};

export default InGameScreen;
