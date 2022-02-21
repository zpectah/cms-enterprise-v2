import { useDispatch } from 'react-redux';

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
			...data,
		})),
		createSuccessToast: (data: toastItemProps) => dispatch(addToast({
			context: 'success',
			...data,
		})),
	};
};
