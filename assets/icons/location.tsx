import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, Rect, G, Circle } from 'react-native-svg';
const LocationIcon = (props: SvgProps) => (
	<Svg width={34} height={34} fill="none" {...props}>
		<Defs>
			<ClipPath id="a">
				<Path fill="#FFF" d="M8 8h18v18H8z" />
			</ClipPath>
		</Defs>
		<Rect width={34} height={34} fill="#C67C4E" rx={10} />
		<G clipPath="url(#a)">
			<Path d="M8 8h18v18H8z" />
			<Circle cx={17} cy={17} r={7.5} stroke="#FFF" strokeWidth={1.5} />
			<Path
				stroke="#FFF"
				strokeWidth={1.5}
				d="M18.467 18.571c.037-.032.072-.067.104-.104.127-.145.201-.33.35-.699.692-1.732 1.038-2.599.702-3.093a1.126 1.126 0 0 0-.298-.299c-.495-.336-1.36.01-3.093.704-.37.148-.554.222-.7.349a1.11 1.11 0 0 0-.103.104c-.127.145-.201.33-.35.699-.692 1.732-1.039 2.598-.703 3.093.08.117.181.219.299.298.494.336 1.36-.01 3.093-.703.37-.148.554-.222.7-.349Z"
			/>
		</G>
	</Svg>
);
export default LocationIcon;
