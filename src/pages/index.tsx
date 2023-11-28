import Game from '@/components/Game';
import Lobby from '@/components/Lobby';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const inGame = true;

	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}>
			{inGame ? <Game gameId='1' /> : <Lobby />}
		</main>
	);
}
