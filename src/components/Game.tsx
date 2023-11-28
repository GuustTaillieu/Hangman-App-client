import React from 'react';
import StageImage from './StageImage';
import Header from './Header';

type Props = {
	gameId: string;
};

const Game = ({ gameId }: Props) => {
	return (
		<div className='flex flex-col gap-12 h-full w-full'>
			<Header />
			<StageImage />
			{/* <Word /> */}
			{/* <Letters /> */}
			{/* <Chat /> */}
		</div>
	);
};

export default Game;
