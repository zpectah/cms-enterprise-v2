import React, { useCallback, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Box, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { IconButton } from '../Button';
import { Chip } from '../Chip';

export interface PdfDocumentProps {
	src: string;
	afterLoad?: () => void;
}

const PdfDocument = (props: PdfDocumentProps) => {
	const {
		src,
		afterLoad,
	} = props;

	// const [ hovered, setHovered ] = useState(false); // TODO - to custom show controls / paginating
	const [ pdfPagesNum, setPdfPagesNum ] = useState(0);
	const [ pdfPage, setPdfPage ] = useState(1);
	const [ prevDisabled, setPrevDisabled ] = useState(true);
	const [ nextDisabled, setNextDisabled ] = useState(true);

	const loadHandler = ({ numPages }) => {
		setNextDisabled(!(numPages > 1));
		setPdfPagesNum(numPages);
		if (afterLoad) afterLoad();
	};

	const prevTriggerHandler = useCallback(() => {
		const np = pdfPage - 1;
		setNextDisabled(!(np < pdfPagesNum));
		setPrevDisabled(np === 1);
		setPdfPage(np);
	}, [ pdfPage, pdfPagesNum ]);
	const nextTriggerHandler = useCallback(() => {
		const np = pdfPage + 1;
		setNextDisabled(!(np < pdfPagesNum));
		setPrevDisabled(np === 1);
		setPdfPage(np);
	}, [ pdfPage, pdfPagesNum ]);

	return (
		<Box
			sx={{
				width: 'auto',
				height: '100%',
				position: 'relative',
			}}
		>
			<Box
				sx={{
					maxHeight: '100%',
					position: 'relative',
					overflow: 'auto',
				}}
			>
				<Document
					file={src}
					onLoadSuccess={loadHandler}
				>
					<Page
						pageNumber={pdfPage}
					/>
				</Document>
			</Box>
			<Box
				sx={{
					width: '100%',
					height: '50px',
					position: 'absolute',
					bottom: 0,
					left: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Stack
					direction="row"
					spacing={2}
					justifyContent="space-evenly"
					alignItems="center"
					sx={{
						width: '100%',
					}}
				>
					<IconButton
						onClick={prevTriggerHandler}
						disabled={prevDisabled}
						size="small"
					>
						<ArrowBackIcon fontSize="small" />
					</IconButton>
					<Chip
						label={`${pdfPage}/${pdfPagesNum}`}
						size="small"
					/>
					<IconButton
						onClick={nextTriggerHandler}
						disabled={nextDisabled}
						size="small"
					>
						<ArrowForwardIcon fontSize="small" />
					</IconButton>
				</Stack>
			</Box>
		</Box>
	);
};

export default PdfDocument;
