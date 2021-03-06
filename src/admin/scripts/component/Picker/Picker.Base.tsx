import React, { useCallback, useState } from 'react';
import { SxProps } from '@mui/material';

import { Select, SkeletonPreloader } from '../ui';

export type PickerItemProps = {
	key: number | string,
	value: number | string,
	label: string,
	disabled?: boolean,
	selected?: boolean,
};
export interface DefaultPickerBaseProps {
	id?: string;
	value: number | number[];
	onChange: (value: number | number[]) => void;
	ignored?: number[];
	multiple?: boolean;
	dataId?: string;
	label?: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	loading?: boolean;
	emptyValueOption?: boolean;
	error?: boolean;
	inputSx?: SxProps;
}
export interface PickerBaseProps extends DefaultPickerBaseProps {
	options: PickerItemProps[];
}

const PickerBase = (props: PickerBaseProps) => {
	const {
		id,
		value,
		onChange,
		ignored = [],
		multiple,
		dataId = 'PickerBase',
		label,
		placeholder,
		required,
		disabled,
		loading,
		emptyValueOption,
		options = [],
		error,
		inputSx = {
			width: {
				xs: '100%',
				md: '75%',
			}
		},
	} = props;

	// const [ showField, setShowField ] = useState(true);
	const emptyValue = emptyValueOption && !multiple;

	const changeHandler = (e) => onChange(e.target.value);

	const getOptionsList = useCallback(() => {
		const list = [];
		// const optionsMin = (emptyValueOption && placeholder) ? 2 : 1;
		if (emptyValue) {
			list.push({
				key: 0,
				value: '',
				label: 'No selected',
			});
		}
		options?.map((option) => {
			const item = {
				...option,
				disabled: false,
			};

			if (!ignored.includes(option.value as number)) list.push(item);
		});
		// setShowField(list.length > optionsMin);

		return list;
	}, [ options ]);

	return (
		<>
			{loading ? (
				<div>
					<SkeletonPreloader
						width="100%"
					/>
				</div>
			) : (
				<Select
					id={id}
					dataId={dataId}
					value={value}
					onChange={changeHandler}
					options={getOptionsList()}
					label={label}
					placeholder={placeholder}
					required={required}
					disabled={disabled}
					error={error}
					sx={inputSx}
					multiple={multiple}
				/>
			)}
		</>
	);
};

export default PickerBase;
