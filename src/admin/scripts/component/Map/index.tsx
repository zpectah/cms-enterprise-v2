import React, { useState } from 'react';
import { default as GlMap } from 'react-map-gl'; // https://visgl.github.io/react-map-gl/docs/get-started/get-started
import { Box, BoxProps } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';

import config from '../../config';
import { MAPBOX_DEFAULT_COORDS } from '../../constants';

export interface MapProps {
	token?: string;
	boxProps?: BoxProps;
	coordinates?: [number, number];
	zoom?: number;
	onClick?: (e: any) => void;
	onMove?: (e: any) => void;
	children?: React.ReactNode;
	mapStyle?: string;
	mapContainerStyle?: React.CSSProperties;
}

const Map = (props: MapProps) => {
	const {
		token = config.project.global.plugin.mapbox.TOKEN,
		boxProps = {
			sx: {
				width: '100%',
				height: '50vh',
			}
		},
		coordinates = MAPBOX_DEFAULT_COORDS,
		zoom = 11,
		onClick,
		onMove,
		children,
		mapStyle = 'mapbox://styles/mapbox/streets-v9',
		mapContainerStyle = {
			width: '100%',
			height: '100%',
		},
	} = props;

	const initialCoords = MAPBOX_DEFAULT_COORDS;

	const [ viewState, setViewState ] = useState({
		longitude: coordinates[0] !== 0 ? coordinates[0] : initialCoords[0],
		latitude: coordinates[1] !== 0 ? coordinates[1] : initialCoords[1],
		zoom: zoom,
	});

	const moveHandler = (e) => {
		setViewState(e.viewState);
		if (onMove) onMove(e);
	};
	const clickHandler = (e) => {
		if (onClick) onClick(e);
	};

	return (
		<Box
			{...boxProps}
		>
			<GlMap
				mapboxAccessToken={token}
				mapStyle={mapStyle}
				style={mapContainerStyle}
				initialViewState={viewState}
				onMove={moveHandler}
				onClick={clickHandler}
				children={children}
			/>
		</Box>
	);
};

export default Map;
