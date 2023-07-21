import axios from 'axios';
import * as readline from 'node:readline'


const url = 'http://localhost:3000';
async function consumer() {
    console.log("[CONSUMER]")
    const response = await axios({
        url,
        method: 'get',
        responseType: 'stream',
    })
    console.log("[RESPONSE]")

    return response.data
}

const stream = await consumer()
console.time("[STREAM]")
const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
})

rl.on('line', function (data) {
    console.log('line - ', data)
 
})

rl.on('close', function () {
    console.log("Fim do arquivo");
    console.timeEnd("[STREAM]")
})