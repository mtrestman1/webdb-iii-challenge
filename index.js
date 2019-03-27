const server = require('./api/server');

const port = 4000;
server.listen(port, () => console.log(`\ Web API Listening on http://localhost:${port} \n`));