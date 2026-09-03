<?php
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/Categoria.php';

class CategoriaController {
    private $db;
    private $categoria;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->categoria = new Categoria($this->db);
    }

    // Obtener datos de entrada (JSON o multipart)
    private function getInputData() {
        $contentType = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
        if (strpos($contentType, 'multipart/form-data') !== false) {
            return $_POST;
        } else {
            $data = json_decode(file_get_contents("php://input"), true);
            return $data ?: [];
        }
    }

    // CREATE
    public function create() {
        $data = $this->getInputData();
        if (empty($data['nombre'])) {
            http_response_code(400);
            echo json_encode(["message" => "El campo nombre es obligatorio."]);
            return;
        }

        $this->categoria->nombre = $data['nombre'];
        $this->categoria->descripcion = isset($data['descripcion']) ? $data['descripcion'] : null;
        $this->categoria->activo = isset($data['activo']) ? $data['activo'] : 1;

        if ($this->categoria->create()) {
            http_response_code(201);
            echo json_encode(["message" => "Categoría creada exitosamente."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "No se pudo crear la categoría."]);
        }
    }

    // READ (todas)// READ (todas) – incluye inactivas si se pide
    public function read() {
        $incluirInactivas = isset($_GET['incluirInactivas']) && $_GET['incluirInactivas'] == 'true';
        $stmt = $this->categoria->read($incluirInactivas);
        $num = $stmt->rowCount();
        if ($num > 0) {
            $categorias_arr = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $categorias_arr[] = $row;
            }
            http_response_code(200);
            echo json_encode($categorias_arr);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "No hay categorías."]);
        }
    }

    // READ ONE
    public function readOne() {
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(["message" => "ID inválido."]);
            return;
        }
        $categoria = $this->categoria->readOne($id);
        if ($categoria) {
            http_response_code(200);
            echo json_encode($categoria);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Categoría no encontrada."]);
        }
    }

    // UPDATE
    public function update() {
        $data = $this->getInputData();
        $id = isset($data['id_categoria']) ? $data['id_categoria'] : (isset($_GET['id']) ? $_GET['id'] : null);
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(["message" => "ID de categoría no proporcionado."]);
            return;
        }

        $current = $this->categoria->readOne($id);
        if (!$current) {
            http_response_code(404);
            echo json_encode(["message" => "Categoría no encontrada."]);
            return;
        }

        $this->categoria->id_categoria = $id;
        $this->categoria->nombre = isset($data['nombre']) ? $data['nombre'] : $current['nombre'];
        $this->categoria->descripcion = isset($data['descripcion']) ? $data['descripcion'] : $current['descripcion'];
        $this->categoria->activo = isset($data['activo']) ? $data['activo'] : $current['activo'];

        if ($this->categoria->update()) {
            http_response_code(200);
            echo json_encode(["message" => "Categoría actualizada exitosamente."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "No se pudo actualizar la categoría."]);
        }
    }

    // DELETE (desactivar o eliminar físicamente)
    public function delete() {
        $data = $this->getInputData();
        $id = isset($data['id_categoria']) ? $data['id_categoria'] : (isset($_GET['id']) ? $_GET['id'] : null);
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(["message" => "ID de categoría no proporcionado."]);
            return;
        }

        $this->categoria->id_categoria = $id;
        if ($this->categoria->delete()) {
            http_response_code(200);
            echo json_encode(["message" => "Categoría eliminada exitosamente."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "No se pudo eliminar la categoría."]);
        }
    }
}