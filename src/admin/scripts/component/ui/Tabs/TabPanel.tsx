import React from 'react';
import { Box } from '@mui/material';

export interface TabPanelProps {
	index: number;
	panelValue: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
	const {
		index,
		panelValue,
		children,
		...rest
	} = props;

	return (
		<div
			role="tabpanel"
			hidden={panelValue !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...rest}
		>
			<Box
				sx={{
					pt: 3,
					pb: 3,
					display: panelValue === index ? 'block' : 'none',
				}}
			>
				<>{children}</>
			</Box>
		</div>
	);
};

export default TabPanel;
