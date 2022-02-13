import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import routes from '../../routes';
import { EMAIL_REGEX, USER_LEVEL_KEYS } from '../../constants';
import { UsersItemProps } from '../../types/model';
import { submitMethodProps } from '../../types/common';
import getDetailData from '../../utils/getDetailData';
import PageHeading from '../../component/PageHeading';
import {
	SubmitButton,
	DeleteButton,
	ConfirmDialog,
	DetailFormLayout,
	Section,
	Input,
	Select,
	SwitchControlled,
	BlockPreloader,
	LoadingBar,
	ControlledFormRow,
} from '../../component/ui';
import getOptionsList from '../../utils/getOptionsList';

interface UsersDetailProps {
	dataItems: UsersItemProps[];
	onSubmit: (method: submitMethodProps, data: UsersItemProps) => Promise<unknown>;
	onDelete: (ids: (string | number)[]) => Promise<unknown>;
	loading: boolean;
}

const UsersDetail = (props: UsersDetailProps) => {
	const {
		dataItems = [],
		onSubmit,
		onDelete,
		loading,
	} = props;
	const { t } = useTranslation(['form', 'types']);
	const params = useParams();
	const [ detailData, setDetailData ] = useState<UsersItemProps>(null);
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);
	const [ confirmData, setConfirmData ] = useState<(string | number)[]>([]);

	const {
		control,
		register,
		handleSubmit,
		watch,
		formState: {
			isDirty,
			isValid,
		},
	} = useForm({
		mode: 'all',
		defaultValues: detailData,
	});

	const submitHandler = (data: UsersItemProps) => {
		const master = _.cloneDeep(data);
		const method: submitMethodProps = master.id == 'new' ? 'create' : 'update';
		onSubmit(method, master).then((resp) => {
			console.info('After submit', master, resp);
		});
	};
	const deleteHandler = (id: string | number) => {
		setConfirmOpen(true);
		setConfirmData([id]);
	};
	const deleteConfirmHandler = () => {
		onDelete(confirmData).then((resp) => {
			setConfirmOpen(false);
			setConfirmData([]);
		});
	};
	const closeConfirmHandler = () => {
		setConfirmOpen(false);
		setConfirmData([]);
	};

	const formMetaProps = {
		name: 'UsersDetailForm',
		onSubmit: handleSubmit(submitHandler),
	};

	useEffect(() => setDetailData(getDetailData('Users', dataItems, params.id)), [ dataItems, params ]);

	const watchType = watch('type');

	const getOptionsType = useCallback(
		() => getOptionsList(config.options.model.Users.type, t),
		[detailData],
	);
	const getOptionsGroup = useCallback(
		() => getOptionsList(config.options.model.Users.group, t),
		[detailData],
	);
	const getOptionsLevel = useCallback(() => {
		let options = [];
		config.options.model.Users.level.map((type) => {
			options.push({
				label: t(`types:${type}`),
				value: USER_LEVEL_KEYS[type],
				disabled: 7 < USER_LEVEL_KEYS[type],
			});
		});

		return options;
	}, [detailData]);


	return (
		<>
			<PageHeading
				title={detailData?.id == 'new' ? 'New user' : detailData?.email}
				returnTo={`/admin/app/${routes.users.path}`}
			/>

			{loading && <LoadingBar />}
			{detailData ? (
				<DetailFormLayout
					{...formMetaProps}
					actionsNode={
						<>
							<SubmitButton disabled={(isDirty && !isValid)} />
							<DeleteButton
								onClick={() => deleteHandler(detailData.id)}
							/>
						</>
					}
					sidebarNode={
						<>

							<ControlledFormRow
								name="active"
								control={control}
								rules={{}}
								defaultValue={detailData.active}
								render={({ field }) => {
									const { ref, value, ...rest } = field;

									return (
										<SwitchControlled
											id={`${formMetaProps.name}_active`}
											label={t('form:label.active')}
											checked={value}
											inputRef={ref}
											{...rest}
										/>
									);
								}}
							/>

						</>
					}
					addonsNode={
						<>
							<pre>
								<code>
									{JSON.stringify(detailData, null, 2)}
								</code>
							</pre>
						</>
					}
				>
					{/* ==================== FORM CONTENT ==================== */}
					<div>

						<input type="hidden" {...register('id')} />

						<Section>

							<ControlledFormRow
								name="type"
								control={control}
								rules={{ required: true }}
								defaultValue={detailData.type}
								render={({ field, fieldState }) => {
									const { ref, ...rest } = field;
									const { error } = fieldState;

									return (
										<Select
											label={t('form:label.type')}
											placeholder={t('form:placeholder.type')}
											id={`${formMetaProps.name}_type`}
											error={!!error}
											required
											inputRef={ref}
											options={getOptionsType()}
											style={{ width: '50%' }}
											{...rest}
										/>
									);
								}}
							/>

							<ControlledFormRow
								name="email"
								control={control}
								rules={{ pattern: EMAIL_REGEX, required: true }}
								defaultValue={detailData.email}
								render={({ field, fieldState }) => {
									const { ref, ...rest } = field;
									const { error } = fieldState;

									return (
										<Input
											type="email"
											label={t('form:label.email')}
											placeholder={t('form:placeholder.email')}
											id={`${formMetaProps.name}_email`}
											error={!!error}
											required
											inputRef={ref}
											style={{ width: '50%' }}
											{...rest}
										/>
									);
								}}
							/>

						</Section>

					</div>
					{/* ==================== \ FORM CONTENT ==================== */}
				</DetailFormLayout>
			) : (
				<BlockPreloader />
			)}
			<ConfirmDialog
				context="delete"
				open={confirmOpen}
				confirmData={confirmData}
				onConfirm={deleteConfirmHandler}
				onClose={closeConfirmHandler}
			/>
		</>
	);
};

export default UsersDetail;
