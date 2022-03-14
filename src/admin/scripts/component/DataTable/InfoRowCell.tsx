import React from 'react';
import { Stack } from '@mui/material';

export interface InfoRowCellProps {
	colspan: number;
}

const InfoRowCell: React.FC<InfoRowCellProps> = (props) => {
	const {
		children,
		colspan,
	} = props;

	return (
		<tbody>
		<tr>
			<td
				colSpan={colspan}
				style={{
					padding: '1.25rem 1rem',
					textAlign: 'center',
					verticalAlign: 'middle',
					borderBottom: '1px solid rgba(200,200,200,.5)',
				}}
			>
				<Stack
					direction="row"
					spacing={2}
					alignItems="center"
					justifyContent="center"
				>
					{children}
				</Stack>
			</td>
		</tr>
		</tbody>
	);
};

export default InfoRowCell;