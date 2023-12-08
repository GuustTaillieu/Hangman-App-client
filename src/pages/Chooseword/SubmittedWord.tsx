import React from 'react';

const SubmittedWord = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-8'>
			<h2 className='text-4xl font-medium'>
				Thanks for submitting a word!
			</h2>
			<h3 className='text-2xl font-medium'>
				Waiting for other players...
			</h3>
		</div>
	);
};

export default SubmittedWord;
