import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface TextPreloaderProps {
	label?: string;
	interval?: number;
	maxDots?: number;
}

const TextPreloader = (props: TextPreloaderProps) => {
	const {
		label,
		interval = 350,
		maxDots = 3,
	} = props;

	const { t } = useTranslation();
	const [ dots, setDots ] = useState('');

	useEffect(() => {
		const timer = setInterval(() => {
			setDots((prev) => {
				if (prev.length < maxDots) {
					return prev + '.';
				} else {
					return '';
				}
			});
		}, interval);

		return () => clearInterval(timer);
	},[]);

	return (
		<>{label ? label : t('label.loading')}{dots}</>
	);
};

export default TextPreloader;
