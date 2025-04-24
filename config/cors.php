<?php
return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],  // Define which paths need CORS support

    'allowed_methods' => ['*'],  // Allow all HTTP methods (GET, POST, etc.)

    'allowed_origins' => ['http://localhost:5174'],  // Add your React app URL here

    'allowed_headers' => ['*'],  // Allow all headers

    'exposed_headers' => [],  // No specific exposed headers

    'max_age' => 0,  // No max age

    'supports_credentials' => false,  // No credentials needed
];
