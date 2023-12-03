import React from 'react';
import StageImage from './StageImage';
import Header from './Header';
import Word from './Word';
import Letters from './Letters';
import Chat from './Chat';

type Props = {
	gameId: string;
};

const Game = ({ gameId }: Props) => {
	return (
		<div className='flex flex-col gap-24 h-full w-full'>
			<Header />
			<StageImage />
			<Word />
			<Letters />
			{/* <Chat /> */}
		</div>
	);
};

export default Game;
