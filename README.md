# BuddyUp

## Description
A smarter auto-match system for DOTA2 players.

## Screenshots
["match making page"](https://github.com/jv-cortez/BuddyUp/blob/master/docs/matchmakingPage.png)
["Invitation from match page"](https://github.com/jv-cortez/BuddyUp/blob/master/docs/matched.png)
["chat feature"](https://github.com/jv-cortez/BuddyUp/blob/master/docs/chat.png)

## Getting Started

### Server side
1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
5. Run the server: `npm start`
6. Run the app on localhost:3000

### Client side
1. Update the .env file with your correct local information
2. Install dependencies: `npm i`
3. Run the webpack-dev-server: `npm start`
