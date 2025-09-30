import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { Color } from '../../shared/tokens';
type Props = {
	color?: string;
	size?: number;
};
const PlusIcon: React.FC<Props> = ({ color = Color.primary, size = 16 }) => (
	<Svg width={size} height={size} fill="none">
		<Path fill="none" d="M0 0h16v16H0z" />
		<G stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
			<Path d="M4 8h8M8 12V4" />
		</G>
	</Svg>
);
export default PlusIcon;
