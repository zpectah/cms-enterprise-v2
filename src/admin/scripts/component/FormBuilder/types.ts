export type formMetaItemType =
	| 'text'
	| 'email'
	| 'number'
	| 'datetime'
	| 'password'
	| 'textarea'
	| 'radio'
	| 'checkbox'
	| 'switch'
	| 'toggle'
	| 'select'
	| 'hidden';

export interface formMetaItemProps {
	key: number;
	type: formMetaItemType;
	name: string;
	helpTexts?: string[];
	inputProps: {
		[k: string]: any;
	};
}