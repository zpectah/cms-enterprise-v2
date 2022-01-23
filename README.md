# CMS Enterprise v2

## Description
Simple content managing system with common content features with Crm and Market features.
... refactoring old version

## Requirements
* Must be installed globally on machine:
    - Node.js or Yarn
    - Gulp CLI, Webpack
* PHP and Composer (For Windows may be different stack)
* Apache Server with MySQL database. Prefer (XAMP / MAMP / LAMP / ...)

## Dependencies
### Global
- Babel
- lodash
- moment
- Gulp
- Webpack
### Admin
- React
- Typescript
- Redux
- MUI (https://mui.com/)
- i18n (https://react.i18next.com/)
- swr (https://swr.vercel.app/)
### Web
- Vue
- bladeone (https://github.com/EFTEC/BladeOne)


## Development configuration
### Apache Server for development
#### Virtual Host
```
<VirtualHost *:80>
    DocumentRoot "/path-to-project-root/.../cms-enterprise/dev/"
    ServerName cms-enterprise
</VirtualHost>

<VirtualHost *:80>
    DocumentRoot "/path-to-project-root/.../cms-enterprise/test/"
    ServerName test.cms-enterprise
</VirtualHost>
```
#### Hosts
```
127.0.0.1		cms-enterprise
127.0.0.1		test.cms-enterprise
```

## Development
### Install packages
- ``% yarn install`` - Install node packages

### Prepare vendors
- ``% yarn initial`` - Prepare PHP vendors

### Watch
- ``% yarn start`` - Watching changes for whole project

### Build
- ``% yarn build:dev`` - Create development bundle
- ``% yarn build:test`` - Create test bundle
- ``% yarn build:prod`` - Create production bundle

## Environment directories

Location | Description
--- | ---
``./src`` | Source directory
``./dev`` | Created **development** directory
``./test`` | Created **test** directory (prepared for local test)
``./prod`` | Created **production** directory (prepared for deploy)

## File structure

Location | Description
--- | ---
``/admin`` | Root admin directory (*)
``/api`` | Root api directory (*)
``/web`` | Root web directory (*)
``/config`` | Configuration and options files
``/core`` | System Core files
``/assets`` | Static files (images or whatever)
``/vendor`` | Vendor directory (Composer)
``/uploads`` | Uploaded files from system (*)
``/logs`` | Log files, if any

(*) Endpoint / Public

## Configuration and Options files

Name | Type | Location | Description
--- | --- | --- | ---
a | b | c | d
