-- Adminer 4.7.2 MySQL dump

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

INSERT INTO `categories` (`id`, `type`, `name`, `parent`, `img_main`, `img_thumbnail`, `active`, `deleted`) VALUES
(1,	'posts',	'first-category',	'',	'team-skeet-01.jpg',	'team-skeet-01.jpg',	1,	0),
(2,	'posts',	'second-category',	'1',	'scared-devil.png',	'IMG_0195.jpg',	1,	0);

DROP TABLE IF EXISTS `categories__cs_cz`;
CREATE TABLE `categories__cs_cz` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `categories__cs_cz` (`id`, `title`, `description`) VALUES
(1,	'První kategorie',	''),
(2,	'Druhá kategorie',	'gfdh dfhdfghdfgh');

DROP TABLE IF EXISTS `categories__en_us`;
CREATE TABLE `categories__en_us` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `categories__en_us` (`id`, `title`, `description`) VALUES
(1,	'First category',	''),
(2,	'Second category',	'');

DROP TABLE IF EXISTS `cms_requests`;
CREATE TABLE `cms_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `context` tinytext NOT NULL,
  `value` tinytext NOT NULL,
  `token` text NOT NULL,
  `ip_address` varchar(32) NOT NULL,
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
('language_installed',	'cs-CZ,en-US',	'array',	'app',	'language'),
('language_active',	'cs-CZ,en-US',	'array',	'app',	'language'),
('language_default',	'cs-CZ',	'string',	'app',	'language'),
('web_meta_title',	'WEB TITLE',	'string',	'app',	'web'),
('web_meta_description',	'YOUR WEB META DESCRIPTION',	'string',	'app',	'web'),
('web_meta_robots',	'all',	'string',	'app',	'web'),
('web_meta_keywords',	'key1,key2,key3',	'array',	'app',	'web'),
('web_mode_maintenance',	'true',	'boolean',	'app',	'web'),
('web_mode_debug',	'true',	'boolean',	'app',	'web'),
('company_name',	'YOUR COMPANY NAME',	'string',	'app',	'company'),
('company_description',	'YOUR COMPANY DESCRIPTION',	'string',	'app',	'company'),
('company_id',	'ID123456789',	'string',	'app',	'company'),
('company_address',	'YOUR COMPANY ADDRESS 333/10',	'string',	'app',	'company'),
('company_city',	'YOUR COMPANY CITY',	'string',	'app',	'company'),
('company_country',	'YOUR COMPANY COUNTRY',	'string',	'app',	'company'),
('company_zip',	'CZ465465456',	'string',	'app',	'company'),
('company_location',	'14.449727369517,50.045754221915',	'array',	'app',	'company'),
('company_email',	'example2@example.example,example3@example.example',	'array',	'app',	'company'),
('company_phone',	'420123456789,420987654321',	'array',	'app',	'company'),
('company_bank',	'0000/0000',	'string',	'app',	'company'),
('form_email_sender',	'noreply@your-project.example',	'string',	'app',	'web'),
('form_email_recipients',	'sychrat@gmail.com,noreply@example.example',	'array',	'app',	'web'),
('comments_global_active',	'true',	'boolean',	'app',	'web'),
('comments_anonymous_active',	'true',	'boolean',	'app',	'web'),
('members_register_active',	'true',	'boolean',	'app',	'members'),
('members_login_active',	'true',	'boolean',	'app',	'members'),
('members_lostPassword_active',	'true',	'boolean',	'app',	'members'),
('members_profile_active',	'true',	'boolean',	'app',	'members'),
('social_url_facebook',	'https://www.facebook.com',	'string',	'app',	'web'),
('social_url_twitter',	'https://www.twitter.com',	'string',	'app',	'web'),
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

INSERT INTO `comments` (`id`, `type`, `email`, `title`, `content`, `ip_address`, `assigned`, `assigned_id`, `parent`, `status`, `created`) VALUES
(1,	'default',	'emailXY@email.email',	'Some demo comment',	'Demo comment content',	'',	'Posts',	4,	0,	1,	'2022-03-19 13:20:19'),
(2,	'reply',	'emailXY@email.email',	'Replied comment',	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vestibulum libero sit amet finibus tempus. Nunc hendrerit arcu neque, eu aliquet dolor luctus quis. Aliquam ornare, turpis id tincidunt venenatis, magna est ultricies lacus, vitae luctus nunc diam sed nunc. Quisque fringilla ligula metus, a volutpat diam tempus ac. Sed eget ipsum sit amet ante faucibus suscipit. Duis nec tincidunt mauris. Nam maximus iaculis feugiat. Aliquam mi ex, fermentum quis dui vel, ultricies viverra justo.',	'',	'Posts',	4,	1,	1,	'2022-03-19 14:09:03'),
(3,	'default',	'email@email.email',	'sfghdfg dhfg hdfgh',	'dfg hdfgh dfghdfghdfgh',	'',	'Posts',	4,	1,	1,	'2022-03-19 16:37:03'),
(4,	'default',	'email@email.email',	'hjfghj fghj fgh jfghj dhfgj fghj fgjf ghj',	'Mauris commodo quam sit amet neque commodo, eget tincidunt urna ullamcorper. Morbi cursus vel nibh non pharetra. Nulla at eros in odio luctus dignissim nec a erat. Sed congue iaculis augue vel ultricies. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi sed purus a neque scelerisque sodales luctus eu est. Proin tincidunt justo sit amet dapibus ullamcorper. Vestibulum porttitor massa lectus, sit amet ornare nunc sodales ac. Interdum et malesuada fames ac ante ipsum primis in faucibus. In cursus gravida lorem, eu dignissim elit malesuada sit amet.',	'',	'Posts',	4,	2,	1,	'2022-03-19 16:38:45');

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
  `birthdate` text NOT NULL,
  `subscription` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `members` (`id`, `type`, `email`, `phone`, `name_first`, `name_last`, `nickname`, `password`, `position`, `address`, `city`, `country`, `zip`, `item_group`, `img_avatar`, `phone_alt`, `email_alt`, `description`, `sex`, `birthdate`, `subscription`, `active`, `deleted`) VALUES
(1,	'default',	'email@email.com',	'',	'',	'',	'member1',	'',	'',	'',	'',	'',	'',	'unknown',	'',	'',	'email2@email.com',	'',	'male',	'',	0,	1,	0),
(2,	'hidden',	'member2@email.com',	'',	'',	'',	'member2',	'',	'',	'',	'',	'',	'',	'company',	'',	'',	'',	'',	'female',	'',	0,	1,	0);

DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `name` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `menu` (`id`, `type`, `name`, `active`, `deleted`) VALUES
(1,	'custom',	'main-menu',	1,	0);

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

INSERT INTO `menu_items` (`id`, `type`, `name`, `page_id`, `path_url`, `link_custom_key`, `menu_id`, `parent`, `item_order`, `active`, `deleted`) VALUES
(1,	'external',	'first-external-link',	'',	'http://google.com',	'',	1,	'',	1,	1,	0),
(2,	'external',	'submerged-link',	'2',	'http://neco.nekam',	'',	1,	'1',	2,	1,	0),
(3,	'page',	'some-page-link',	'1',	'',	'',	1,	'2',	3,	1,	0);

DROP TABLE IF EXISTS `menu_items__cs_cz`;
CREATE TABLE `menu_items__cs_cz` (
  `id` int(11) NOT NULL,
  `label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `menu_items__cs_cz` (`id`, `label`) VALUES
(1,	'Google'),
(2,	'Neco nekam'),
(3,	'Nějaká stránka');

DROP TABLE IF EXISTS `menu_items__en_us`;
CREATE TABLE `menu_items__en_us` (
  `id` int(11) NOT NULL,
  `label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `menu_items__en_us` (`id`, `label`) VALUES
(1,	'Google'),
(2,	'Something somewhere'),
(3,	'Some page');

DROP TABLE IF EXISTS `menu__cs_cz`;
CREATE TABLE `menu__cs_cz` (
  `id` int(11) NOT NULL,
  `label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `menu__cs_cz` (`id`, `label`) VALUES
(1,	'Hlavní menu');

DROP TABLE IF EXISTS `menu__en_us`;
CREATE TABLE `menu__en_us` (
  `id` int(11) NOT NULL,
  `label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `menu__en_us` (`id`, `label`) VALUES
(1,	'Main menu');

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `sender` text NOT NULL,
  `recipients` text NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `ip_address` varchar(32) NOT NULL,
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

INSERT INTO `pages` (`id`, `type`, `name`, `type_id`, `meta_robots`, `page_elements`, `active`, `deleted`) VALUES
(1,	'default',	'default-page',	'',	'all',	'',	1,	0),
(2,	'category',	'category-page',	'1',	'follow',	'contact_form',	1,	0);

DROP TABLE IF EXISTS `pages__cs_cz`;
CREATE TABLE `pages__cs_cz` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `content` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `pages__cs_cz` (`id`, `title`, `description`, `content`) VALUES
(1,	'Výchozí stránka',	'',	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in tincidunt neque. Nulla sollicitudin consectetur consequat. Aliquam erat volutpat. Nulla aliquet dignissim odio, nec fermentum erat fringilla porta. In hac habitasse platea dictumst. Vestibulum est lacus, fringilla sit amet nulla ut, egestas sagittis augue. Praesent eget lobortis arcu. Sed dapibus interdum ex, sit amet mollis tortor laoreet sed. Vestibulum non consectetur nunc. Aenean ac pulvinar ex. In consectetur et diam non ultricies. Etiam tempor arcu nec mi interdum, eget tempor leo pulvinar. Etiam ac pharetra sem. Vivamus eget feugiat lacus. Duis non augue nec urna consequat fermentum eget non risus. Quisque tempor velit at mollis volutpat.'),
(2,	'Stránka s kategorií',	'',	'');

DROP TABLE IF EXISTS `pages__en_us`;
CREATE TABLE `pages__en_us` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `content` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `pages__en_us` (`id`, `title`, `description`, `content`) VALUES
(1,	'Default page',	'',	'Praesent a lorem erat. Nunc quis velit mollis, euismod ante eget, tempor neque. Phasellus sed hendrerit est, nec sagittis purus. Phasellus finibus leo sagittis ex ornare dictum. Morbi bibendum sagittis leo vel tempor. Maecenas lobortis nulla risus, scelerisque volutpat diam mollis at. Quisque facilisis lacinia quam, a tincidunt turpis elementum gravida. Sed at molestie tortor. In sodales, quam in tempus rutrum, ipsum tortor volutpat leo, eu cursus eros ligula eu urna. Praesent ut neque eleifend, dictum arcu vel, fermentum libero.'),
(2,	'Category page',	'',	'');

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
  `rating` int(11) NOT NULL,
  `template` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `posts` (`id`, `type`, `name`, `categories`, `tags`, `event_start`, `event_end`, `event_location`, `event_address`, `event_city`, `event_country`, `event_zip`, `attachments`, `media`, `links`, `img_main`, `img_thumbnail`, `published`, `author`, `rating`, `template`, `active`, `deleted`) VALUES
(1,	'article',	'first-post',	'2',	'2',	'',	'',	'0,0',	'',	'',	'',	'',	'10,11,5',	'',	'http://www.some-link.com',	'pluto.jpeg',	'7ajjMf5.jpeg',	'2022-03-08T16:49:12.000+01:00',	1,	0,	0,	1,	0),
(2,	'blog',	'blog-post',	'1',	'1',	'',	'',	'0,0',	'',	'',	'',	'',	'14,15,16',	'',	'',	'9pFRwJB.jpeg',	'9pFRwJB.jpeg',	'2022-03-11T16:48:55.000+01:00',	1,	0,	0,	1,	0),
(3,	'event',	'event-post',	'1',	'2,4',	'2022-03-12T16:26:22.000+01:00',	'2022-03-20T16:26:27.000+01:00',	'14.501346284326,50.083092212966',	'',	'',	'',	'',	'4,5,6,7,8',	'',	'',	'team-skeet-01.jpg',	'IMG_0195.jpg',	'2022-03-20T16:27:07.000+01:00',	1,	0,	0,	1,	0),
(4,	'media',	'stevie-wonder',	'1',	'3,4',	'',	'',	'0,0',	'',	'',	'',	'',	'5,7,9,10,4,3',	'6',	'',	'stevie-wonder-atari.jpeg',	'stevie-wonder-atari.jpeg',	'2022-03-18T00:00:00.000+01:00',	1,	0,	0,	1,	0);

DROP TABLE IF EXISTS `posts__cs_cz`;
CREATE TABLE `posts__cs_cz` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `content` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `posts__cs_cz` (`id`, `title`, `description`, `content`) VALUES
(1,	'První post',	'd dfg hdfgh dgf',	'df hdfg hdfghdfgh'),
(2,	'dfghdfg',	'dfghdfgh čivava',	'dfghdfghdf'),
(3,	'Událost',	'dfg dfgh dfgh dfghdfgh',	''),
(4,	'Stevie Wonder',	'sdfgsdfgsdfg',	'');

DROP TABLE IF EXISTS `posts__en_us`;
CREATE TABLE `posts__en_us` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `content` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `posts__en_us` (`id`, `title`, `description`, `content`) VALUES
(1,	'First post',	'fg jfg jfghj',	'gf fghj fghj'),
(2,	'dfghdfgh',	'dfghdfgh',	'dfghdfghdfg'),
(3,	'Event',	'fdg dfg hdfgh dfghdfh',	''),
(4,	'Stevie Wonder',	'sdfgsdfgsdf',	'');

DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `name` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `tags` (`id`, `type`, `name`, `active`, `deleted`) VALUES
(1,	'default',	'tag-one',	1,	0),
(2,	'default',	'tag-two',	1,	0),
(3,	'default',	'music',	1,	0),
(4,	'default',	'atari',	1,	0);

DROP TABLE IF EXISTS `translations`;
CREATE TABLE `translations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `name` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `translations` (`id`, `type`, `name`, `active`, `deleted`) VALUES
(1,	'default',	'btn.open',	1,	0),
(2,	'default',	'btn.close',	1,	0);

DROP TABLE IF EXISTS `translations__cs_cz`;
CREATE TABLE `translations__cs_cz` (
  `id` int(11) NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `translations__cs_cz` (`id`, `value`) VALUES
(1,	'Otevřít'),
(2,	'Zavřít');

DROP TABLE IF EXISTS `translations__en_us`;
CREATE TABLE `translations__en_us` (
  `id` int(11) NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `translations__en_us` (`id`, `value`) VALUES
(1,	'Open'),
(2,	'Close');

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

INSERT INTO `uploads` (`id`, `type`, `name`, `file_name`, `file_extension`, `file_mime`, `file_size`, `created`, `active`, `deleted`) VALUES
(1,	'image',	'9pFRwJB',	'9pFRwJB.jpeg',	'jpeg',	'image/jpeg',	'29820',	'2022-03-13 19:38:27',	1,	0),
(2,	'image',	'7ajjMf5',	'7ajjMf5.jpeg',	'jpeg',	'image/jpeg',	'255011',	'2022-03-13 18:21:26',	1,	0),
(3,	'image',	'IMG_0195',	'IMG_0195.jpg',	'jpg',	'image/jpeg',	'99249',	'2022-03-13 18:26:00',	1,	0),
(4,	'image',	'team-skeet-01',	'team-skeet-01.jpg',	'jpg',	'image/jpeg',	'102379',	'2022-03-13 19:34:27',	1,	0),
(5,	'document',	'dp-ts-2020',	'dp-ts-2020.pdf',	'pdf',	'application/pdf',	'2584672',	'2022-03-13 19:22:05',	1,	0),
(6,	'image',	'stevie-wonder-atari',	'stevie-wonder-atari.jpeg',	'jpeg',	'image/jpeg',	'45996',	'2022-03-13 19:37:54',	1,	0),
(7,	'image',	'pluto',	'pluto.jpeg',	'jpeg',	'image/jpeg',	'145029',	'2022-03-13 19:41:35',	1,	0),
(8,	'image',	'scared-devil',	'scared-devil.png',	'png',	'image/png',	'335648',	'2022-03-13 19:43:26',	1,	0),
(9,	'image',	'rick-and-morty',	'rick-and-morty.png',	'png',	'image/png',	'453956',	'2022-03-14 12:36:11',	1,	0),
(10,	'image',	'what-a-bunch-of-bastards',	'what-a-bunch-of-bastards.png',	'png',	'image/png',	'1453599',	'2022-03-14 14:26:49',	1,	0),
(11,	'image',	'green-hell-map-1',	'green-hell-map-1.jpg',	'jpg',	'image/jpeg',	'328421',	'2022-03-20 09:18:49',	1,	0),
(18,	'video',	'catdaaaaaaaay',	'catdaaaaaaaay.mp4',	'mp4',	'video/mp4',	'8995864',	'2022-03-29 14:52:11',	1,	0),
(19,	'audio',	'Kraftwerk----Pocket-Calculator',	'Kraftwerk----Pocket-Calculator.mp3',	'mp3',	'audio/mpeg',	'11875599',	'2022-03-29 14:56:24',	1,	0),
(20,	'image',	'Kraftwerk_w3',	'Kraftwerk_w3.jpg',	'jpg',	'image/jpeg',	'403295',	'2022-03-29 19:33:55',	1,	0),
(21,	'image',	'BS6kBrm',	'BS6kBrm.jpeg',	'jpeg',	'image/jpeg',	'110647',	'2022-03-29 19:34:22',	1,	0),
(22,	'image',	'20-minutes-adventure',	'20-minutes-adventure.png',	'png',	'image/png',	'3555426',	'2022-03-29 19:35:04',	1,	0),
(23,	'document',	'TomášSychra.CV.2020',	'TomášSychra.CV.2020.pdf',	'pdf',	'application/pdf',	'71941',	'2022-03-29 19:37:50',	1,	0),
(24,	'image',	'Rimmer',	'Rimmer.jpg',	'jpg',	'image/jpeg',	'96788',	'2022-03-29 19:39:31',	1,	0);

DROP TABLE IF EXISTS `uploads__cs_cz`;
CREATE TABLE `uploads__cs_cz` (
  `id` int(11) NOT NULL,
  `label` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `uploads__cs_cz` (`id`, `label`, `description`) VALUES
(1,	'',	''),
(2,	'',	''),
(3,	'aaaaa',	''),
(4,	'',	''),
(5,	'',	''),
(6,	'',	''),
(7,	'Pluto',	''),
(8,	'',	''),
(9,	'',	''),
(10,	'',	''),
(11,	'',	''),
(18,	'',	''),
(19,	'',	''),
(20,	'',	''),
(21,	'',	''),
(22,	'',	''),
(23,	'',	''),
(24,	'Arnold J. Rimmer',	'');

DROP TABLE IF EXISTS `uploads__en_us`;
CREATE TABLE `uploads__en_us` (
  `id` int(11) NOT NULL,
  `label` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `uploads__en_us` (`id`, `label`, `description`) VALUES
(1,	'',	''),
(2,	'',	''),
(3,	'bbbbb',	''),
(4,	'',	''),
(5,	'',	''),
(6,	'',	''),
(7,	'Pluto',	''),
(8,	'',	''),
(9,	'',	''),
(10,	'',	''),
(11,	'',	''),
(18,	'',	''),
(19,	'',	''),
(20,	'',	''),
(21,	'',	''),
(22,	'',	''),
(23,	'',	''),
(24,	'Arnold J Rimmer',	'');

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
(1,	'default',	'admin@user.demo',	'$argon2id$v=19$m=2048,t=4,p=3$UlAySWhiMDBiNGN0Zy9Beg$IfTz+NwKWvltE7HXSHwvOFCfdLWZuLNo+MWuwynZyUY',	'admin',	'admin',	'admin',	'company',	'',	'',	7,	1,	0),
(2,	'default',	'sychrat@gmail.com',	'$argon2id$v=19$m=2048,t=4,p=3$Unk1Z1FjMjdGR2dwZmJQUQ$Vo1Cul5Yx438jyQFKrXIhFwkR2Ah4zj8IQtkm7N8I7s',	'Tomáš',	'Sychra',	'zpecter',	'company',	'',	'',	7,	1,	0);

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

INSERT INTO `visitor_blacklist` (`id`, `type`, `visitor_email`, `visitor_ip`, `cause`, `description`, `status`, `created`) VALUES
(1,	'default',	'',	'192.168.0.2',	'test IP case',	'',	1,	'2022-03-20 17:31:45'),
(2,	'default',	'email@email.com',	'',	'test email case',	'',	1,	'2022-03-20 18:04:53');

-- 2022-03-30 16:07:41
