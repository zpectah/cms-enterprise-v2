import React, { useEffect } from 'react';
import { styled } from '@mui/material';

const Figure = styled('figure')`
	width: auto;
	height: auto;
	margin: 0;
	padding: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Img = styled('img')`
	max-width: 100%;
	height: auto;
	max-height: 100%;
`;

export interface ImageProps {
	src: string;
	srcset?: string;
	alt?: string;
	align?: string;
	border?: string;
	name?: string;
	width?: number;
	height?: number;
	sizes?: string;
	hspace?: number;
	vspace?: number;
	isMap?: boolean;
	useMap?: string;
	longDesc?: string;
	lowsrc?: string;
	decoding?: 'async' | 'sync' | 'auto';
	crossOrigin?: '' | 'anonymous' | 'use-credentials';
	loading?: 'eager' | 'lazy';
	referrerPolicy?: React.HTMLAttributeReferrerPolicy;
	readonly complete?: boolean;
	readonly currentSrc?: string;
	readonly naturalHeight?: number;
	readonly naturalWidth?: number;
	readonly x?: number;
	readonly y?: number;
	decode?(): Promise<void>;
	addEventListener?<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLImageElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
	addEventListener?(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
	removeEventListener?<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLImageElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
	removeEventListener?(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
	style?: React.CSSProperties;
	figureStyle?: React.CSSProperties;
}

const Image = (props: ImageProps) => {
	const {
		src,
		alt,
		figureStyle,
		...rest
	} = props;

	useEffect(() => {
		if (!alt) console.warn(`Alt for image "${src}" is not set!`);
	}, [ alt ]);

	return (
		<Figure
			style={figureStyle}
		>
			<Img
				src={src}
				alt={alt || 'ImageWithoutAlt'}
				{...rest}
			/>
		</Figure>
	);
};

export default Image;
