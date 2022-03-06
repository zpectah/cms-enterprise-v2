import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, styled } from '@mui/material';

export interface InfoMetaBlockProps {
	list?: {
		[k: string]: string | React.ReactNode,
	};
}

const Dl = styled('dl')`
	width: 100%;
	display: flex;
	flex-direction: row;
`;
const Dt = styled('dt')`
	width: 40%;
	padding: .05rem .5rem 0 0;
	font-size: .9rem;
	color: rgb(150,150,150);
`;
const Dd = styled('dd')`
	padding: 0;
	flex-grow: 1;
	margin-inline-start: 0;
`;

const InfoMetaBlock = (props: InfoMetaBlockProps) => {
	const {
		list,
	} = props;

	const { t } = useTranslation([ 'common' ]);

	const renderList = useCallback(() => {
		let keys = [];
		for (const key in list) keys.push(key);

		return keys.map((key) => {

			return (
				<Dl key={key}>
					<Dt>
						{t(`label.${key}`)}
					</Dt>
					<Dd>
						{list[key]}
					</Dd>
				</Dl>
			);
		});
	},[ list ]);

	return (
		<Box>
			{renderList()}
		</Box>
	);
};

export default InfoMetaBlock;
