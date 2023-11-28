import React from 'react';

type Props = {};

function Header({}: Props) {
	return (
		<div className='fixed top-8 left-1/2 -translate-x-1/2 flex gap-12 items-center'>
			<h2 className='text-2xl text-slate-300'>Player 1</h2>
			<p className='text-xl text-slate-300 opacity-50'>VS</p>
			<h2 className='text-2xl text-slate-300'>Player 2</h2>
		</div>
	);
}

export default Header;
