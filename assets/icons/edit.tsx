import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';

type Props = {
	color?: string;
	size?: number;
};

const EditIcon: React.FC<Props> = ({ color, size = 14 }) => (
	<Svg width={size} height={size} fill="none">
		<Path fill="none" d="M0 0h14v14H0z" />
		<G stroke={color} strokeLinecap="round" strokeLinejoin="round">
			<Path d="M6.704 1.627H4.523c-1.794 0-2.919 1.27-2.919 3.068v4.85c0 1.797 1.12 3.067 2.919 3.067H9.67c1.8 0 2.92-1.27 2.92-3.067v-2.35" />
			<Path d="M9.509 2.011a1.391 1.391 0 0 1 1.966 0l.71.71a1.39 1.39 0 0 1 0 1.967l-4.38 4.38c-.238.237-.56.37-.896.37H4.724l.055-2.204c.008-.324.14-.634.37-.863l4.36-4.36ZM8.846 2.685l2.664 2.663" />
		</G>
	</Svg>
);
export default EditIcon;
