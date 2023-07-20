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
    console.log("[REQUEST]")
    const file = createReadStream('src/database.csv')

    file.pipe(response)
   
};

http.createServer(handler)
.listen(3000)
.on('listening', () => console.log("Server running at 3000"));