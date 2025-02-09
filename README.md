# DevChallenge 4

<details>
  <summary><b>Table of contents</b></summary>

- [DevChallenge 4](#devchallenge-4)
  - [Description](#description)
  - [Setup](#setup)

</details>

## Description

A request appointment system that includes:

- A guest page for people who want to request an appointment or check which appointments have.
- When a user makes an appointment, an email is sended to the user to confirm it wants the appointment.
- An admin page to manage the available dates and times that users can make an appointment.

## Setup

### 1. Download repository

```bash
git clone https://github.com/CristianManuelAlcobendasBeorlegui/dev-challenge-4
cd dev-challenge-4
```

### 2. Install packages and dependencies

```(bash)
composer update
npm install 
npm run build
```

### 3. Create 'database.sqlite' file
  
Inside the folder `database` create a file named `database.sqlite`.

### 4. Create '.env' file

On root folder, make a copy of `.env.example` file and rename it to `.env`.

### 5. Specify email credentials

In `.env` file, place your email address data in following properties.

```(text)
MAIL_MAILER=smtp
MAIL_HOST=<YOUR-SMTP-SERVER>
MAIL_PORT=465
MAIL_USERNAME=<YOUR-EMAIL>
MAIL_PASSWORD=<YOUR-PASSWORD>
MAIL_ENCRYPTION=TLS
MAIL_FROM_ADDRESS="<YOUR-EMAIL>"
MAIL_FROM_NAME="${APP_NAME}"
```

### 6. Run migrations and seeders

```(bash)
php artisan migrate:refresh --seed
```

### 7. Generate app key

```(bash)
php artisan key:generate
```

### 8. Run the server

```bash
php artisan serve
```

### 9. Test it

When your server get started, you can:

- Access to the admin dashboard: [http://localhost:8000/admin-dashboard](http://localhost:8000/admin-dashboard)
  - -- Credentials --
    - **User:** demo@example.com
    - **Password** demo2025
- Access to guest page: [http://localhost:8000](http://localhost:8000)