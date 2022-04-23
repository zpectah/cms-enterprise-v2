
SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `name` text NOT NULL,
  `parent` varchar(32) NOT NULL,
  `img_main` text NOT NULL,
  `img_thumbnail` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `cms_requests`;
CREATE TABLE `cms_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `context` tinytext NOT NULL,
  `value` tinytext NOT NULL,
  `token` text NOT NULL,
  `ip_address` tinytext NOT NULL,
  `status` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `cms_settings`;
CREATE TABLE `cms_settings` (
  `name` text NOT NULL,
  `value` text NOT NULL,
  `format` tinytext NOT NULL,
  `type` tinytext NOT NULL,
  `context` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `cms_settings` (`name`, `value`, `format`, `type`, `context`) VALUES
('project_name',	'YOUR PROJECT NAME',	'string',	'app',	'project'),
('project_description',	'YOUR PROJECT DESCRIPTION',	'string',	'app',	'project'),
('language_installed',	'',	'array',	'app',	'language'),
('language_active',	'',	'array',	'app',	'language'),
('language_default',	'',	'string',	'app',	'language'),
('web_meta_title',	'WEB TITLE',	'string',	'app',	'web'),
('web_meta_description',	'YOUR WEB META DESCRIPTION',	'string',	'app',	'web'),
('web_meta_robots',	'all',	'string',	'app',	'web'),
('web_meta_keywords',	'key1,key2,key3',	'array',	'app',	'web'),
('web_mode_maintenance',	'false',	'boolean',	'app',	'web'),
('web_mode_debug',	'true',	'boolean',	'app',	'web'),
('company_name',	'YOUR COMPANY NAME',	'string',	'app',	'company'),
('company_description',	'YOUR COMPANY DESCRIPTION',	'string',	'app',	'company'),
('company_id',	'ID123456789',	'string',	'app',	'company'),
('company_address',	'YOUR COMPANY ADDRESS 333/10',	'string',	'app',	'company'),
('company_city',	'YOUR COMPANY CITY',	'string',	'app',	'company'),
('company_country',	'YOUR COMPANY COUNTRY',	'string',	'app',	'company'),
('company_zip',	'',	'string',	'app',	'company'),
('company_location',	'',	'array',	'app',	'company'),
('company_email',	'',	'array',	'app',	'company'),
('company_phone',	'',	'array',	'app',	'company'),
('company_bank',	'',	'string',	'app',	'company'),
('form_email_sender',	'noreply@example.example',	'string',	'app',	'web'),
('form_email_recipients',	'noreply@example.example',	'array',	'app',	'web'),
('comments_global_active',	'true',	'boolean',	'app',	'web'),
('comments_anonymous_active',	'true',	'boolean',	'app',	'web'),
('members_register_active',	'true',	'boolean',	'app',	'members'),
('members_login_active',	'true',	'boolean',	'app',	'members'),
('members_lostPassword_active',	'true',	'boolean',	'app',	'members'),
('members_profile_active',	'true',	'boolean',	'app',	'members'),
('members_enabled',	'true',	'boolean',	'app',	'members'),
('messages_global_active',	'true',	'boolean',	'app',	'members'),
('messages_anonymous_active',	'true',	'boolean',	'app',	'members'),
('social_url_facebook',	'',	'string',	'app',	'web'),
('social_url_twitter',	'',	'string',	'app',	'web'),
('social_url_linkedin',	'',	'string',	'app',	'web'),
('social_url_youtube',	'',	'string',	'app',	'web'),
('social_url_twitch',	'',	'string',	'app',	'web'),
('social_url_github',	'',	'string',	'app',	'web');

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `email` text NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `ip_address` varchar(32) NOT NULL,
  `assigned` tinytext NOT NULL,
  `assigned_id` int(11) NOT NULL,
  `parent` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `email` text NOT NULL,
  `phone` text NOT NULL,
  `name_first` text NOT NULL,
  `name_last` text NOT NULL,
  `nickname` text NOT NULL,
  `password` text NOT NULL,
  `position` text NOT NULL,
  `address` text NOT NULL,
  `city` text NOT NULL,
  `country` text NOT NULL,
  `zip` text NOT NULL,
  `item_group` tinytext NOT NULL,
  `img_avatar` longtext NOT NULL,
  `phone_alt` text NOT NULL,
  `email_alt` text NOT NULL,
  `description` text NOT NULL,
  `sex` tinytext NOT NULL,
  `birthdate` tinytext NOT NULL,
  `ip_address` tinytext NOT NULL,
  `subscription` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `name` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `menu_items`;
CREATE TABLE `menu_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `name` text NOT NULL,
  `page_id` varchar(32) NOT NULL,
  `path_url` text NOT NULL,
  `link_custom_key` tinytext NOT NULL,
  `menu_id` int(11) NOT NULL,
  `parent` varchar(32) NOT NULL,
  `item_order` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `sender` text NOT NULL,
  `recipients` text NOT NULL,
  `subject` text NOT NULL,
  `content` text NOT NULL,
  `ip_address` varchar(32) NOT NULL,
  `email_sent` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pages`;
CREATE TABLE `pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `name` text NOT NULL,
  `type_id` varchar(32) NOT NULL,
  `meta_robots` tinytext NOT NULL,
  `page_elements` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `name` text NOT NULL,
  `categories` text NOT NULL,
  `tags` text NOT NULL,
  `event_start` text NOT NULL,
  `event_end` text NOT NULL,
  `event_location` text NOT NULL,
  `event_address` text NOT NULL,
  `event_city` text NOT NULL,
  `event_country` text NOT NULL,
  `event_zip` text NOT NULL,
  `attachments` text NOT NULL,
  `media` varchar(32) NOT NULL,
  `links` text NOT NULL,
  `img_main` text NOT NULL,
  `img_thumbnail` text NOT NULL,
  `published` text NOT NULL,
  `author` int(11) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `template` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `name` text NOT NULL,
  `color` tinytext NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `translations`;
CREATE TABLE `translations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `name` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `uploads`;
CREATE TABLE `uploads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `name` text NOT NULL,
  `file_name` text NOT NULL,
  `file_extension` tinytext NOT NULL,
  `file_mime` tinytext NOT NULL,
  `file_size` varchar(32) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `name_first` text NOT NULL,
  `name_last` text NOT NULL,
  `nickname` text NOT NULL,
  `item_group` tinytext NOT NULL,
  `img_avatar` longtext NOT NULL,
  `description` text NOT NULL,
  `item_level` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `type`, `email`, `password`, `name_first`, `name_last`, `nickname`, `item_group`, `img_avatar`, `description`, `item_level`, `active`, `deleted`) VALUES
(1,	'default',	'admin@user.demo',	'$argon2id$v=19$m=2048,t=4,p=3$UlAySWhiMDBiNGN0Zy9Beg$IfTz+NwKWvltE7HXSHwvOFCfdLWZuLNo+MWuwynZyUY',	'admin',	'admin',	'admin',	'company',	'',	'',	7,	1,	0);

DROP TABLE IF EXISTS `visitor_blacklist`;
CREATE TABLE `visitor_blacklist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `visitor_email` text NOT NULL,
  `visitor_ip` text NOT NULL,
  `cause` text NOT NULL,
  `description` text NOT NULL,
  `status` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
