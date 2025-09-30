import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Color } from '../../shared/tokens';
type Props = {
	color?: string;
	size?: number;
};
const MinusIcon: React.FC<Props> = ({ color = Color.primary, size = 16 }) => (
	<Svg width={size} height={size} fill="none">
		<Path fill="none" d="M0 0h16v16H0z" />
		<Path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h8" />
	</Svg>
);
export default MinusIcon;
