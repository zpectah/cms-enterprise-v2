import React from 'react';
import { default as MuiTabs, TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export interface TabsProps extends MuiTabsProps {
	children?: React.ReactNode[];
	items: {
		index: number,
		key: string,
		label: string,
		icon?: string | React.ReactElement<any, string | React.JSXElementConstructor<any>>,
	}[];
	activeValue: number;
}

const Tabs = (props: TabsProps) => {
	const {
		activeValue,
		items = [],
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
			<Box sx={{
				borderBottom: 1,
				borderColor: 'divider',
			}}>
				<MuiTabs
					value={activeValue}
					onChange={onChange}
					aria-label="basic tabs example"
					{...rest}
				>
					{items.map((item) => (
						<Tab
							key={item.key}
							label={
								<span
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
									}}
								>
									{item.icon && item.icon}
									<span
										style={{
											marginLeft: item.icon ? '.5rem' : 0,
										}}
									>
										{item.label}
									</span>
								</span>
							}
							// icon={item.icon}
							// iconPosition="start"
							style={{
								maxHeight: '2rem',
								textTransform: 'initial',
							}}
							{...a11yProps(item.index)}
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
