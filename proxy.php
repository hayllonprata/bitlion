<?php
// Captura a URL da requisição (se nenhuma for fornecida, usa a página inicial)
$path = isset($_GET['url']) ? $_GET['url'] : '';
$base_url = "https://www.bitcat.com/";
$target_url = rtrim($base_url, '/') . '/' . ltrim($path, '/');

// Inicializa cURL
$ch = curl_init($target_url);
curl_setopt($ch, CURLOPT_URL, $base_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language: en-US,en;q=0.9",
    "Cache-Control: no-cache",
    "Connection: keep-alive"
]);

$response = curl_exec($ch);
curl_close($ch);

// Verifica se há erro na resposta
if (!$response) {
    die("Erro ao buscar o site.");
}

// Substituir URLs relativas por absolutas
$response = preg_replace('#(href|src|action|data-src|content)=["\']/([^"\']+)["\']#i', '$1="'.$base_url.'$2"', $response);
$response = preg_replace('#url\(["\']?/([^"\')]+)["\']?\)#i', 'url("'.$base_url.'$1")', $response);
$response = preg_replace('#(fetch|WebSocket|XHR)\(["\']/([^"\')]+)["\']\)#i', '$1("'.$base_url.'$2")', $response);

// Modificar links internos para passarem pelo proxy
$response = preg_replace('#href=["\']'.$base_url.'([^"\']+)["\']#i', 'href="proxy.php?url=$1"', $response);

echo $response;
?>
