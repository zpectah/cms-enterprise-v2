import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { Controller } from 'react-hook-form';

import { UsersItemProps } from '../../types/model';
import { submitMethodProps } from '../../types/common';
import getDetailData from '../../utils/getDetailData';
import {
	ConfirmDialog,
	FormControlled,
	Section,
	FormRow,
	Input,
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

	const formProps = {
		name: 'UsersDetailForm',
		onChange: (data) => {
			console.log('new form has changed ...', data)
		},
		useFormProps: {
			defaultValues: detailData,
		},
	};

	const submitHandler = (data: UsersItemProps) => {
		const master = _.cloneDeep(data);
		const method: submitMethodProps = master.id == 'new' ? 'create' : 'update';
		onSubmit(method, master).then((resp) => {
			// TODO: after submit ...
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

	useEffect(() => setDetailData(getDetailData('Users', dataItems, params.id)), [ dataItems, params ]);

	return (
		<>
			{detailData && (
				<FormControlled {...formProps}>
					{({ control }) => (
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
											id={`${formProps.name}_type`}
											required={true}
										>
											<Input
												label="Type"
												placeholder="Select Type"
												required={true}
												id={`${formProps.name}_type`}
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
											id={`${formProps.name}_email`}
											required={true}
										>
											<Input
												type="email"
												label="Email"
												placeholder="Type Email"
												required={true}
												id={`${formProps.name}_email`}
												{...rest}
											/>
										</FormRow>
									);
								}}
							/>
						</Section>
					)}
				</FormControlled>
			)}
			<pre>
				<code>
					{JSON.stringify(detailData, null, 2)}
				</code>
			</pre>
			<ConfirmDialog
				context="delete"
				isOpen={confirmOpen}
				confirmData={confirmData}
				onConfirm={deleteConfirmHandler}
				onClose={closeConfirmHandler}
			/>
		</>
	);
};

export default UsersDetail;
