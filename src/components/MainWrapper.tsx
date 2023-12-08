import pages from '@/constants/pages';
import { stompClient } from '@/hooks/states';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
	children: React.ReactNode;
};

const inter = Inter({ subsets: ['latin'] });

const MainWrapper = ({ children }: Props) => {
	const router = useRouter();

	React.useEffect(() => {
		if (!stompClient.value?.connected) {
			router.push(pages.HOME);
		}
	}, []);

	return (
		<main
			className={`flex h-screen flex-col items-center justify-center p-24 ${inter.className}`}>
			{children}
		</main>
	);
};

export default MainWrapper;
