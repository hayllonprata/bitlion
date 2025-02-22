<?php
$url = "https://www.bitcat.com/en_US/";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Safari/537.36');
$response = curl_exec($ch);
curl_close($ch);

// Adiciona a meta tag viewport se não existir
if (strpos($response, '<meta name="viewport"') === false) {
    $response = str_replace('<head>', '<head><meta name="viewport" content="width=device-width, initial-scale=1.0">', $response);
}

// Substitui URLs relativas por absolutas
$response = preg_replace('/(href|src)="\/([^"]+)"/', '$1="https://www.bitcat.com/$2"', $response);

echo $response;
?>