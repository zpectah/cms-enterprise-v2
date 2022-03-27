import React from 'react';
import {
	Box,
	Card,
	Typography,
	Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { MenuItemsItemModel } from '../../../types/model/MenuItems';
import {
	IconButton,
	Chip,
	Switch,
} from '../../../component/ui';

export interface MenuItemsListItemProps {
	detail: MenuItemsItemModel;
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
	onToggle: (id: number) => Promise<unknown>;
}

const MenuItemsListItem = (props: MenuItemsListItemProps) => {
	const {
		detail,
		onEdit,
		onDelete,
		onToggle,
	} = props;

	const editHandler = () => onEdit(detail.id as number);
	const deleteHandler = () => onDelete(detail.id as number);
	const toggleHandler = () => onToggle(detail.id as number);

	return (
		<Box
			sx={{ mb: 2 }}
		>
			<Card
				sx={{ p: 2 }}
			>
				<Stack
					direction="row"
					spacing={2}
					alignItems="center"
					justifyContent="space-between"
				>
					<Stack
						direction="row"
						spacing={2}
					>
						<Chip
							label={detail.item_order}
							size="small"
							variant="outlined"
						/>
						<Typography
							variant="h5"
							onClick={editHandler}
							sx={{
								cursor: 'pointer',
								opacity: detail.active ? 1 : .5,
							}}
						>
							{detail.name}
						</Typography>
					</Stack>
					<Stack
						direction="row"
						spacing={2}
						alignItems="center"
					>
						<Switch
							checked={detail.active}
							onClick={toggleHandler}
							size="small"
							sx={{
								mr: 2,
							}}
						/>
						<IconButton
							onClick={editHandler}
							size="small"
						>
							<EditIcon />
						</IconButton>
						<IconButton
							onClick={deleteHandler}
							size="small"
							color="warning"
						>
							<DeleteOutlineIcon />
						</IconButton>
					</Stack>
				</Stack>
			</Card>
			{detail.children.length > 0 && (
				<Box
					sx={{
						mt: 1,
						pl: 2,
					}}
				>
					{detail.children.map((child) => (
						<MenuItemsListItem
							key={child.id}
							detail={child}
							onEdit={onEdit}
							onDelete={onDelete}
							onToggle={onToggle}
						/>
					))}
				</Box>
			)}

		</Box>
	);
};

export default MenuItemsListItem;
