<!DOCTYPE html> 
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iframe Responsivo</title>
  
  <!-- Estilos CSS extraídos -->
  <link rel="stylesheet" href="https://www.bitcat.com/en_US/home/static/common-5c0ef867e.css">
  <link rel="stylesheet" href="https://www.bitcat.com/en_US/home/static/quill-34404ce82c.core.css">
  <link rel="stylesheet" href="https://www.bitcat.com/en_US/home/static/quill-a36db7ccf.snow.css">
  <link rel="stylesheet" href="https://www.bitcat.com/en_US/home/static/quill-e5de0101ba.bubble.css">
  <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">

  <style>
    body, html {
      margin: 0;
      padding: 0;
      overflow: hidden; /* Evita barras de rolagem */
      height: 100%;
      background-color: #000;
    }
    .iframe-container {
      width: 100%;
      height: 100vh;
      position: relative;
      overflow: hidden;
    }
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  </style>
</head>
<body>
  <div class="iframe-container">
    <iframe src="https://gerenciamento-bitlion-cat.7uwzf6.easypanel.host/proxy.php" allow="fullscreen"></iframe>
  </div>
</body>
</html>
