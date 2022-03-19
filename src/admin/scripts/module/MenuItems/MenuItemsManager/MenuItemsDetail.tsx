import React from 'react';

import { MenuItemsItemModel } from '../../../types/model/MenuItems';
import {
	Dialog,
} from '../../../component/ui';

export interface MenuItemsDetailProps {
	open: boolean;
	onClose: () => void;
	detailData: MenuItemsItemModel | null;
	menuId: number;
	// onSubmit: (master: MenuItemsItemModel) => Promise<unknown>;
	onSubmit: (master: MenuItemsItemModel) => void; // TODO
}

const MenuItemsDetail = (props: MenuItemsDetailProps) => {
	const {
		open,
		onClose,
		detailData,
		menuId,
		onSubmit,
	} = props;

	return (
		<Dialog
			open={open}
			onClose={onClose}
		>
			<div>
				... MenuItemsDetail ... {JSON.stringify(detailData, null, 2)}
			</div>
		</Dialog>
	);
};

export default MenuItemsDetail;
