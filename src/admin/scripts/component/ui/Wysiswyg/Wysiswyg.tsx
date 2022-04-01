import React, { useState } from 'react';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'; // https://blog.logrocket.com/building-rich-text-editors-in-react-using-draft-js-and-react-draft-wysiwyg/
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Box, Stack } from '@mui/material';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import CodeIcon from '@mui/icons-material/Code';

import './wysiwyg.css';
import toolbar from './toolbar';
import { Textarea } from '../Input';
import { Button } from '../Button';

export interface WysiswygProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	error?: boolean;
	required?: boolean;
	id?: string;
	inputRef?: React.Ref<React.ReactNode>;
}

const Wysiswyg = (props: WysiswygProps) => {
	const {
		value,
		onChange,
		placeholder,
		error,
		required,
		id,
		inputRef,
	} = props;

	const [ viewSource, setViewSource ] = useState(false);
	const [ editorState, setEditorState ] = useState(
		value
			? EditorState.createWithContent(
				ContentState.createFromBlockArray(convertFromHTML(value)),
			)
			: EditorState.createEmpty(),
	);
	const handleEditorChange = (state) => {
		setEditorState(state);
		convertContentToHTML();
	};
	const convertContentToHTML = () => {
		let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
		onChange(currentContentAsHTML);
	};

	return (
		<Box
			sx={{
				border: '1px solid rgba(0, 0, 0, 0.23)',
				borderRadius: '4px',
			}}
		>
			{viewSource ? (
				<>
					<Textarea
						value={value}
						onChange={(e) => onChange(e.target.value)}
						placeholder={placeholder}
						id={id}
						required={viewSource && required}
						inputRef={inputRef}
						error={error}
						rows={8}
						sx={{
							'& .MuiOutlinedInput-notchedOutline': {
								borderTop: 0,
								borderLeft: 0,
								borderRight: 0,
								borderRadius: 0,
							},
						}}
					/>
				</>
			) : (
				<>
					<Editor
						editorState={editorState}
						defaultEditorState={editorState}
						onEditorStateChange={handleEditorChange}
						wrapperClassName="wysiwyg--wrapper"
						editorClassName="wysiwyg--editor"
						toolbarClassName="wysiwyg--toolbar"
						placeholder={placeholder}
						id={id}
						required={required}
						toolbar={toolbar}
					/>
				</>
			)}
			<Stack
				direction="row"
				sx={{
					p: '.25rem',
				}}
			>
				<Button
					onClick={() => setViewSource(!viewSource)}
					size="small"
					sx={{
						minWidth: '40px',
					}}
				>
					{viewSource ? (
						<CodeOffIcon fontSize="small" />
					) : (
						<CodeIcon fontSize="small" />
					)}
				</Button>
			</Stack>
		</Box>
	);
};

export default Wysiswyg;
