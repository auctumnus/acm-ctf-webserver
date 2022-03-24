# acm ctf webserver

this is a paste server with some fun vulns!

## running

1. it assumes that it can just store its files under `assets/`. ensure this doesn't
change
1. give it a database in .env (docker-compose.yml has a working setup if you `docker-compose up -d`)
2. seed the database (`node seedDatabase.js`)
3. `npm run start`
4. it should now be running

## license

code snippets included in seed are generally from rosettacode
code for the project itself is under nvpl
