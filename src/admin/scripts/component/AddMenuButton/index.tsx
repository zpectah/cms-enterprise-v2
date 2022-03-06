import React, { useCallback } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import useBreadcrumbs from '../../hooks/useBreadcrumbs';
import {
	ButtonGroup,
	SuccessButton,
	AddButton,
	DropdownMenu,
} from '../ui';

export interface AddMenuButtonProps {
	addLabel?: string;
	addCallback?: () => void;
}

const AddMenuButton = (props: AddMenuButtonProps) => {
	const {
		addLabel,
		addCallback,
	} = props;

	const { page } = useBreadcrumbs();

	const getOptions = useCallback(() => {
		const options = [
			{
				key: 'users',
				label: 'new user',
				onClick: () => { console.log('...') },
				hidden: page === 'users',
			},
			{
				key: 'pages',
				label: 'new page',
				onClick: () => { console.log('...') },
				hidden: page === 'pages',
			},
			{
				key: 'posts',
				label: 'new post',
				onClick: () => { console.log('...') },
				hidden: page === 'posts',
			},
			{
				key: 'categories',
				label: 'new category',
				onClick: () => { console.log('...') },
				hidden: page === 'categories',
			},
			{
				key: 'tags',
				label: 'new tag',
				onClick: () => { console.log('...') },
				hidden: page === 'tags',
			},
			{
				key: 'uploads',
				label: 'new upload',
				onClick: () => { console.log('...') },
				hidden: page === 'uploads',
			},
			{
				key: 'menu',
				label: 'new menu',
				onClick: () => { console.log('...') },
				hidden: page === 'menu',
			},
			{
				key: 'members',
				label: 'new member',
				onClick: () => { console.log('...') },
				hidden: page === 'members',
			},
			{
				key: 'messages',
				label: 'new message',
				onClick: () => { console.log('...') },
				hidden: page === 'messages',
			},
			{
				key: 'translations',
				label: 'new translation',
				onClick: () => { console.log('...') },
				hidden: page === 'translations',
			},
		];

		return options;
	}, [ page ]);

	return (
		<>
			<DropdownMenu
				id="AddMenuButton"
				renderButton={(renderProps, open) => {
					const { ...rest } = renderProps;

					return (
						<ButtonGroup
						>
							<AddButton
								label={addLabel}
								onClick={addCallback}
							/>
							<SuccessButton
								sx={{
									paddingLeft: '.5rem',
									paddingRight: '.5rem',
								}}
								{...rest}
							>
								{open ? (
									<ExpandLessIcon fontSize="small" />
								) : (
									<ExpandMoreIcon fontSize="small" />
								)}
							</SuccessButton>

						</ButtonGroup>
					);
				}}
				options={getOptions()}
			/>
		</>
	);
};

export default AddMenuButton;
