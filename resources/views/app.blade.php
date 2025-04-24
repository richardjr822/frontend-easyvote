<!-- resources/views/app.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App</title>
    <!-- Include your compiled CSS from Tailwind or other sources -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="react-root"></div>

    <!-- Include the compiled JavaScript -->
    <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
