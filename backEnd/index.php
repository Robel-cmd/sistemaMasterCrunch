<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/meta/ProductoController.php';
require_once __DIR__ . '/meta/CategoriaController.php';

$method = $_SERVER['REQUEST_METHOD'];

// Si es POST y viene _method, lo sobreescribimos
if ($method == 'POST' && isset($_POST['_method'])) {
    $method = strtoupper($_POST['_method']);
}

// Determinar el recurso solicitado: por defecto 'producto'
$resource = isset($_GET['entity']) ? $_GET['entity'] : 'producto';

// Para compatibilidad con ?categorias=true, redirigimos a categorías
if (isset($_GET['categorias']) && $_GET['categorias'] == 'true') {
    $resource = 'categoria';
}

switch ($resource) {
    case 'producto':
        $controller = new ProductoController();
        break;
    case 'categoria':
        $controller = new CategoriaController();
        break;
    default:
        http_response_code(400);
        echo json_encode(["message" => "Recurso no soportado."]);
        exit();
}

// Ejecutar la acción según el método HTTP
switch ($method) {
    case 'POST':
        $controller->create();
        break;
    case 'GET':
        if (isset($_GET['id']) && !empty($_GET['id'])) {
            $controller->readOne();
        } else {
            $controller->read();
        }
        break;
    case 'PUT':
        $controller->update();
        break;
    case 'DELETE':
        $controller->delete();
        break;
    default:
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido."]);
        break;
}