<?php

require_once 'PedidoController.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];

$PedidoController = new PedidoController();

switch ($method) {
    case 'POST':
        $PedidoController->create();
        break;

    case 'GET':
        $PedidoController->read();
        break;

    case 'PUT':
        $PedidoController->update();
        break;

    case 'DELETE':
        $PedidoController->delete();
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido."]);
        break;
}