import React, { MouseEvent } from 'react';

type Props = {};

const Lobby = (props: Props) => {
	const [gamemode, setGamemode] = React.useState<'1v1' | '1vAI'>('1v1');
	const [nickname, setNickname] = React.useState<string>('');

	function handlePlay(event: MouseEvent): void {
		event.preventDefault();
		console.log({ nickname, gamemode });
	}

	return (
		<div className='h-[50rem] flex flex-col items-center justify-center gap-8'>
			<h2 className='font-medium text-3xl'>Choose gamemode</h2>
			<div className='flex gap-8'>
				<button
					className={`bg-gradient-to-br from-blue-400 to-blue-600 px-4 py-2 text-white font-medium h-48 w-48 rounded-2xl text-5xl flex flex-row items-center justify-center gap-2 shadow-lg hover:drop-shadow-lg hover:scale-105 transition-all ${
						gamemode == '1v1' ? 'scale-105' : 'opacity-80'
					}`}
					onClick={() => setGamemode('1v1')}>
					1 <span className='text-4xl opacity-70'>vs</span> 1
				</button>
				<button
					className={`bg-gradient-to-br from-blue-400 to-blue-600 px-4 py-2 text-white font-medium h-48 w-48 rounded-2xl text-5xl flex flex-row items-center justify-center gap-2 shadow-lg hover:drop-shadow-lg hover:scale-105 transition-all ${
						gamemode == '1vAI' ? 'scale-105' : 'opacity-80'
					}`}
					onClick={() => setGamemode('1vAI')}>
					1 <span className='text-4xl opacity-70'>vs</span> AI
				</button>
			</div>

			<h2 className='text-2xl font-medium'>Pick a nickname:</h2>
			<input
				onChange={(event) => setNickname(event.target.value)}
				type='text'
				maxLength={16}
				placeholder='Nickname'
				className='w-full border-2 rounded-md px-4 py-2 text-2xl font-medium drop-shadow-lg hover:drop-shadow-xl outline-none transition-all text-slate-900'
			/>
			<button
				disabled={nickname.length < 3}
				className='bg-gradient-to-br from-blue-400 to-blue-600 px-4 py-3 text-white font-medium rounded-md text-2xl w-full drop-shadow-lg hover:drop-shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
				onClick={handlePlay}>
				Play
			</button>
		</div>
	);
};

export default Lobby;
