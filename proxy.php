<?php
$url = "https://www.bitcat.com/";
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
    // Inserir os estilos CSS no <head> do HTML
    $styles = '
    <link rel="stylesheet" href="https://www.bitcat.com/home/static/common-5c0ef867e.css">
    <link rel="stylesheet" href="https://www.bitcat.com/home/static/quill-34404ce82c.core.css">
    <link rel="stylesheet" href="https://www.bitcat.com/home/static/quill-a36db7ccf.snow.css">
    <link rel="stylesheet" href="https://www.bitcat.com/home/static/quill-e5de0101ba.bubble.css">
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">
    ';

    // Inserir os estilos no <head> do HTML
    $response = str_replace('</head>', $styles . '</head>', $response);
}

curl_close($ch);
echo $response;
?>