# Serenity Scribe Design Document

## Overview

Serenity Scribe is a digital platform that allows users to record their daily moods and journal entries. It aims to help users track their emotional well-being over time, offering insights and affirmations to encourage positive mental health practices. This document outlines the technical design and architecture of the Mood Journal website, including the frontend and backend components, database design, and third-party integrations.

## System Architecture

### Frontend

**Technology Stack:** The frontend will be developed using React for building the user interface, Tailwind CSS for styling, and Shadcn for state management.

**Pages and Components:**
- **Registration/Login Page:** Allows users to register an account or log in to the platform.
- **Journal Page:** A form for users to write and submit their daily journal entries and mood ratings.
- **Past Journals Page:** Displays a list of past journal entries that users can view and edit.
- **Analytics Page:** Shows graphs and analytics on past moods and journal entries.
- **Affirmations:** After submitting a journal entry, users receive a daily affirmation via a third-party API.

### Backend

**Technology Stack:** The backend server will be implemented using Flask, with SQLAlchemy for ORM.

**API Endpoints:**
- **User Authentication:** Endpoints for user registration and login.
- **Journal Management:** Endpoints to create, read, update, and delete journal entries.
- **Analytics:** Endpoints to provide analytics based on user journal entries.
- **Affirmations:** An endpoint to fetch daily affirmations from a third-party API.

### Database

**Technology:** SQLite

**Schema:**
- **Users:** Stores user information, including username, email, and hashed passwords.
- **JournalEntries:** Stores journal entries, including content, mood rating, and timestamps.

### Third-Party Integrations

- **Daily Affirmations API:** A free API to fetch daily affirmations for users upon journal entry submission.

## Development Plan

### Phase 1: Backend Setup

- Set up the Flask application and configure SQLAlchemy.
- Implement database models for users and journal entries.
- Develop the API endpoints for user authentication and journal management.
- Integrate the third-party API for daily affirmations.

### Phase 2: Frontend Development

- Initialize the React application with Tailwind CSS and Shadcn.
- Develop the UI components for the registration/login, journal, past journals, and analytics pages.
- Implement state management for handling user sessions and journal data.
- Connect the frontend to the backend via API calls.

### Phase 3: Testing and Deployment

- Perform unit and integration testing on both the frontend and backend.
- Deploy the backend to a cloud service provider (e.g., Heroku, AWS).
- Deploy the frontend to a static site hosting service (e.g., Vercel, Netlify).
- Conduct end-to-end testing to ensure system integrity and user experience.

### Notes on running:

- flask import-moods "/src/data/moodData.json"

### 1) Installation:

> If you use Github Codespaces (recommended) or Gitpod this template will already come with Python, Node and the Posgres Database installed. If you are working locally make sure to install Python 3.10, Node 

It is recomended to install the backend first, make sure you have Python 3.8, Pipenv and a database engine (Posgress recomended)

1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure you replace the valudes with your database information:

| Engine    | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgress | postgres://username:password@localhost:5432/example |

4. Migrate the migrations: `$ pipenv run migrate` (skip if you have not made changes to the models on the `./src/api/models.py`)
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application: `$ pipenv run start`

> Note: Codespaces users can connect to psql by typing: `psql -h localhost -U gitpod example`

### Undo a migration

You are also able to undo a migration by running

```sh
$ pipenv run downgrade
```

### Backend Populate Table Users

To insert test users in the database execute the following command:

```sh
$ flask insert-test-users 5
```

And you will see the following message:

```
  Creating test users
  test_user1@test.com created.
  test_user2@test.com created.
  test_user3@test.com created.
  test_user4@test.com created.
  test_user5@test.com created.
  Users created successfully!
```

### **Important note for the database and the data inside it**

Every Github codespace environment will have **its own database**, so if you're working with more people eveyone will have a different database and different records inside it. This data **will be lost**, so don't spend too much time manually creating records for testing, instead, you can automate adding records to your database by editing ```commands.py``` file inside ```/src/api``` folder. Edit line 32 function ```insert_test_data``` to insert the data according to your model (use the function ```insert_test_users``` above as an example). Then, all you need to do is run ```pipenv run insert-test-data```.

### Front-End Manual Installation:

-   Make sure you are using node version 14+ and that you have already successfully installed and runned the backend.

1. Install the packages: `$ npm install`
2. Start coding! start the webpack dev server `$ npm run start`

## Publish your website!

This boilerplate it's 100% read to deploy with Render.com and Heroku in a matter of minutes. Please read the [official documentation about it](https://start.4geeksacademy.com/deploy).

