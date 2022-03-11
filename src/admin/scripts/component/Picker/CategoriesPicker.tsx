import React, { useCallback } from 'react';

import { useCategories } from '../../hooks/model';
import PickerBase, { DefaultPickerBaseProps } from './Picker.Base';

export interface CategoriesPickerProps extends DefaultPickerBaseProps {}

const CategoriesPicker = (props: CategoriesPickerProps) => {
	const {
		placeholder = 'Select category',
		...rest
	} = props;

	const {
		categories,
		categories_loading,
	} = useCategories();

	const getOptionsList = useCallback(() => {
		const list = [];
		if (categories && categories.length > 0) {
			categories.map((item) => {
				list.push({
					key: item.id,
					value: item.id,
					label: item.name,
				});
			});
		}

		return list;
	}, [ categories ]);

	return (
		<>
			<PickerBase
				loading={categories_loading}
				options={getOptionsList()}
				placeholder={placeholder}
				{...rest}
			/>
		</>
	);
};

export default CategoriesPicker;