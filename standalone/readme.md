## Readable Streams
- Fonte de dados
Ex: Arquivo, transmissão de audio/video, select em banco de dados, STDIN

- Para informar que os dados acabaram:
```js
this.push(null)
```

- Cada pipe envia chunks para processos diferentes
```js
readable.pipe(Transform).pipe(Transform).pipe(Writable).pipe(Readable).pipe(Writable)
```

- Para a função que enviará os dados para a pipe via HTTP, é importante informar o tipo de resposta como 'stream'.
```js
async function consumer() {
    const response = await axios({
        url,
        method: 'get',
        responseType: 'stream'
    })

    return response.data
}
```

- Caso seja necessário chamar uma função assincrona na Stream, é indicado criar uma Closure function,
e chamar o callBack no then(). OBS: NÃO USAR ASYNC DIRETAMENTE NO MÉTODO transform().
```js
    new Transform({
        transform(chunk, encoding, cb) {
          (async () => {

          }).then(cb())

            cb(null, JSON.stringify(item))
            // Passando o dado para o próximo PIPE
        }
    })
```

- Ao fim de uma PIPE, deve-se passar o conteúdo necessário para a proxima.
```js
    new Transform({
        transform(chunk, encoding, cb) {
            const item = JSON.parse(chunk)
            const myNumber = /\d+/.exec(item.name)[0]
            
            if (myNumber % 2 === 0) console.log(`${item.name} é PAR`)
            else console.log(`${item.name} é IMPAR`)

            cb(null, JSON.stringify(item)) // Passando o dado para o próximo PIPE
        }
    })
```



- Todo REQUEST é uma Readable Stream

## Writable Streams
- Escrita de dados
Ex: Notificar, escrever arquivo, console.log, STDOUT

- Todo RESPONSE é uma Writable Stream
## Transform Streams
- Intermediário, onde lê e pode transformar os dados

### Entrada > Processamento > Saída
### Readable Streams > Transform Streams > Writable Streams