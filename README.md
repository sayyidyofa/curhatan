# curhatan
Simple curhat service with authentication and persistence

This app uses MongoDB for database.
Currently there are two models:

- User (for auth, owns Curhat)
- Curhat

## Development
`yarn add` or `npm install`

Modify the env variables to your setting in `src/constants.ts`

Good to go

## Deployment

Use provided `Dockerfile` to run it via Docker container platform.

Use `docker-compose` to connect it with the required dependency (MongoDB container).
