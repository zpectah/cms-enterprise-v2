import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';

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
			errors,
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

	return (
		<>
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
								rowProps={{
									label: 'Active',
									id: `${formMetaProps.name}_active`,
								}}
								render={({ field }) => {
									const { ref, value, ...rest } = field;

									return (
										<SwitchControlled
											id={`${formMetaProps.name}_active`}
											label="Active"
											checked={value}
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

						<Section>

							<ControlledFormRow
								name="type"
								control={control}
								rules={{ required: true }}
								defaultValue={detailData.type}
								rowProps={{
									label: 'Type',
									id: `${formMetaProps.name}_type`,
									required: true,
								}}
								render={({ field, fieldState }) => {
									const { ref, ...rest } = field;
									const { error } = fieldState;

									return (
										<Input
											label="Type"
											placeholder="Select Type"
											id={`${formMetaProps.name}_type`}
											error={!!error}
											required
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
									label: 'Email',
									id: `${formMetaProps.name}_email`,
									required: true,
								}}
								render={({ field, fieldState }) => {
									const { ref, ...rest } = field;
									const { error } = fieldState;

									return (
										<Input
											type="email"
											label="Email"
											placeholder="Type Email"
											id={`${formMetaProps.name}_email`}
											error={!!error}
											required
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
