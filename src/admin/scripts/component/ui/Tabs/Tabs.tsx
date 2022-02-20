import React from 'react';
import { default as MuiTabs, TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export interface TabsProps extends MuiTabsProps {
	children?: React.ReactNode[];
	labels: string[];
	activeValue: number;
}

const Tabs = (props: TabsProps) => {
	const {
		activeValue,
		labels = [],
		onChange,
		children,
		...rest
	} = props;

	const a11yProps = (index: number) => {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	};

	return (
		<Box
			sx={{ width: '100%' }}
		>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<MuiTabs
					value={activeValue}
					onChange={onChange}
					aria-label="basic tabs example"
					{...rest}
				>
					{labels.map((label, index) => (
						<Tab
							key={label}
							label={label}
							{...a11yProps(index)}
						/>
					))}
				</MuiTabs>
			</Box>
			<Box>
				{children.map((node) => node)}
			</Box>
		</Box>
	);
};

export default Tabs;
