import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import config from '../../config';
import { themeListProps } from '../../types/common';
import { themeToggle } from '../../store/actions';
import { appStoreProps } from '../../types/store';

interface ThemeToggleProps {}

const ThemeToggle = (props: ThemeToggleProps) => {
	const {} = props;
	const { appTheme } = useSelector((store: appStoreProps) => store);
	const [theme, setTheme] = useState<themeListProps>(appTheme as themeListProps);
	const dispatch = useDispatch();

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		theme: themeListProps,
	) => {
		setTheme(theme);
		dispatch(themeToggle(theme));
	};

	return (
		<>
			<ToggleButtonGroup color="secondary" size="small" value={theme} onChange={handleChange} exclusive>
				{config.project.admin.theme.list.map((item) => (
					<ToggleButton key={item} value={item}>
						{item}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</>
	);
};

export default ThemeToggle;