import React, { useCallback } from 'react';

import { useTags } from '../../hooks/model';
import PickerBase, { DefaultPickerBaseProps } from './Picker.Base';

export interface TagsPickerProps extends DefaultPickerBaseProps {}

const TagsPicker = (props: TagsPickerProps) => {
	const {
		placeholder = 'Select tag',
		...rest
	} = props;

	const {
		tags,
		tags_loading,
	} = useTags();

	const getOptionsList = useCallback(() => {
		const list = [];
		if (tags && tags.length > 0) {
			tags.map((item) => {
				list.push({
					key: item.id,
					value: item.id,
					label: item.name,
				});
			});
		}

		return list;
	}, [ tags ]);

	return (
		<>
			<PickerBase
				loading={tags_loading}
				options={getOptionsList()}
				placeholder={placeholder}
				{...rest}
			/>
		</>
	);
};

export default TagsPicker;