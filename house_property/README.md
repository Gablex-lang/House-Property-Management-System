# House Property System

## Setup

1. Copy the `house_property` folder into your PHP server's web root
   (e.g. `htdocs` for XAMPP, `www` for WAMP).
2. Create the database by importing `database.sql` into MySQL
   (e.g. via phpMyAdmin, or `mysql -u root -p < database.sql`).
3. If your MySQL user/password differs from the defaults, edit
   `php/db.php` (`$user`, `$pass`).
4. Start Apache and MySQL, then open:
   `http://localhost/house_property/index.html`

## Login

- Username: `admin`
- Password: `admin123`

## Features

- Login with session-based authentication (`php/login.php`, `php/logout.php`)
- Dashboard listing all properties with status badges (`dashboard.html`)
- Add new property (`add-property.html`)
- Edit existing property (`edit-property.html?id=ID`)
- Delete property with confirmation
- All PHP endpoints return JSON and are protected by session checks

## Notes

- Passwords are stored/compared as plain text to match the seed data
  provided (`admin123`). For production use, switch to `password_hash()`
  / `password_verify()`.
- `php/logout.php` was added beyond the originally listed files since a
  logout endpoint is needed to destroy the PHP session.
