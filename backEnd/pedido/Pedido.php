<?php
class Pedido {
    private $conn;
    private $table_name = "pedidos";

    public $id;
    public $fecha_hora_pedido;
    public $fecha_hora_entrega; // esto sera null hasta que se actualice en cocina
    public $empleado;
    public $estado;
    public $tipo_pedido;
    public $observaciones;

    public function __construct($db){
        $this->conn = $db;
    }
    // crear nuevo producto
    public function create(){
        $query = "INSERT INTO".$this->table_name."SET empleado =: id_empleado, estado =: estado, tipo_pedido =: tipo_pedido, observaciones =: observaciones";
        $stmt = $this->conn->prepare($query);

        $this->estado = htmlspecialchars(strip_tags($this->estado));
        $this->tipo_pedido = htmlspecialchars(strip_tags($this->tipo_pedido));
        $this->observaciones = htmlspecialchars(strip_tags($this->observaciones));

        $stmt->bindParam(":estado", $this->estado);
        $stmt->bindParam(":tipo_pedido", $this->tipo_pedido);
        $stmt->bindParam(":observaciones", $this->observaciones);

        if ($stmt->execute()) {
            return true;
        }
        return false;

          
    }
    // Obtener un nuevo producto
    public function read() {
        $query = "SELECT id_pedido, fecha_hora_pedido, fecha_hora_entrega, estado, id_empleado, tipo_pedido, observaciones FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

     // Actualizar un producto existente
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET estado = :estado, empleado =: empleado tipo_pedido = :tipo_pedido, observaciones = :observaciones WHERE id_pedido = :id_pedido";
        $stmt = $this->conn->prepare($query);

        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->descripcion = htmlspecialchars(strip_tags($this->descripcion));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":descripcion", $this->descripcion);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
        
    }

      // Eliminar un producto
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
    

} 
