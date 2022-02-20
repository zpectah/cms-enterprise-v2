import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';

import {
	Form,
	Tabs,
	TabPanel,
	Section,
	ControlledFormRow,
	Input,
} from '../../component/ui';
import { EMAIL_REGEX } from '../../constants';
import routes from '../../routes';

interface SettingsFormProps {}

const SettingsForm = (props: SettingsFormProps) => {
	const {} = props;

	const { t } = useTranslation();
	const params = useParams();
	const navigate = useNavigate();
	const [ panelValue, setPanelValue ] = useState<number>(0);

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

	const panelOptions = [
		{
			index: 0,
			key: 'global',
			label: 'Global',
		},
		{
			index: 1,
			key: 'web',
			label: 'Web',
		},
		{
			index: 2,
			key: 'content',
			label: 'Content',
		},
		{
			index: 3,
			key: 'maintenance',
			label: 'Maintenance',
		},
	];

	const panelChangeHandler = (e, value: number) => navigate(`/admin/app/${routes.settings.path}/${panelOptions[value].key}`);

	const submitHandler = (data: any) => {
		const master = _.cloneDeep(data);
		console.log('submitHandler', master);
	};

	const formMetaProps = {
		name: 'UsersDetailForm',
		onSubmit: handleSubmit(submitHandler),
	};

	useEffect(() => {
		if (params['*']) {
			panelOptions.map((panel) => {
				if (params['*'] === panel.key) setPanelValue(panel.index);
			});
		} else {
			navigate(`/admin/app/${routes.settings.path}/${panelOptions[0].key}`);
		}
	}, [ params ]);

	return (
		<Form {...formMetaProps}>

			<Tabs
				labels={[
					panelOptions[0].label,
					panelOptions[1].label,
					panelOptions[2].label,
					panelOptions[3].label,
				]}
				activeValue={panelValue}
				onChange={panelChangeHandler}
			>
				<TabPanel
					index={panelOptions[0].index}
					panelValue={panelValue}
				>
					<>
						<Section>

							... global content ...

						</Section>
					</>
				</TabPanel>
				<TabPanel
					index={panelOptions[1].index}
					panelValue={panelValue}
				>
					<>
						<Section>

							... web content ...

						</Section>
					</>
				</TabPanel>
				<TabPanel
					index={panelOptions[2].index}
					panelValue={panelValue}
				>
					<>
						<Section>

							... content content ...

						</Section>
					</>
				</TabPanel>
				<TabPanel
					index={panelOptions[3].index}
					panelValue={panelValue}
				>
					<>
						<Section>

							... maintenance content ...

						</Section>
					</>
				</TabPanel>
			</Tabs>

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
		</Form>
	);
};

export default SettingsForm;
