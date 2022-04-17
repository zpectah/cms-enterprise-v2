import React, { useMemo } from 'react';

import cmsLogoSm from '../../../../assets/cms-logo-sm.svg';
import cmsLogoLg from '../../../../assets/cms-logo-lg.svg';

export interface CmsLogoProps {
	size?: 'sm' | 'lg';
}

const CmsLogo = (props: CmsLogoProps) => {
	const {
		size = 'sm',
	} = props;

	const renderLogo = useMemo(() => {
		switch (size) {

			case 'sm':
				return (
					<img
						src={cmsLogoSm}
						alt="CMS logo"
						style={{
							maxWidth: '75px',
							height: 'auto',
						}}
						loading="lazy"
					/>
				);

			case 'lg':
				return (
					<img
						src={cmsLogoLg}
						alt="CMS logo"
						style={{
							maxWidth: '225px',
							height: 'auto',
						}}
						loading="lazy"
					/>
				);

		}
	}, [ size ]);

	return (
		<>
			{renderLogo}
		</>
	);
};

export default CmsLogo;
