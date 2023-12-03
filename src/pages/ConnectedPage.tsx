import Game from '@/components/Game';
import Lobby from '@/components/Lobby';
import React from 'react';

type Props = {};

const ConnectedScreen = ({}: Props) => {
	const [inGame, setInGame] = React.useState(false);

	return inGame ? <Game gameId='1' /> : <Lobby />;
};

export default ConnectedScreen;
