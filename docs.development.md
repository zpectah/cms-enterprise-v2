# Development

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
