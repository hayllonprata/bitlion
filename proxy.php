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

// Corrigir URLs relativas comuns
$response = preg_replace('/(href|src|action)=["\']\/([^"\']+)["\']/', '$1="'.$base_url.'/$2"', $response);
$response = preg_replace('/url\(["\']?\/([^"\')]+)["\']?\)/', 'url("'.$base_url.'/$1")', $response);

// Corrigir chamadas de scripts dinâmicos e WebSockets
$response = preg_replace('/(fetch|WebSocket|src|href)\(["\']\/([^"\')]+)["\']/', '$1("'.$base_url.'/$2")', $response);

// Adicionar base URL em links de scripts ainda não corrigidos
$response = preg_replace('/<script\s+src=["\']\/([^"\']+)["\']/', '<script src="'.$base_url.'/$1"', $response);

echo $response;
?>
