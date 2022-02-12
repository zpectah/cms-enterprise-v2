import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EMAIL_REGEX } from '../../constants';
import { UsersItemProps } from '../../types/model';
import { submitMethodProps } from '../../types/common';
import getDetailData from '../../utils/getDetailData';
import {
	SubmitButton,
	DeleteButton,
	ConfirmDialog,
	DetailFormLayout,
	Section,
	Input,
	SwitchControlled,
	BlockPreloader,
	LinearPreloader,
	ControlledFormRow,
} from '../../component/ui';

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
	const { t } = useTranslation(['form']);
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

	return (
		<>
			{loading && <LinearPreloader />}
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
								rowProps={{
									label: t('form:label.type'),
									id: `${formMetaProps.name}_type`,
									required: true,
								}}
								render={({ field, fieldState }) => {
									const { ref, ...rest } = field;
									const { error } = fieldState;

									return (
										<Input
											label={t('form:label.type')}
											placeholder={t('form:placeholder.type')}
											id={`${formMetaProps.name}_type`}
											error={!!error}
											required
											inputRef={ref}
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
								rowProps={{
									label: t('form:label.email'),
									id: `${formMetaProps.name}_email`,
									required: true,
								}}
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
