import React from 'react';

type Props = {};

const Word = (props: Props) => {
	// THE HANGMAN WORD STYLE
	const word = ['_', 'a', '_', 'g', 'm', 'a', 'n'];

	return (
		<div className='flex flex-col items-center justify-center gap-4'>
			<div className='flex flex-row gap-4'>
				{word.map((letter, index) => {
					return letter == '_' ? (
						<div
							className='w-12 h-12 border-b-2 border-blue-500'
							key={index}></div>
					) : (
						<div
							className='w-12 h-12 border-b-2 border-blue-500 flex items-center justify-center text-2xl'
							key={index}>
							{letter.toUpperCase()}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Word;
