import { TGame } from '@/types';
import React from 'react';

type Props = {
	games: TGame[];
	handleJoinGame: (gameId: string) => void;
};

const GameList = ({ games = [], handleJoinGame }: Props) => {
	return (
		<ul className='flex flex-col gap-4 w-full overflow-y-auto max-h-[20rem] bg-slate-900 rounded-md px-4 py-3'>
			{games.length > 0 ? (
				games.map((game) => (
					<li
						onClick={() => handleJoinGame(game.id)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleJoinGame(game.id);
							}
						}}
						tabIndex={0}
						key={game.id}
						className='text-2xl font-medium text-center p-2 last:border-b-0 border-b-2 border-slate-700 cursor-pointer'>
						{game.name}
					</li>
				))
			) : (
				<li className='text-2xl font-medium text-center italic'>
					No games yet
				</li>
			)}
		</ul>
	);
};

export default GameList;
