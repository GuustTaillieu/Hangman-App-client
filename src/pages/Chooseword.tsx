import InGameScreen from '@/components/InGameScreen';
import MainWrapper from '@/components/MainWrapper';
import { clientSender, game, stompClient } from '@/hooks/states';
import { useSignalEffect } from '@preact/signals-react';
import { useRouter } from 'next/router';
import React, { MouseEvent } from 'react';

type Props = {};

const Chooseword = (props: Props) => {
	const router = useRouter();
	const [word, setWord] = React.useState<string>('');
	const choseWord = React.useRef(false);

	useSignalEffect(() => {
		if (!game.value) return;
		if (game.value.status === 'STARTED') {
			router.push('/Gamepage');
		}
	});

	function handleChooseWord(event: MouseEvent): void {
		event.preventDefault();
		choseWord.current = true;
		clientSender.value?.sendWord(word);
	}

	return (
		<MainWrapper>
			<InGameScreen>
				{!choseWord.current ? (
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
			</InGameScreen>
		</MainWrapper>
	);
};

export default Chooseword;
