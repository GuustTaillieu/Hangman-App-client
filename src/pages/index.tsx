import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const inGame = false;

	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
			<h1 className='text-6xl font-bold'>Hangman</h1>
			{/* {inGame ? <Game gameId={1} /> : <Lobby />} */}
		</main>
	);
}
