import { clientSender } from '@/hooks/states';
import React from 'react';

type Props = {
	choseWord: React.MutableRefObject<boolean>;
};

const GetWord = ({ choseWord }: Props) => {
	const [word, setWord] = React.useState<string>('');

	function handleChooseWord(event: React.MouseEvent): void {
		event.preventDefault();
		choseWord.current = true;
		clientSender.value?.sendWord(word);
	}

	return (
		<form
			action='#'
			className='flex flex-col items-center justify-center gap-8'>
			<h2 className='text-4xl font-medium'>Choose a word:</h2>
			<input
				value={word}
				onChange={(e) => setWord(e.target.value)}
				type='text'
				maxLength={16}
				className='w-full border-2 rounded-md px-4 py-2 text-2xl font-medium drop-shadow-lg outline-none transition-all text-slate-900'
			/>
			<button
				disabled={word.length < 3}
				onClick={handleChooseWord}
				type='submit'
				className='bg-gradient-to-br from-blue-400 to-blue-600 px-4 py-3 text-white font-medium rounded-md text-2xl w-full drop-shadow-lg hover:drop-shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'>
				Submit
			</button>
		</form>
	);
};

export default GetWord;
