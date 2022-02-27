import React from 'react';
import Skeleton, { SkeletonProps } from '@mui/material/Skeleton';

export interface SkeletonPreloaderProps extends SkeletonProps {}

const SkeletonPreloader = (props: SkeletonPreloaderProps) => {
	const {
		...rest
	} = props;

	return (
		<Skeleton
			{...rest}
		/>
	);
};

export default SkeletonPreloader;
