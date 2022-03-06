import { useDispatch } from 'react-redux';
import { TFunction } from 'i18next';

import {
	TOAST_TIMEOUT_SUCCESS,
	TOAST_TIMEOUT_ERROR,
} from '../constants';
import { toastItemProps } from '../types/common';
import { addToast } from '../store/actions';

type responseToastProps = {
	message: string,
	status: string,
	t: TFunction,
};

const getResponseToast = (data: responseToastProps) => {
	const context = data.status === 'ok' ? 'success' : 'error';
	const title = data.t(`messages:api.${data.message}`);

	return {
		title,
		context,
		timeout: TOAST_TIMEOUT_SUCCESS,
	};
};

const useToasts = () => {
	const dispatch = useDispatch();

	return {
		createToast: (data: toastItemProps) => dispatch(addToast({
			context: 'default',
			...data,
		})),
		createErrorToast: (data: toastItemProps) => dispatch(addToast({
			context: 'error',
			timeout: TOAST_TIMEOUT_ERROR,
			...data,
		})),
		createSuccessToast: (data: toastItemProps) => dispatch(addToast({
			context: 'success',
			timeout: TOAST_TIMEOUT_SUCCESS,
			...data,
		})),
		createApiResponseToast: (data: responseToastProps) => dispatch(addToast(getResponseToast(data))),
	};
};

export default useToasts;
