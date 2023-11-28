import React from 'react';
import StageImage from './StageImage';

type Props = {
	gameId: string;
};

const Game = ({ gameId }: Props) => {
	return (
		<div className='flex flex-col gap-12'>
			{/* <Header /> */}
			<StageImage />
			{/* <Word /> */}
			{/* <Letters /> */}
			{/* <Chat /> */}
		</div>
	);
};

export default Game;
