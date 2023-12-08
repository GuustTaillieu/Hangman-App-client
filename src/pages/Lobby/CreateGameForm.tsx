import React from 'react';

type Props = {
	handleCreateGame: (event: React.MouseEvent<HTMLButtonElement>) => void;
	gameName: React.RefObject<HTMLInputElement>;
};

const CreateGameForm = ({ handleCreateGame, gameName }: Props) => {
	return (
		<form className='flex flex-row gap-4'>
			<input
				autoFocus
				ref={gameName}
				placeholder='Game name'
				type='text'
				name='gameName'
				id='gameName'
				title='Game name should be at least 3 characters long'
				className='w-full border-2 rounded-md px-4 py-2 text-2xl font-medium drop-shadow-lg outline-none transition-all text-slate-900'
			/>
			<button
				type='submit'
				className='bg-gradient-to-br from-blue-400 to-blue-600 px-4 py-3 text-white font-medium rounded-md text-2xl w-full drop-shadow-lg hover:drop-shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
				onClick={handleCreateGame}>
				Create game
			</button>
		</form>
	);
};

export default CreateGameForm;
