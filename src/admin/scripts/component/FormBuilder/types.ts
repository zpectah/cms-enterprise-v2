export type formMetaItemType =
	| 'text'
	| 'textarea'
	| 'email'
	| 'datetime'
	| 'password'
	| 'radio'
	| 'checkbox'
	| 'switch'
	| 'toggle'
	| 'select';

export interface formMetaItemProps {
	key: number;
	type: formMetaItemType;
	name: string;
	helpTexts?: string[];
	inputProps: {
		[k: string]: any;
	};
}