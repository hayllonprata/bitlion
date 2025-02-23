<?php
$url = "https://m.bitcat.com/";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
curl_setopt($ch, CURLOPT_HEADER, true); // Incluir cabeçalhos na resposta
$response = curl_exec($ch);

// Separar cabeçalhos e corpo da resposta
$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$headers = substr($response, 0, $header_size);
$body = substr($response, $header_size);

curl_close($ch);

// Remover o cabeçalho X-Frame-Options
$headers = preg_replace('/X-Frame-Options:.*?\r\n/i', '', $headers);

// Exibir os cabeçalhos modificados e o corpo da resposta
header(trim($headers));
echo $body;
?>