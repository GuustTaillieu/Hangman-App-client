import Image from 'next/image';
import React from 'react';

type Props = {
	gameId: string;
};

const Game = ({ gameId }: Props) => {
	return (
		<div className='flex flex-col gap-12'>
			{/* <Header /> */}
			<Image
				src='/hangman-0.png'
				width={300}
				height={300}
				alt='hangman status'
			/>
			{/* <Word /> */}
			{/* <Letters /> */}
			{/* <Chat /> */}
		</div>
	);
};

export default Game;
