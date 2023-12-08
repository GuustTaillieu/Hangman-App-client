import { game, userData } from '@/hooks/states';
import { TPlayer } from '@/types';
import React from 'react';

const PlayerList = () => {
	if (!game.value) return null;
	return (
		<ul className='flex flex-col w-full max-w-[30rem] overflow-y-auto max-h-[20rem] bg-slate-900 rounded-md px-4 py-3'>
			{game.value.players.map((player) => (
				<PlayerComponent key={player.id} player={player} />
			))}
		</ul>
	);
};

const PlayerComponent = ({ player }: { player: TPlayer }) => (
	<li
		key={player.id}
		className='text-2xl font-medium flex flex-row justify-between px-2 py-4 border-b-2 border-slate-300 last:border-b-0'>
		<span>{player.id === userData.value.userId ? 'You' : player.name}</span>
		<span>{player.score}</span>
	</li>
);

export default PlayerList;
