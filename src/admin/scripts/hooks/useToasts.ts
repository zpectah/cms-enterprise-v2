import { useDispatch } from 'react-redux';

import {
	TOAST_TIMEOUT_SUCCESS,
	TOAST_TIMEOUT_ERROR,
} from '../constants';
import { toastItemProps } from '../types/common';
import { addToast } from '../store/actions';

export default () => {
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
	};
};
