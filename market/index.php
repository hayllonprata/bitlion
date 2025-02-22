<?php
$url = "https://www.bitcat.com/market";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
$response = curl_exec($ch);
curl_close($ch);

// Substituir URLs relativas por absolutas
$base_url = "https://www.bitcat.com";
$response = str_replace('href="/', 'href="' . $base_url . '/', $response);
$response = str_replace('src="/', 'src="' . $base_url . '/', $response);
$response = str_replace('url(/', 'url(' . $base_url . '/', $response);
$response = str_replace('"/home/', '"' . $base_url . '/home/', $response);
$response = str_replace('"/trade/', '"' . $base_url . '/trade/', $response);
$response = str_replace('"/market/', '"' . $base_url . '/market/', $response);

echo $response;
?>