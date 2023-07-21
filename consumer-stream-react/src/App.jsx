import React from 'react'
import './App.css'

function App() {
  const url = 'http://127.0.0.1:3000'
  const header = "nome, idade, cargo"
  const [list, setList] = React.useState([])

  function updateList(chunk) {
    const list = chunk.split('\n')

    if (list[0] === header) list.shift()

    list.forEach((line) => {
      const [nome, id, cargo, idx2m, idx3m, idx4m, idx5] = line.split(',')
      setList((prev) => [...prev, { nome, id, cargo, idx2m, idx3m, idx4m, idx5 }])
    })
  }

  async function getStream() {
    return await fetch(url)
  }


  React.useEffect(() => {
    async function run() {
      const streamResponse = await getStream()

      if (!streamResponse.ok || !streamResponse.body) {
        throw streamResponse.statusText
      }

      const reader = streamResponse.body.getReader(),
        decoder = new TextDecoder()

      while (true) {
        console.log("WHILE")
        const { value, done } = await reader.read()

        if (done) break

        const decodeChunk = decoder.decode(value, { stream: true })
        updateList(decodeChunk)
      }
    }

    run()

  }, [])

  React.useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }), [list]

  return (
           <div>
            <img width={'300em'} src="src/assets/photo.jpg" alt="EU" />
           <table>
              <thead>
                <tr>
                  <th>nome</th>
                  <th>ID</th>
                  <th>cargo</th>
                  <th>idx2m</th>
                  <th>idx3m</th>
                  <th>idx4m</th>
                  <th>idx5</th>
                </tr>
              </thead>
              <tbody>
              {list.map((item, index) => 
                <tr key={index}>
                    <td>{item.nome}</td>
                    <td>{item.id}</td>
                    <td>{item.idx2m}</td>
                    <td>{item.idx3m}</td>
                    <td>{item.idx4m}</td>
                    <td>{item.idx5}</td>
                </tr>
              )}
              </tbody>
           </table>
           </div>
  )
}

export default App
