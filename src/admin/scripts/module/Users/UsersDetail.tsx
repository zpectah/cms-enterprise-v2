import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';

import { UsersItemProps } from '../../types/model';
import { submitMethodProps } from '../../types/common';
import getDetailData from '../../utils/getDetailData';
import {
	SubmitButton,
	DeleteButton,
	ConfirmDialog,
	DetailFormLayout,
	Section,
	FormRow,
	Input,
	SwitchControlled,
	BlockPreloader,
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
	const [ formErrors, setFormErrors ] = useState({});

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

	const handleFormErrors = () => {
		// TODO ... some handler ...
		console.log('handle form errors', errors, isDirty, isValid);
	};

	const formMetaProps = {
		name: 'UsersDetailForm',
		onSubmit: handleSubmit(submitHandler),
	};

	useEffect(handleFormErrors, [ errors, isDirty, isValid ]);
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

							<Controller
								name="active"
								control={control}
								rules={{}}
								defaultValue={detailData.active}
								render={({ field }) => {
									const { ref, value, ...rest } = field;

									return (
										<FormRow
											label="Active"
											id={`${formMetaProps.name}_active`}
										>
											<SwitchControlled
												id={`${formMetaProps.name}_active`}
												label="Active"
												checked={value}
												{...rest}
											/>
										</FormRow>
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

							<Controller
								name="type"
								control={control}
								rules={{ required: true }}
								defaultValue={detailData.type}
								render={({ field }) => {
									const { ref, ...rest } = field;

									return (
										<FormRow
											label="Type"
											id={`${formMetaProps.name}_type`}
											required={true}
										>
											<Input
												label="Type"
												placeholder="Select Type"
												required={true}
												id={`${formMetaProps.name}_type`}
												{...rest}
											/>
										</FormRow>
									);
								}}
							/>

							<Controller
								name="email"
								control={control}
								rules={{ required: true }}
								defaultValue={detailData.email}
								render={({ field }) => {
									const { ref, ...rest } = field;

									return (
										<FormRow
											label="Email"
											id={`${formMetaProps.name}_email`}
											required={true}
										>
											<Input
												type="email"
												label="Email"
												placeholder="Type Email"
												required={true}
												id={`${formMetaProps.name}_email`}
												{...rest}
											/>
										</FormRow>
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
