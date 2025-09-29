import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
const PlusIcon = () => (
	<Svg width={16} height={16} fill="none">
		<Path fill="none" d="M0 0h16v16H0z" />
		<G stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
			<Path d="M4 8h8M8 12V4" />
		</G>
	</Svg>
);
export default PlusIcon;
