import React from 'react';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import {
	Form,
	Section,
	ControlledFormRow,
	Input,
} from '../../component/ui';
import { EMAIL_REGEX } from '../../constants';

interface SettingsFormProps {}

const SettingsForm = (props: SettingsFormProps) => {
	const {} = props;
	const { t } = useTranslation();

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
		defaultValues: {},
	});

	const submitHandler = (data: any) => {
		const master = _.cloneDeep(data);
		console.log('submitHandler', master);
	};

	const formMetaProps = {
		name: 'UsersDetailForm',
		onSubmit: handleSubmit(submitHandler),
	};

	return (
		<Form {...formMetaProps}>
			<Section>

				<ControlledFormRow
					name="type"
					control={control}
					rules={{ required: true }}
					defaultValue={''}
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
					defaultValue={''}
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
			SettingsForm
		</Form>
	);
};

export default SettingsForm;
