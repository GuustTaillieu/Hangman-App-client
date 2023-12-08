import { game, userData } from '@/hooks/states';
import React from 'react';

type Props = {};

const GuessingWordOf = (props: Props) => {
	return game.value?.currentWord && userData.value ? (
		<h2 className='fixed top-8 right-4 text-xl font-medium text-right'>
			Word of:
			<br />
			<span className='text-2xl font-bold'>
				{game.value.currentWord.owner.name}
			</span>
		</h2>
	) : null;
};

export default GuessingWordOf;
