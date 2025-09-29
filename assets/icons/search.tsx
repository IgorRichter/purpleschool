import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
const SearchIcon = () => (
	<Svg width={20} height={20} fill="none">
		<Path fill="none" d="M0 0h20v20H0z" />
		<G stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
			<Path d="M9.583 17.5a7.917 7.917 0 1 1 0-15.833 7.917 7.917 0 0 1 0 15.833ZM18.333 18.333l-1.666-1.666" />
		</G>
	</Svg>
);
export default SearchIcon;
