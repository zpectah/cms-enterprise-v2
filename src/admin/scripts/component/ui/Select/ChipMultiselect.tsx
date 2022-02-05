import React from 'react';
import Box from '@mui/material/Box';

import { Chip } from '../Chip';
import MultiselectBase, { MultiselectBaseProps } from './Multiselect.Base';

interface ChipMultiselectProps extends MultiselectBaseProps {}

const ChipMultiselect: React.FC<ChipMultiselectProps> = (props) => {
	const {
		...rest
	} = props;

	return (
		<MultiselectBase
			renderValue={(value: unknown) => {
				const selected = value as (string | number)[];

				return (
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
						{selected.map((value) => (
							<Chip key={value} label={value} />
						))}
					</Box>
				);
			}}
			{...rest}
		/>
	);
};

export default ChipMultiselect;