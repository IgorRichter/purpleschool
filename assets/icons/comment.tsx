import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
const CommentIcon = (props: SvgProps) => (
	<Svg width={17.782} height={19.501} fill="none" {...props}>
		<G fillRule="evenodd">
			<Path
				fill="#C67C4E"
				d="M8.891 0C2.326 0 0 2.552 0 9.751c0 7.198 2.326 9.75 8.891 9.75 6.564 0 8.891-2.552 8.891-9.75C17.782 2.552 15.455 0 8.891 0Z"
			/>
			<Path
				fill="#FFF"
				d="M5.266 5.177h2.755a.75.75 0 0 1 0 1.5H5.266a.75.75 0 0 1 0-1.5Zm0 5.26h7.22a.75.75 0 0 0 0-1.5h-7.22a.75.75 0 0 0 0 1.5Zm0 3.76h7.22a.75.75 0 0 0 0-1.5h-7.22a.75.75 0 0 0 0 1.5Z"
			/>
		</G>
	</Svg>
);
export default CommentIcon;
