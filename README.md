# About project

this is a chat app's ui built with React, Typescript and Vite

# Table of content

[prerequisites](#-prerequisites)<br>
[setup](#-setup)<br>
[getting started](#-getting-started)<br>
[run test (comming soon)](#-run-test)<br>
[deployment (comming soon)](#-deploy)<br>

## ⇁ Prerequisites

you must have npm installed<br>

## ⇁ Setup

first, clone this project<br>
next, install packages listed in [package.json file](./package.json)<br>

```bash
npm install
```

you need to have `.env` file (can
be `.env.production` for production in `environments/production` folder and `.env.developmemt` for development in `environments/development` folder, in the file you
need `VITE_[key]=value` each line. See list of required environment
variables [here](#-list-of-available-environment-variables):<br>

## ⇁ List of available environment variables

| Variable      | Required | Purpose                                  |
| ------------- | -------- | ---------------------------------------- |
| PORT          | NO       | your server port, and `8000` for default |
| VITE_AUTH_URL | YES      | URL to authentication service            |
| VITE_USER_URL | YES      | URL to user management service           |

For the full .env file example, check
out [this template](./template/.env.template)

## ⇁ Getting Started

### ⇁ First note

To apply husky, then run this first:

```bash
npm run prepare
```

if you change the code, then run this to format the code:

```bash
npm run format
```

if you want to identify problems in your code, then run this:

```bash
npm run lint
```

### ⇁ Development

first, you need to have `.env.dev` file inside root folder. See more
in [here](#-list-of-available-environment-variables)<br>

you can run the development server by this command:

```bash
npm run dev
```

### ⇁ Production

first, you need to have `.env.prod` file inside root folder. See more
in [here](#-list-of-available-environment-variables). Then run these commands<br>

```bash
npm run build
npm run preview
```

## ⇁ Run tests

## ⇁ Deploy
