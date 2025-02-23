<?php
$url = "https://www.bitcat.com/";

// Inicializa cURL para buscar a página original
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
$html = curl_exec($ch);
curl_close($ch);

// URL base
$base_url = "https://www.bitcat.com";

// *** 1ª Fase: Modificação via DOMDocument (Abordagem Estruturada) ***
libxml_use_internal_errors(true);
$dom = new DOMDocument();
$dom->loadHTML($html, LIBXML_NOERROR | LIBXML_NOWARNING);
$tags = $dom->getElementsByTagName('*');

foreach ($tags as $tag) {
    if ($tag->hasAttribute('href')) {
        $href = $tag->getAttribute('href');
        if (preg_match('/^\/?(home|static)\//i', $href)) { 
            $tag->setAttribute('href', $base_url . '/' . ltrim($href, '/'));
        }
    }

    if ($tag->hasAttribute('src')) {
        $src = $tag->getAttribute('src');
        if (preg_match('/^\/?(home|static)\//i', $src)) { 
            $tag->setAttribute('src', $base_url . '/' . ltrim($src, '/'));
        }
    }
}

$html = $dom->saveHTML();

// *** 2ª Fase: Substituição Manual com Expressões Regulares (Força os Caminhos Relativos) ***
$html = preg_replace('/(href|src|url)\(["\']?(\/?home\/[^"\')]+)/i', '$1="' . $base_url . '/$2', $html);
$html = preg_replace('/(href|src|url)\(["\']?(\/?static\/[^"\')]+)/i', '$1="' . $base_url . '/$2', $html);

// Imprime o HTML corrigido
echo $html;
?>
