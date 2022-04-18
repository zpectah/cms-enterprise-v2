# Web documentation
Description of web views and page object.
Structure is very simple, like you know from other projects. Logic and functions are available here `src/core/module/web/`,
if you want to add or update something. Rest of not defined methods could be provided from **DataProvider**.

## 1. Web scope structure
Folder | Description
--- | ---
`src/web/scripts/` | Javascript files
`src/web/styles/` | SCSS Style files
`src/web/views/` | View template files
`src/web/www/` | Directory root folder with index file
`src/core/module/web/` | Web core module
`src/assets/` | Assets

## 2. API
API is also provided for Ajax calling: `/api/{method}`. List of methods is available [here](docs.api.md).

## 3. Page data
Page data are available for every each view due theirs conditions. Data also provided in Debugbar.

Key | Type | Description | Structure
--- | --- | --- | ---
`$_page` | Object | Translated page fields (if page is generic) | `[ title, description, content ]`
`$_category` | Object | Translated category fields (if data available) | `[ title, description ]`
`$_detail` | Object | Translated detail fields (if data available) | `[ title, description, content ]`
`$page` | Object | General page view object | `[ page, type, name, template, layout ]`
`$detail` | Object | General detail object (if data available) | `[ model, detail ]`
`$category_context` | Object | Category contextual data for detail view | `[ prev, next, index, count, path_prefix ]`
`$search_results` | Object | Data with search results | `[ results, count ]`
`$route` | Object | Common routing data | `[ attrs, params, root ]`
`$language` | Object | Common language data | `[ current, default, installed, active, active_count, url_param, locales, locale ]`
`$lang` | String | Simplified current language | ``
`$translations` | Object | Stored translations for current language | ``
`$menu` | Object | Object with menu list by type | `[ primary, secondary, tertiary, custom ]`
`$company` | Object | Stored company data | `[ stored company data ]`
`$public` | Object | Common public data | `[ links, project, + stored web settings ]`
`$members_options` | Object | Common member options | `[ lost_password_token, + stored members settings ]`
`$member` | Object | Visitor / Member profile and available actions | `[ profile, actions ]`
`$custom_data` | Object | Custom web data | ``
`$t` | Function | Translate key | `(key) => string`
`$menuLink` | Function | Returns proper translated menu item object | `(menuItem) => menuItem`
`$languageLink` | Function | Returns link with language param | `(link) => link`
`$uploadPath` | Function | Returns uploads path by type & size | `(path) => path`
`$getPosts` | Function | Returns list of posts | `(props) => item[]`
`$formatDate` | Function | Returns formatted date | `(dateObj) => string`
`$formatTime` | Function | Returns formatted date | `(dateObj) => string`
`$formatDateTime` | Function | Returns formatted date | `(dateObj) => string`

## 4. Views
Views are fully customizable without other dependencies, just only 'show what data provided'. Same as Javascript files,
instead of Vue you can use whatever you like.

## 5. Translations
Translations are used above the page or other content layer.
Prepared in view templates and Vue application scope. If translation is not created, key displays instead.

Basic translation keys what are already prepared in view templates and components.

Key | Default value
--- | ---
common:btn.reply | Reply
common:btn.cancel | Cancel
common:btn.new-comment | New comment
common:btn.log-out | Log out
common:btn.accept | Accept
common:btn.decline | Decline
common:btn.like | Like
common:btn.dislike | Dislike
common:btn.submit | Submit
common:btn.return | Return
common:btn.previous | Previous
common:btn.next | Next
common:btn.sign-in | Sign in
common:btn.lost-password | Lost password
common:btn.profile | Profile
common:label.attachments | Attachments
common:label.email | E-mail
common:label.nickname | Nickname
common:label.name | Name
common:label.description | Description
common:label.start | Start
common:label.end | End
common:label.location | Location
common:label.address | Address
common:label.city | City
common:label.country | Country
common:label.zip | ZIP
common:label.links | Links
common:label.media | Media
common:label.published | Published
common:label.category | Category
common:label.tags | Tags
common:label.comments | Comments
common:label.nothing_found | Nothing found
common:label.all_rights | All right sreserved
form:label.email | E-mail
form:placeholder.email | Enter e-mail
form:label.password | Password
form:placeholder.password | Enter password
form:label.name_first | First name
form:placeholder.name_first | Enter first name
form:label.name_last | Last name
form:placeholder.name_last | Enter last name
form:label.subscription | Subscription
form:label.subject | Subject
form:placeholder.subject | Enter subject
form:label.content | Content
form:placeholder.content | Enter content
form:label.title | Title
form:placeholder.title | Enter title
form:label.search | Search
form:placeholder.search | Search in web
form:submit.search | Search
message:input.email_format | E-mail is in wrong format
message:input.required | Field is required
message:member_login_success | Login was success
message:member_not_found | Member was not found
message:member_password_mismatch | Password mismatch
message:member_not_active | Member is not activated
message:member_is_deleted | Member is deleted
message:request_was_send | Request was send
message:member_password_reset_success | Password reset was success
message:member_password_reset_error | Password reset error
message:member_password_already_reset | Request was already proceeded
message:request_not_found | Request was not found
message:token_not_found | Token not found
message:update_success | Update was success
message:update_error | Update error
message:member_success_created | Registration was success
message:member_is_blacklisted | Member is banned
message:user_not_created | Member was not created
message:member_already_exist | Member already exist
message:member_subscribe_error | Subscription error
message:message_sent | Message was sent
message:message_error | Error during sending
cookiebot:description | Cookiebot law content ...
debug:label | Page is in debug mode, some functions may be unavailable
maintenance:label | Page is in maintenance mode, some functions may be unavailable
page:error-404.title | Error 404
page:error-404.description | Sorry, but this page does not exist
page:home.title | Welcome
page:home.description | Nullam tincidunt, massa vitae ...
page:home.paragraph.1 | Donec volutpat lacinia lorem a pulvinar ...
page:home.paragraph.2 | Quisque posuere urna elit, vel mollis...
page:members-lost-password.title | Lost password
page:members-lost-password.description | Orci varius natoque penatibus et magnis dis parturient...
page:members-profile.title | Member profile
page:members-profile.description | Cras at turpis in lectus convallis gravida...
page:members-registration.title | Registration new member
page:members-registration.description | Donec aliquam eu neque sit amet...
page:search-results.title | Results for
widget:last-posts.title | Last posts
widget:contact-form.title | Contact form
widget:login.title | Log in
widget:profile.title | Profile
widget:subscription.title | Subscription




















