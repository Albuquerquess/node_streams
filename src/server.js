import http from 'http'
import { Readable } from 'stream'
import { randomUUID } from 'crypto'

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
    const readable = new Readable({
        read() {

            for (const data of run()) {
                console.log('Sending...', JSON.stringify(data))
                this.push(JSON.stringify(data) + '\n');
            };


            // Para informar que os dados acabaram:
            this.push(null);
        }
    });

    // Cada pipe envia chunks para o response (Writable Stream)
    readable.pipe(response);
};

http.createServer(handler)
.listen(3000)
.on('listening', () => console.log("Server running at 3000"));