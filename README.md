# CMS Enterprise v2

## Motivation
Motivation was to create simple CMS for easy managing data and customizing features for web. Just clone project, 
update styles for web, create data and run.

## Description
Simple content managing system with common content features with Members options.

## Features
System provided many features for each content model. Models are using across application and mainly managed in administration.
Model are for available as multi-language, which means you can add whatever language you want.

Models available:
  - Categories
  - Members
  - Menu
  - MenuItems
  - Pages
  - Posts
  - Tags
  - Translations
  - Uploads
  - Users
  - Comments
  - Messages
  - VisitorBlacklist
  - CrmRequests

User roles:
  - redactor
  - manager
  - admin

## Requirements
* Must be installed globally on machine:
    - Node.js or Yarn
    - Gulp CLI, Webpack
* PHP and Composer (For Windows may be different stack)
* Apache Server with MySQL database. Prefer (XAMP / MAMP / LAMP / ...)

## Dependencies
### Global
- Gulp (https://gulpjs.com/)
- Webpack (https://webpack.js.org/)
### Admin
- JS, React (https://reactjs.org/)
- Typescript (https://www.typescriptlang.org/)
- Redux (https://redux.js.org/)
- MUI (https://mui.com/)
- i18n (https://react.i18next.com/)
- swr (https://swr.vercel.app/)
### Web
- PHP
- JS, Vue 3 (https://vuejs.org/)
- BladeOne (https://github.com/EFTEC/BladeOne)
- Bootstrap (https://getbootstrap.com/)

## Other documentation files
- [API](docs.api.md) : for API requests & responses
- [Development](docs.development.md) : for development and deployment info
- [Initial](docs.initial.md) : when starting new project, or updating some features
- [Web](docs.web.md) : for documentation about web
