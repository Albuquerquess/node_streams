import http from 'http'
import { Readable } from 'stream'
import { randomUUID } from 'crypto'
import { createReadStream } from 'node:fs'

function * run() {
    for (let index = 0; index < 1121; index++)     {
        const data = {
            id: randomUUID(),
            name: `Gustavo-${index}`
        };

        yield data;
    }
};

function handler(_request, response) {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Access-Control-Allow-Credentials', true);
    console.log("[REQUEST]")
    const file = createReadStream('src/database.csv')

    file.pipe(response)

    file.on('data', (data) => {
        console.log(data.toString())
    })
   
};

http.createServer(handler)
.listen(3000)
.on('listening', () => console.log("Server running at 3000"));