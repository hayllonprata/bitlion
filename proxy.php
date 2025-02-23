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

// Substituir URLs relativas por absolutas
$base_url = "https://www.bitcat.com";

// Função para substituir URLs relativas
function replaceRelativeUrls($matches) {
    global $base_url;
    $attribute = $matches[1]; // href, src, etc.
    $url = $matches[2]; // O valor do atributo

    // Se a URL já é absoluta (começa com http ou https), não faz nada
    if (strpos($url, 'http') === 0) {
        return $matches[0];
    }

    // Se a URL começa com /, adiciona a base_url
    if (strpos($url, '/') === 0) {
        return $attribute . '="' . $base_url . $url . '"';
    }

    // Se a URL é undefined, retorna o original
    if ($url === 'undefined') {
        return $matches[0];
    }

    // Para outros casos, adiciona a base_url
    return $attribute . '="' . $base_url . '/' . $url . '"';
}

// Aplicar a substituição para href, src e url
$response = preg_replace_callback('/(href|src|url)="([^"]*)"/', 'replaceRelativeUrls', $response);

// Corrigir URLs que começam com /home
$response = str_replace('="/home/', '="' . $base_url . '/home/', $response);

echo $response;
?>