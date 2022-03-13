import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Marker } from 'react-map-gl';
import {
	Stack,
	InputAdornment,
	Typography,
	Divider,
} from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CancelIcon from '@mui/icons-material/Cancel';

import {
	OutlinedInput,
	OutlinedInputProps,
	IconButton,
	Dialog,
	PrimaryButton,
} from '../ui';
import Map from '../Map';

export interface LocationPickerProps {
	value?: [number, number];
	onMove?: (e: any) => void;
	onSelect?: (value: [number, number]) => void;
	inputRef?: OutlinedInputProps['inputRef'];
	error?: boolean;
	placeholder?: string;
	id?: string;
	width?: string;
	inputSxProps?: OutlinedInputProps['sx'];
}

const LocationPicker = (props: LocationPickerProps) => {
	const {
		value,
		onMove,
		onSelect,
		inputRef,
		error,
		placeholder,
		id,
		width = '300px',
		inputSxProps,
	} = props;

	const initialCoords = value;

	const { t } = useTranslation([ 'common', 'components' ]);
	const [ inputValue, setInputValue ] = useState(String(value) || '0,0');
	const [ dialogOpen, setDialogOpen ] = useState(false);
	const [ pointCoords, setPointCoords ] = useState([ 0, 0 ]);

	const moveHandler = (e) => {
		if (onMove) onMove(e);
	};
	const selectHandler = () => {
		const value = pointCoords;
		setDialogOpen(false);
		setInputValue(String(value));
		if (onSelect) onSelect(value as [number, number]);
		resetHandler();
	};
	const resetHandler = () => {
		setPointCoords([ 0, 0 ]);
	};

	const resetDisabled = useCallback(() => {
		let disabled = false;
		if (
			pointCoords[0] === 0 && pointCoords[1] === 0
		) disabled = true;

		return disabled;
	}, [ pointCoords ]);
	const markerVisible = useCallback(() => {
		let visible = true;
		if (
			pointCoords[0] === 0
			&& pointCoords[1] === 0
		) visible = false;

		return visible;
	}, [ pointCoords ]);

	useEffect(() => setPointCoords(value), [ value ]);

	return (
		<>
			<OutlinedInput
				id={id}
				error={error}
				value={inputValue}
				placeholder={placeholder}
				inputRef={inputRef}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							onClick={() => setDialogOpen(true)}
						>
							<GpsFixedIcon fontSize="small" />
						</IconButton>
					</InputAdornment>
				}
				sx={{
					width,
					minHeight: '40px',
					fontSize: '.75rem',
					...inputSxProps,
				}}
				readOnly
			/>
			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				title={t('components:LocationPicker.title')}
				showBodyClose
				keepMounted={false}
				showFooterClose
				dialogContentProps={{
					sx: {
						p: 0,
					},
				}}
				actions={
					<>
						<PrimaryButton
							onClick={selectHandler}
						>
							{t('btn.confirm')}
						</PrimaryButton>
					</>
				}
			>
				<Divider />
				<Stack
					direction="row"
					alignItems="center"
					sx={{
						px: 3,
						py: 1,
					}}
				>
					<Typography
						variant="caption"
					>
						{JSON.stringify(pointCoords, null, 2)}
					</Typography>
					<IconButton
						onClick={resetHandler}
						disabled={resetDisabled()}
						size="small"
						title={t('btn.reset')}
					>
						<CancelIcon
							fontSize="small"
						/>
					</IconButton>
				</Stack>
				<Map
					coordinates={value}
					onClick={(e) => {
						setPointCoords([
							e.lngLat.lng,
							e.lngLat.lat,
						]);
					}}
					onMove={moveHandler}
				>
					{markerVisible() && (
						<Marker
							longitude={pointCoords[0]}
							latitude={pointCoords[1]}
							anchor="bottom"
						>
							<FmdGoodIcon
								fontSize="large"
							/>
						</Marker>
					)}
				</Map>
			</Dialog>
		</>
	);
};

export default LocationPicker;
