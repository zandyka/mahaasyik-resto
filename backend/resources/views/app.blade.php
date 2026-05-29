<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Mahaasyik - Restoran Ayam Pecak Autentik. Nikmati cita rasa Ayam Pecak terbaik dengan suasana yang nyaman. Reservasi online dan pesan antar tersedia." />
    <meta name="keywords" content="restoran ayam pecak, sajian ayam pecak, mahaasyik, reservasi restoran" />
    <meta name="author" content="PKI - Persatuan Komputer Indonesia" />
    <meta property="og:title" content="Mahaasyik - Restoran Ayam Pecak" />
    <meta property="og:description" content="Nikmati cita rasa Ayam Pecak terbaik dengan suasana yang nyaman dan autentik." />
    <meta property="og:type" content="restaurant" />
    <title>Mahaasyik - Restoran Ayam Pecak</title>
    <!-- Midtrans Snap JS -->
    <script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="{{ config('midtrans.client_key') }}"></script>
    @php
      $manifest = json_decode(file_get_contents(public_path('build/.vite/manifest.json')), true);
      $jsFile = $manifest['src/main.jsx']['file'] ?? null;
      $cssFiles = $manifest['src/main.jsx']['css'] ?? [];
    @endphp
    @if($jsFile)
    <script type="module" crossorigin src="{{ asset('build/' . $jsFile) }}"></script>
    @endif
    @foreach($cssFiles as $css)
    <link rel="stylesheet" crossorigin href="{{ asset('build/' . $css) }}">
    @endforeach
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
