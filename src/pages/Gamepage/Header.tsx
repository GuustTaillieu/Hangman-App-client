import { game, userData } from '@/hooks/states';
import { TPlayer } from '@/types';
import { useSignalEffect } from '@preact/signals-react';
import React from 'react';

function Header() {
	const [players, setPlayers] = React.useState<TPlayer[]>([]);

	useSignalEffect(() => {
		if (!game.value) return;
		setPlayers(game.value.players);
	});

	return game.value ? (
		<div className='fixed left-4 top-8 flex flex-col items-start justify-center gap-4'>
			{players.map((player) => (
				<div
					key={player.id}
					className='flex items-center justify-center gap-2'>
					<div
						className={
							'h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center'
						}>
						<span className='text-white font-medium text-xl'>
							{player.score}
						</span>
					</div>
					<h3 className='text-2xl font-medium'>
						{player.id === userData.value.userId
							? 'You'
							: player.name}
					</h3>
				</div>
			))}
		</div>
	) : null;
}

export default Header;
