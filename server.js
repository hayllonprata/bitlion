const express = require('express');
const request = require('request');
const app = express();

app.use('/', (req, res) => {
    // URL do site que você deseja acessar
    const url = 'https://m.bitcat.com/en_US/' + req.url;
    
    // Encaminha a requisição para o site e retorna a resposta
    req.pipe(request(url)).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy rodando na porta ${PORT}`);
});