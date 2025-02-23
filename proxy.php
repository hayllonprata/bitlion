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
curl_close($ch);

// Definir a URL base
$base_url = "https://www.bitcat.com";

// Corrigir src, href e url sem sobrescrever URLs absolutas já corretas
$response = preg_replace_callback(
    '/(href|src|url)=["\'](\/?(home|static)\/[^"\']+)["\']/i',
    function ($matches) use ($base_url) {
        // Remove a barra inicial se existir
        $relative_path = ltrim($matches[2], '/');
        return $matches[1] . '="' . $base_url . '/' . $relative_path . '"';
    },
    $response
);

echo $response;
?>
