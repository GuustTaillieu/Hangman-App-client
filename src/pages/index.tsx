import { connected } from '@/hooks/states';
import ConnectedScreen from '@/pages/ConnectedPage';
import ConnectionScreen from '@/pages/ConnectionPage';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}>
			{connected.value ? <ConnectedScreen /> : <ConnectionScreen />}
		</main>
	);
}
