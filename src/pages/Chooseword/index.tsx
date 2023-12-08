import InGameScreen from '@/components/InGameScreen';
import MainWrapper from '@/components/MainWrapper';
import { game } from '@/hooks/states';
import { useSignalEffect } from '@preact/signals-react';
import { useRouter } from 'next/router';
import React from 'react';
import GetWord from './GetWord';
import SubmittedWord from './SubmittedWord';
import pages from '@/constants/pages';

const Chooseword = () => {
	const router = useRouter();
	const choseWord = React.useRef(false);

	useSignalEffect(() => {
		if (!game.value) return;
		if (game.value.status === 'STARTED') {
			router.push(pages.GAME_PAGE);
		}
	});

	return (
		<MainWrapper>
			<InGameScreen>
				{!choseWord.current ? (
					<GetWord choseWord={choseWord} />
				) : (
					<SubmittedWord />
				)}
			</InGameScreen>
		</MainWrapper>
	);
};

export default Chooseword;
