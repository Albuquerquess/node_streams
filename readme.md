## Streams no frontend

### Iniciar projeto

1. Executar script para geração de CSV em: 
``` bash
chmod +x standalone/src/generateCSV.sh; ./standalone/src/generateCSV.sh
```
2. Inciar servidor (estando no diretório standalone/)
``` bash
npm run server
```
3. Iniciar frontend (estando no diretório consumer-stream-react/)
``` bash
npm run dev
```