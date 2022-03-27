import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { profileProps } from '../../types/profile';
import useToasts from '../../hooks/useToasts';
import useProfile from '../../hooks/useProfile';
import PageHeading from '../../component/PageHeading';
import ProfileForm from './ProfileForm';

const ProfileModule = () => {
	const { t } = useTranslation([ 'pages', 'messages' ]);
	const {
		profile,
		profile_loading,
		profile_error,
		reloadProfile,
		updateProfile,
		available_actions,
	} = useProfile();
	const {
		createSuccessToast,
		createErrorToast,
	} = useToasts();

	const submitHandler = (master: profileProps) => {
		return updateProfile(master).then((resp) => {
			createSuccessToast({ title: t('messages:profile.success_update') });
			reloadProfile();

			return resp;
		});
	};

	useEffect(() => {
		if (profile_error) createErrorToast({ title: t('messages:profile.error_data') });
	}, [ profile_error ]);

	return (
		<>
			<PageHeading
				title={t(`pages:profile.page_title`)}
			/>
			<ProfileForm
				data={profile}
				onSubmit={submitHandler}
				loading={profile_loading}
				viewable={available_actions.profile.view}
				editable={available_actions.profile.update}
			/>
		</>
	);
};

export default ProfileModule;
