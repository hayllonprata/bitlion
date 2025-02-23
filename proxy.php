<?php
$url = "https://m.bitcat.com/";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Seguir redirecionamentos internos
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
curl_setopt($ch, CURLOPT_HEADER, true); // Incluir cabeçalhos na resposta
$response = curl_exec($ch);

// Verificar se houve erro na requisição
if (curl_errno($ch)) {
    die('Erro na requisição cURL: ' . curl_error($ch));
}

// Separar cabeçalhos e corpo da resposta
$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$headers = substr($response, 0, $header_size);
$body = substr($response, $header_size);

curl_close($ch);

// Processar os cabeçalhos
$headers_array = explode("\r\n", $headers); // Dividir os cabeçalhos em um array
foreach ($headers_array as $header) {
    // Ignorar cabeçalhos vazios e remover o X-Frame-Options
    if (trim($header) !== '' && stripos($header, 'X-Frame-Options') === false) {
        header($header); // Enviar cada cabeçalho individualmente
    }
}

// Substituir URLs no conteúdo para apontar para o proxy.php
$proxy_url = "https://gerenciamento-bitlion-cat.7uwzf6.easypanel.host/proxy.php?url="; // Substitua "seusite.com" pelo seu domínio
$body = preg_replace_callback('/(href|src|action)="([^"]*)"/', function($matches) use ($proxy_url) {
    $attribute = $matches[1]; // href, src, action
    $url = $matches[2]; // O valor do atributo

    // Se a URL já é absoluta, redirecionar através do proxy
    if (strpos($url, 'http') === 0) {
        return $attribute . '="' . $proxy_url . urlencode($url) . '"';
    }

    // Se a URL começa com /, redirecionar através do proxy
    if (strpos($url, '/') === 0) {
        return $attribute . '="' . $proxy_url . urlencode('https://m.bitcat.com' . $url) . '"';
    }

    // Para URLs relativas, redirecionar através do proxy
    return $attribute . '="' . $proxy_url . urlencode('https://m.bitcat.com/' . $url) . '"';
}, $body);

// Exibir o corpo da resposta
echo $body;
?>