<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Projeto Laravel Newtab Academy</title>

        

    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
        <!-- Scripts -->
        <script src="{{ asset('js/app.js')}}"></script>
        <!-- Bootstrap -->
        <link rel="stylesheet" href={{ asset('css/bootstrap.min.css') }}>
        <script src="{{ asset('js/bootstrap.min.js') }}"></script>


    </body>
</html>
