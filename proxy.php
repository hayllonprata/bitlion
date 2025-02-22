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

// Base URL
$base_url = "https://www.bitcat.com";

// Substituir todas as ocorrências de URLs relativas
$patterns = [
    // Corrige href, src, action, data-src
    '/(href|src|action|data-src)=["\']\/([^"\']+)["\']/i' => '$1="'.$base_url.'/$2"',
    
    // Corrige url() dentro de CSS
    '/url\(["\']?\/([^"\')]+)["\']?\)/i' => 'url("'.$base_url.'/$1")',

    // Corrige fetch("/...") e WebSocket("/...")
    '/(fetch|WebSocket)\(["\']\/([^"\')]+)["\']\)/i' => '$1("'.$base_url.'/$2")'
];

// Aplicar todas as substituições no conteúdo da página
foreach ($patterns as $pattern => $replacement) {
    $response = preg_replace($pattern, $replacement, $response);
}

echo $response;
?>
