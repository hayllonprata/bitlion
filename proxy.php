<?php
// Captura a URL da requisição (se nenhuma for fornecida, usa a página inicial)
$path = isset($_GET['url']) ? $_GET['url'] : '';
$base_url = "https://www.bitcat.com/";
$target_url = $base_url . ltrim($path, '');

$ch = curl_init($target_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);

$response = curl_exec($ch);
curl_close($ch);

// Substituir URLs relativas por absolutas
$response = preg_replace('#(href|src|action|data-src|content)=["\']/([^"\']+)["\']#i', '$1="'.$base_url.'/$2"', $response);
$response = preg_replace('#url\(["\']?/([^"\')]+)["\']?\)#i', 'url("'.$base_url.'/$1")', $response);
$response = preg_replace('#(fetch|WebSocket|XHR)\(["\']/([^"\')]+)["\']\)#i', '$1("'.$base_url.'/$2")', $response);

// Modificar links internos para passarem pelo proxy
$response = preg_replace('#href=["\']'.$base_url.'/([^"\']+)["\']#i', 'href="proxy.php?url=$1"', $response);

echo $response;
?>
