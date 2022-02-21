import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { appStoreProps } from '../../types/store';
import { toastItemProps } from '../../types/common';
import { removeToast } from '../../store/actions';
import ToastsLists from './ToastsLists';
import { ToastItemProps } from './ToastItem';

const Toasts = () => {
	const { toasts } = useSelector((store: appStoreProps) => store);
	const dispatch = useDispatch();
	const [ itemsList, setItemsList ] = useState<toastItemProps[]>(toasts);

	useEffect(() => setItemsList(toasts), [toasts]);

	const removeHandler = (data) => {
		dispatch(removeToast(data));
	};

	return (
		<ToastsLists
			items={itemsList as ToastItemProps[]}
			onRemove={removeHandler}
		/>
	);
};

export default Toasts;
