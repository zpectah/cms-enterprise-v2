import React, { useMemo } from 'react';

import { useUsers } from '../../hooks/model';
import PickerBase, { DefaultPickerBaseProps } from './Picker.Base';

export interface UsersPickerProps extends DefaultPickerBaseProps {}

const UsersPicker = (props: UsersPickerProps) => {
	const {
		placeholder = 'Select user',
		value,
		...rest
	} = props;

	const {
		users,
		users_loading,
	} = useUsers();

	const options_list = useMemo(() => {
		const list = [];
		if (users && users.length > 0) {
			users.map((item) => {
				list.push({
					key: item.id,
					value: item.id,
					label: item.email,
				});
			});
		}

		return list;
	}, [ users ]);

	return (
		<>
			<PickerBase
				loading={users_loading}
				options={options_list}
				placeholder={placeholder}
				value={value}
				{...rest}
			/>
		</>
	);
};

export default UsersPicker;
