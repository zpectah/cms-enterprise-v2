import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../routes';
import { TranslationsItemProps } from '../../types/model';
import PageHeading from '../../component/PageHeading';
import DataTable from '../../component/DataTable';
import { BarPreloader } from '../../component/ui';

interface TranslationsListProps {
	dataItems: TranslationsItemProps[];
	onToggle: (master: number[]) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
}

const TranslationsList = (props: TranslationsListProps) => {
	const {
		dataItems = [],
		onToggle,
		onDelete,
		loading,
	} = props;

	const tableOptions = {
		id: 'TranslationsDataTable',
		root: `/admin/app/${routes.translations.path}`,
	};

	const { t } = useTranslation(['common', 'pages']);
	const navigate = useNavigate();

	return (
		<>
			<PageHeading
				title={t(`pages:translations.page_title`)}
				createButtonLabel={t('model_new.Translations')}
				createButtonPath={`${tableOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			<DataTable
				model="Translations"
				id={tableOptions.id}
				rows={dataItems}
				columns={{
					id: ['center', '100px'],
					name: ['left', 'auto'],
					type: ['left', '150px'],
					active: ['right', '125px'],
				}}
				searchProps={[
					'name',
					'lang.[lang].value',
				]}
				onDetail={(id) => navigate(`${tableOptions.root}/detail/${id}`)}
				onToggle={onToggle}
				onDelete={onDelete}
				loading={loading}
			/>
		</>
	);
};

export default TranslationsList;
