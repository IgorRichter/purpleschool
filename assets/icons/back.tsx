import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const BackIcon = (props: SvgProps) => (
	<Svg width={24} height={24} fill="none" {...props}>
		<Path fill="none" d="M0 0h24v24H0z" />
		<Path fill="none" d="M0 0h24v24H0z" />
		<Path stroke="#2F2D2C" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m15.5 19-7-7 7-7" />
	</Svg>
);
export default BackIcon;
