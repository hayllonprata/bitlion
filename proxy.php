<?php
$url = "https://m.bitcat.com/en_US/";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
curl_setopt($ch, CURLOPT_HEADER, true); // Incluir cabeçalhos na resposta
$response = curl_exec($ch);

// Verificar se houve erro na requisição
if (curl_errno($ch)) {
    die('Erro na requisição cURL: ' . curl_error($ch));
}

// Separar cabeçalhos e corpo da resposta
$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$headers = substr($response, 0, $header_size);
$body = substr($response, $header_size);

curl_close($ch);

// Processar os cabeçalhos
$headers_array = explode("\r\n", $headers); // Dividir os cabeçalhos em um array
foreach ($headers_array as $header) {
    // Ignorar cabeçalhos vazios e remover o X-Frame-Options
    if (trim($header) !== '' && stripos($header, 'X-Frame-Options') === false) {
        header($header); // Enviar cada cabeçalho individualmente
    }
}

// Exibir o corpo da resposta
echo $body;
?>