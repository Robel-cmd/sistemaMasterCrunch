<?php

require_once __DIR__.'/../config/Database.php';
require_once __DIR__.'/DetallePedido.php'; 

class DetallePedController {
    private $db;
    private $detalle;

    function __construct()
    {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->detalle = new DetallePedido($this->db);
    }


    public function create(){
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->pedido) 
            && !empty($data->producto) 
            && !empty($data->combo) 
            && !empty($data->cantidad) 
            && !empty($data->precio)) {

            $this->detalle->pedido = $data->pedido;
            $this->detalle->producto = $data->producto;
            $this->detalle->combo = $data->combo;
            $this->detalle->cantidad = $data->cantidad;
            $this->detalle->precio = $data->precio;

            if ($this->detalle->create()) {
                http_response_code(201);
                echo json_encode(["message " => "detalle creado existosamente"]);
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
        $stmt = $this->detalle->read();

        $num = $stmt->rowCount();

        if ($num > 0) {

            $detalles = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                $detalle = [
                    "id" => $row["id_detalle"],
                    "pedido" => $row["id_pedido"],
                    "producto" => $row["id_producto"],
                    "combo" => $row["id_combo"],
                    "cantidad" => $row["cantidad"],
                    "precio" => $row["precio_unitario"]
                    
                ];

                $detalles[] =  $detalle;
            }

            http_response_code(200);

            echo json_encode($detalles);

        } else {

            http_response_code(404);

            echo json_encode([
                "message" => "No se encontraron detalles"
            ]);
        }
    }
     public function readOne()
    {
        $stmt = $this->detalle->read();

        $num = $stmt->rowCount();

        if ($num > 0) {

            $pedidos = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                $pedido = [
                    "pedido" => $row["id_pedido"],
                    "fecha_hora_pedido" => $row["fecha_hora_pedido"],
                    "fecha_hora_entrega" => $row["fecha_hora_entrega"],
                    "empleado" => $row["id_empleado"],
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
            !empty($data->id) &&
            !empty($data->pedido) &&
            !empty($data->producto) &&
            !empty($data->combo) &&
            !empty($data->cantidad) &&
            !empty($data->precio)
        ) {

            $this->detalle->id = $data->id;
            $this->detalle->pedido = $data->pedido;
            $this->detalle->producto = $data->producto;
            $this->detalle->combo = $data->combo;
            $this->detalle->cantidad = $data->cantidad;
            $this->detalle->precio = $data->precio;

            if ($this->detalle->update()) {

                http_response_code(200);

                echo json_encode([
                    "message" => "detalles actualizado exitosamente"
                ]);

            } else {

                http_response_code(503);

                echo json_encode([
                    "message" => "No se pudo actualizar el detalle"
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

        if (!empty($data->id)) {

            $this->detalle->id = $data->id;

            if ($this->detalle->delete()) {

                http_response_code(200);

                echo json_encode([
                    "message" => "Detalles eliminado exitosamente"
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
                "message" => "Debe proporcionar el id del detalle"
            ]);
        }
    }

}