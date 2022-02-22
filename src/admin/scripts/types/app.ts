export type appModel = 'Categories' | 'Members' | 'Menu' | 'MenuItems' | 'Pages' | 'Posts' | 'Tags' | 'Translations' | 'Uploads' | 'Users';

export interface settingsProps {
	comments_anonymous_active?: boolean;
	comments_global_active?: boolean;
	company_address?: string;
	company_bank?: string;
	company_city?: string;
	company_country?: string;
	company_description?: string;
	company_email?: string[];
	company_id?: string;
	company_location?: [number, number];
	company_name?: string;
	company_phone?: number[];
	company_zip?: string;
	form_email_recipients?: string[];
	form_email_sender?: string;
	language_active?: string[];
	language_default?: string;
	language_installed?: string[];
	members_login_active?: boolean;
	members_lostPassword_active?: boolean;
	members_profile_active?: boolean;
	members_register_active?: boolean;
	project_description?: string;
	project_name?: string;
	web_meta_description?: string;
	web_meta_keywords?: string[];
	web_meta_robots?: string;
	web_meta_title?: string;
	web_mode_debug?: boolean;
	web_mode_maintenance?: boolean;
}

