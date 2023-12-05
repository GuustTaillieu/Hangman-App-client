import React from 'react';
import StageImage from '../components/StageImage';
import Header from '../components/Header';
import Word from '../components/Word';
import Letters from '../components/Letters';
import Chat from '../components/Chat';
import ScreenComp from '../components/ScreenComp';
import { useSignalEffect } from '@preact/signals-react';
import { game } from '@/hooks/states';
import { useRouter } from 'next/router';

type Props = {};

const Gamepage = ({}: Props) => {
	const router = useRouter();

	React.useEffect(() => {
		// if (!stompClient.value?.connected) {
		// 	router.push('/');
		// }
	}, []);

	useSignalEffect(() => {
		if (!game.value) return;
		if (game.value.status === 'FINISHED') {
			router.push('/Gamelobby');
		}
	});

	return (
		<ScreenComp>
			<div className='flex flex-col items-center justify-evenly gap-24 h-full w-full'>
				<Header />
				<StageImage />
				<Word />
				<Letters />
				{/* <Chat /> */}
			</div>
		</ScreenComp>
	);
};

export default Gamepage;
