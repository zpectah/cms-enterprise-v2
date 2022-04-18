# Initial documentation
What to do when starting new project from scratch, adding or updating features.

## Starting new project

### 1. Prepare config files
- `src/config/project.json`:
  - ! Just change only what is necessary and be sure of all consequences !
  - For common uses you need to change `admin.language`, `global.units`, `web.meta`, `web.language`.
- `src/config/options.json`:
  - For common uses you need to change some types or define new image crop options.
- `src/config/database.php`:
  - Config your database for each environment.
- `src/config/environmental.json`:
  - Config for each environment, like root url, styles, scripts.
- `src/config/locales.json`:
  - Numeration object for language / locale with custom options, like date format, etc.
- `src/config/const.json`:
  - ! Just change only what is necessary and be sure of all consequences !
  - For most cases not need to do changes.

### 2. Initialize database and data
#### Import data
- run script in terminal to install initial database `...`
- or import it manually from `sql/initial.sql`
#### Default admin user
Database dump is provided with one user for first project initialization.
- email: _admin@admin_
- password: _admin_

After initialization, be free to delete this user, if you before create yours.

### 3. Setup default language
After you are first signed in administration, you may see some warning messages on dashboard. So, go to **Settings**, and repair them.

### 4. Views
Views are totally customizable, so be free to do whatever you want. More information about web, go [here](docs.web.md).


## Adding features

### New type for model
- Add new type in `src/config/options.json` for proper model scope
- For translations, create a key for new type in `src/admin/scripts/i18n/resources/{lang}/types.json`

### New data model
- Create database tables
- in `src/core/`:
  - model
  - module (if needed)
  - **DataProvider** for data 
  - **ApiProvider** for API
- in `src/admin/`:
  - types
  - hooks
  - page
  - module
- in `src/web/`:
  - views
  - views logic
  - page model data
- in `src/config`:
  - `const.php`
  - `options.json`

### Adding new language to locales
- Just add new key to list in `src/config/locales` by current object definition