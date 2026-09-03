<?php

require_once __DIR__.'/../config/Database.php';
require_once __DIR__.'/Pedido.php';

class PedidoController {
    private $db;
    private $pedido;

    function __construct()
    {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->pedido = new Pedido($this->db);
    }

    public function create(){
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->empleado) && !empty($data->estado) && !empty($data->tipo_pedido) && !empty($data->observaciones)) {
            $this->pedido->empleado = $data->empleado;
            $this->pedido->estado = $data->estado;
            $this->pedido->tipo_pedido = $data->tipo_pedido;
            $this->pedido->observaciones = $data->observaciones;

            if ($this->Pedido->create()) {
                http_response_code(201);
                echo json_encode(["message " => "producto creado existosamente"]);
            } else {
                http_response_code(503);
                echo json_encode(["message " => "problema con la creacion"]);
            }
            
        } else {
            http_response_code(201);
            echo json_encode(["message " => "datos imcompletos"]);
        }


    }
    // LEER
    public function read()
    {
        $stmt = $this->pedido->read();

        $num = $stmt->rowCount();

        if ($num > 0) {

            $pedidos = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                $pedido = [
                    "id_pedido" => $row["id_pedido"],
                    "fecha_hora_pedido" => $row["fecha_hora_pedido"],
                    "fecha_hora_entrega" => $row["fecha_hora_entrega"],
                    "empleado" => $row["empleado"],
                    "estado" => $row["estado"],
                    "tipo_pedido" => $row["tipo_pedido"],
                    "observaciones" => $row["observaciones"]
                ];

                $pedidos[] = $pedido;
            }

            http_response_code(200);

            echo json_encode($pedidos);

        } else {

            http_response_code(404);

            echo json_encode([
                "message" => "No se encontraron pedidos"
            ]);
        }
    }


    // ACTUALIZAR
    public function update()
    {
        $data = json_decode(file_get_contents("php://input"));

        if (
            !empty($data->id_pedido) &&
            !empty($data->estado) &&
            !empty($data->empleado) &&
            !empty($data->tipo_pedido) &&
            !empty($data->observaciones)
        ) {

            $this->pedido->id = $data->id_pedido;
            $this->pedido->estado = $data->estado;
            $this->pedido->empleado = $data->empleado;
            $this->pedido->tipo_pedido = $data->tipo_pedido;
            $this->pedido->observaciones = $data->observaciones;

            if ($this->pedido->update()) {

                http_response_code(200);

                echo json_encode([
                    "message" => "Pedido actualizado exitosamente"
                ]);

            } else {

                http_response_code(503);

                echo json_encode([
                    "message" => "No se pudo actualizar el pedido"
                ]);
            }

        } else {

            http_response_code(400);

            echo json_encode([
                "message" => "Datos incompletos"
            ]);
        }
    }


    // ELIMINAR
    public function delete()
    {
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->id_pedido)) {

            $this->pedido->id = $data->id_pedido;

            if ($this->pedido->delete()) {

                http_response_code(200);

                echo json_encode([
                    "message" => "Pedido eliminado exitosamente"
                ]);

            } else {

                http_response_code(503);

                echo json_encode([
                    "message" => "No se pudo eliminar el pedido"
                ]);
            }

        } else {

            http_response_code(400);

            echo json_encode([
                "message" => "Debe proporcionar el id del pedido"
            ]);
        }
    }

}