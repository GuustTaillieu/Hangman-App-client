import Image, { StaticImageData } from 'next/image';
import React, { useMemo } from 'react';
import stage1 from '@public/images/stages/1.jpg';
import stage2 from '@public/images/stages/2.jpg';
import stage3 from '@public/images/stages/3.jpg';
import stage4 from '@public/images/stages/4.jpg';
import stage5 from '@public/images/stages/5.jpg';
import stage6 from '@public/images/stages/6.jpg';
import stage7 from '@public/images/stages/7.jpg';
import stage8 from '@public/images/stages/8.jpg';
import stage9 from '@public/images/stages/9.jpg';
import stage10 from '@public/images/stages/10.jpg';

type Props = {};

function StageImage({}: Props) {
	const mistakes = 1;
	const images: StaticImageData[] = useMemo(
		() => [
			stage1,
			stage2,
			stage3,
			stage4,
			stage5,
			stage6,
			stage7,
			stage8,
			stage9,
			stage10,
		],
		[]
	);

	return (
		<div className='rounded-xl overflow-hidden mt-6'>
			<Image
				src={images[mistakes]}
				width={300}
				height={300}
				alt='hangman status'
			/>
		</div>
	);
}

export default StageImage;
