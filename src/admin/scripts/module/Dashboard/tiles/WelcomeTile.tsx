import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Typography,
	Stack,
} from '@mui/material';

import { date } from '../../../../../../utils/helpers';
import { utilsDateObjectProps } from '../../../types/common';
import useSettings from '../../../hooks/useSettings';
import TileBase, { TileBaseProps } from './TileBase';

export interface WelcomeTileProps extends TileBaseProps {}

const WelcomeTile = (props: WelcomeTileProps) => {
	const {
		...rest
	} = props;

	const { t } = useTranslation([ 'common', 'components' ]);
	const { settings } = useSettings();
	const [ time, setTime ] = useState<utilsDateObjectProps>(date.getTodayObject());

	const interval = 1000;
	let timer: any = null;

	useEffect(() => {
		timer = setInterval(() => {
			let today = date.getTodayObject();

			setTime(today);
		}, interval);

		return () => clearInterval(timer);
	}, []);

	return (
		<TileBase
			// title="Tile title"
			// subheader="Tile subheader"
			// dividers
			// headingNode={
			// 	<>
			// 		<div>
			// 			node
			// 		</div>
			// 		<div>
			// 			node
			// 		</div>
			// 	</>
			// }
			// footerNode={
			// 	<>
			// 		kjdfhgk sdjfhg ksdjfhg ksdjhfg
			// 	</>
			// }
			contentSx={{
				p: 3,
			}}
			{...rest}
		>

			<Stack
				spacing={2}
			>
				<Stack>
					<Typography
						variant="h3"
					>
						{t('components:WelcomeTile.title')}
						&nbsp;
						{settings?.web_meta_title}
					</Typography>
				</Stack>
				<Stack>
					<Typography
						variant="caption"
					>
						{t('components:WelcomeTile.today_is')}
					</Typography>
					<Typography>
						{t(`common:calendar.day.${time.dayOfTheWeek}`)} {time.day}
						.{' '}
						{t(`common:calendar.month.${time.month}`)} {time.year}{' '}
						|{' '}
						{time.hour}
						<span>:</span>
						{time.minute}
						<span>:</span>
						{time.second}
					</Typography>
				</Stack>
			</Stack>

		</TileBase>
	);
};

export default WelcomeTile;
