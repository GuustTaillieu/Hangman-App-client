import { Inter } from 'next/font/google';
import React from 'react';

type Props = {
	children: React.ReactNode;
};

const inter = Inter({ subsets: ['latin'] });

const ScreenComp = ({ children }: Props) => {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}>
			{children}
		</main>
	);
};

export default ScreenComp;
