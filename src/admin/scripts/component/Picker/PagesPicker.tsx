import React, { useCallback } from 'react';

import { usePages } from '../../hooks/model';
import PickerBase, { DefaultPickerBaseProps } from './Picker.Base';

export interface PagesPickerProps extends DefaultPickerBaseProps {}

const PagesPicker = (props: PagesPickerProps) => {
	const {
		placeholder = 'Select page',
		...rest
	} = props;

	const {
		pages,
		pages_loading,
	} = usePages();

	const getOptionsList = useCallback(() => {
		const list = [];
		if (pages && pages.length > 0) {
			pages.map((item) => {
				list.push({
					key: item.id,
					value: item.id,
					label: item.name,
				});
			});
		}

		return list;
	}, [ pages ]);

	return (
		<>
			<PickerBase
				loading={pages_loading}
				options={getOptionsList()}
				placeholder={placeholder}
				{...rest}
			/>
		</>
	);
};

export default PagesPicker;