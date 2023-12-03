import React from 'react';

type Props = {};

const Letters = (props: Props) => {
	function handleLetterClick(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		letter: string
	): void {
		console.log(letter);
	}

	const letters: { [key: string]: boolean } = {
		a: true,
		b: false,
		c: true,
		d: false,
		e: true,
		f: true,
		g: false,
		h: true,
		i: false,
		j: true,
		k: true,
		l: false,
		m: true,
		n: false,
		o: true,
		p: false,
		q: true,
		r: true,
		s: false,
		t: true,
		u: false,
		v: true,
		w: false,
		x: true,
		y: true,
		z: false,
	};

	return (
		<div className='flex flex-row flex-wrap justify-center gap-4'>
			{Object.keys(letters).map((letter) => (
				<button
					disabled={!letters[letter]}
					onClick={(e) => handleLetterClick(e, letter)}
					className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-400 rounded-xl flex items-center justify-center text-2xl ${
						letters[letter] ? '' : 'opacity-30'
					}`}
					key={letter}>
					{letter.toUpperCase()}
				</button>
			))}
		</div>
	);
};

export default Letters;
