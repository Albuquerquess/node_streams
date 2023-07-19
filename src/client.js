import axios from 'axios';
import { Transform, Writable } from 'stream'
const url = 'http://localhost:3000';

async function consumer() {
    const response = await axios({
        url,
        method: 'get',
        responseType: 'stream'
    })

    return response.data
}

const stream = await consumer()

stream
.pipe(
    // Transformando dados
    new Transform({
        transform(chunk, encoding, cb) {
            const item = JSON.parse(chunk)
            const myNumber = /\d+/.exec(item.name)[0]
            
            if (myNumber % 2 === 0) console.log(`${item.name} é PAR`)
            else console.log(`${item.name} é IMPAR`)

            cb(null, JSON.stringify(item)) // Passando o dado para o próximo PIPE
        }
    })
).pipe(
    new Writable({
        write(chunk, encoding, cb) {
            console.log("JA CHEGOU O DISCO VOADOR!!", chunk.toString())

            cb()
        }
    })
)