import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
type Props = {
	size?: number;
};
const StarIcon: React.FC<Props> = ({ size = 10 }) => (
	<Svg width={size} height={size} viewBox="0 0 10 10" fill="none">
		<Path fill="none" d="M0 0h10v10H0z" />
		<Path
			fill="#FABD21"
			d="m5.72 1.463.734 1.466c.1.204.367.4.592.438l1.329.22c.85.142 1.05.759.438 1.367L7.779 5.988a.905.905 0 0 0-.216.754l.295 1.279c.234 1.012-.304 1.404-1.2.875l-1.245-.738a.9.9 0 0 0-.825 0l-1.246.738c-.892.529-1.434.133-1.2-.875l.296-1.28a.905.905 0 0 0-.217-.753L1.188 4.954c-.609-.608-.413-1.225.437-1.366l1.33-.221a.907.907 0 0 0 .587-.438l.733-1.466c.4-.796 1.05-.796 1.446 0Z"
		/>
	</Svg>
);
export default StarIcon;
