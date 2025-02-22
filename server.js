const express = require('express');
const request = require('request');
const app = express();

app.use('/', (req, res) => {
    const url = 'https://m.bitcat.com/en_US/' + req.url;
    
    // Encaminha a requisição para o site e retorna a resposta
    req.pipe(
        request(url, { 
            headers: {
                // Adiciona cabeçalhos para evitar bloqueios
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Referer': 'https://m.bitcat.com/',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
            }
        })
    ).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy rodando na porta ${PORT}`);
});