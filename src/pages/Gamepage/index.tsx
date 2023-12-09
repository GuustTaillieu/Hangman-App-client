import React from 'react';
import Header from './Header';
import MainWrapper from '../../components/MainWrapper';
import Game, { GameWaiting } from '@/pages/Gamepage/Game';
import InGameScreen from '@/components/InGameScreen';

const Gamepage = () => {
	return (
		<MainWrapper>
			<InGameScreen>
				<div className='flex flex-col items-center justify-evenly gap-24 h-full w-full'>
					<Header />
					{GameWaiting() ? <GameWaiting /> : <Game />}
				</div>
			</InGameScreen>
		</MainWrapper>
	);
};

export default Gamepage;
