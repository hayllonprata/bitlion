<?php
$base_url = "https://m.bitcat.com/en_US/";
$url = $base_url . $_SERVER['REQUEST_URI'];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
$response = curl_exec($ch);

if(curl_errno($ch)) {
    echo 'Curl error: ' . curl_error($ch);
} else {
    // Substituir URLs relativas por absolutas
    $response = str_replace('href="/', 'href="' . $base_url . '/', $response);
    $response = str_replace('src="/', 'src="' . $base_url . '/', $response);
    $response = str_replace('url(/', 'url(' . $base_url . '/', $response);
}

curl_close($ch);
echo $response;
?>