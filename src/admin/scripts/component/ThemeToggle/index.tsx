import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import config from '../../config';
import { themeListProps } from '../../types/common';
import { themeToggle } from '../../store/actions';
import { appStoreProps } from '../../types/store';
import { Toggle } from '../ui';

interface ThemeToggleProps {
	onThemeChange?: (theme: themeListProps) => void;
}

const ThemeToggle = (props: ThemeToggleProps) => {
	const { onThemeChange } = props;
	const { appTheme } = useSelector((store: appStoreProps) => store);
	const [theme, setTheme] = useState<themeListProps>(
		appTheme as themeListProps,
	);
	const dispatch = useDispatch();

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		theme: themeListProps,
	) => {
		setTheme(theme);
		dispatch(themeToggle(theme));
		if (onThemeChange) onThemeChange(theme);
	};

	const getItems = () => {
		const items = [];
		config.project.admin.theme.list.map((item) => {
			items.push({
				key: item,
				value: item,
				children: (
					<>{item}</>
				),
			});
		})

		return items;
	};

	return (
		<Toggle
			color="primary"
			size="small"
			value={theme}
			onChange={handleChange}
			exclusive
			items={getItems()}
		/>
	);
};

export default ThemeToggle;
