import ScreenComp from '@/components/ScreenComp';
import React from 'react';

type Props = {};

const Chooseword = (props: Props) => {
	const [word, setWord] = React.useState<string>('');
	const choseWord = React.useRef(false);

	return (
		<ScreenComp>
			{!choseWord.current ? (
				<form
					action='#'
					className='flex flex-col items-center justify-center gap-8'>
					<h2 className='text-4xl font-medium'>Choose a word:</h2>
					<input
						value={word}
						onChange={(e) => setWord(e.target.value)}
						type='text'
						className='w-full max-w-[30rem] bg-slate-900 rounded-md px-4 py-3'
					/>
					<button
						disabled={word.length < 3}
						onClick={() => (choseWord.current = true)}
						type='submit'
						className='bg-slate-900 rounded-md px-4 py-3'>
						Submit
					</button>
				</form>
			) : (
				<div className='flex flex-col items-center justify-center gap-8'>
					<h2 className='text-4xl font-medium'>
						Thanks for submitting a word!
					</h2>
					<h3 className='text-2xl font-medium'>
						Waiting for other players...
					</h3>
				</div>
			)}
		</ScreenComp>
	);
};

export default Chooseword;
