import React from 'react';
import { useTranslation } from 'react-i18next';

export interface LoadingTextProps {
	label?: string;
}

const LoadingText = (props: LoadingTextProps) => {
	const { label } = props;

	const { t } = useTranslation();

	return (
		<>{label ? label : t('label.loading')} ...</>
	);
};

export default LoadingText;
