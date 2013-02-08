#bitpoker

This repo contains the Bitcoin Poker web server (and the files it serves).

This repo is complete except for a single file - modules/db.config - which holds database credentials.

#Installing dependencies
`npm i`

#Running the server
`node app`

#Testing
Tests using [Mocha](https://github.com/visionmedia/mocha), [Chai](https://github.com/visionmedia/mocha), and [SuperTest](https://github.com/visionmedia/supertest):

`make test`

*or*

`node_modules/mocha/bin/mocha --reporter spec test.js`