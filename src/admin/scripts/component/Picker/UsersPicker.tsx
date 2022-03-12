import React, { useCallback, useEffect, useState } from 'react';

import { useUsers } from '../../hooks/model';
import PickerBase, { DefaultPickerBaseProps } from './Picker.Base';

export interface UsersPickerProps extends DefaultPickerBaseProps {
	currentUserId?: number;
}

const UsersPicker = (props: UsersPickerProps) => {
	const {
		currentUserId,
		placeholder = 'Select user',
		value,
		...rest
	} = props;

	const [ tmpValue, setTmpValue ] = useState(value);
	const {
		users,
		users_loading,
	} = useUsers();

	const getOptionsList = useCallback(() => {
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

	useEffect(() => setTmpValue(currentUserId), [ currentUserId ]);

	return (
		<>
			<PickerBase
				loading={users_loading}
				options={getOptionsList()}
				placeholder={placeholder}
				value={tmpValue}
				{...rest}
			/>
		</>
	);
};

export default UsersPicker;