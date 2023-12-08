import React from 'react';
import Header from '../components/Header';
import MainWrapper from '../components/MainWrapper';
import { game, userData } from '@/hooks/states';
import { Game, GameWaiting } from '@/components/Game';
import InGameScreen from '@/components/InGameScreen';

type Props = {};

const Gamepage = ({}: Props) => {
	const isOwnWord = React.useMemo(() => {
		const currentWord = game.value?.currentWord;
		if (!currentWord) return false;
		return currentWord.owner.id === userData.value?.userId;
	}, [game.value]);

	return (
		<MainWrapper>
			<InGameScreen>
				<div className='flex flex-col items-center justify-evenly gap-24 h-full w-full'>
					<Header />
					{isOwnWord ? <GameWaiting /> : <Game />}
				</div>
			</InGameScreen>
		</MainWrapper>
	);
};

export default Gamepage;
