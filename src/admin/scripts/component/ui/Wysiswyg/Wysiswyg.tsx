import React, { useState } from 'react';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'; // https://blog.logrocket.com/building-rich-text-editors-in-react-using-draft-js-and-react-draft-wysiwyg/
import { convertToHTML } from 'draft-convert';
// import createInlineToolbarPlugin, { Separator }  from 'draft-js-inline-toolbar-plugin';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Box } from '@mui/material';

import './wysiwyg.css';
import toolbar from './toolbar';
import { Textarea } from '../Input';

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

	const [editorState, setEditorState] = useState(
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
		<Box>
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
					ref={inputRef}
					blockRendererFn={(block) => {
						console.log('fn', block);

						return block;
					}}
				/>
			</>
			<>
				<Textarea
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
			</>
		</Box>
	);
};

export default Wysiswyg;
