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
        $query = "INSERT INTO " . $this->table_name . "
                      (id_empleado, estado, tipo_pedido, observaciones)
                      VALUES 
                      (:id_empleado, :estado, :tipo_pedido, :observaciones)";
        $stmt = $this->conn->prepare($query);

        $this->empleado = htmlspecialchars(strip_tags($this->empleado)); 
        $this->estado = htmlspecialchars(strip_tags($this->estado));
        $this->tipo_pedido = htmlspecialchars(strip_tags($this->tipo_pedido));
        $this->observaciones = htmlspecialchars(strip_tags($this->observaciones));

        $stmt->bindParam(":id_empleado", $this->empleado);
        $stmt->bindParam(":estado", $this->estado);
        $stmt->bindParam(":tipo_pedido", $this->tipo_pedido);
        $stmt->bindParam(":observaciones", $this->observaciones);

        if ($stmt->execute()) {
            return true;
        }
        return false;

          
    }
    // Obtener un nuevo Pedido
    public function read() {
        $query = "SELECT id_pedido, fecha_hora_pedido, fecha_hora_entrega, estado, id_empleado, tipo_pedido, observaciones FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

     // Actualizar un pedido existente
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET estado = :estado, id_empleado =:id_empleado ,tipo_pedido = :tipo_pedido, observaciones = :observaciones WHERE id_pedido = :id_pedido";
        $stmt = $this->conn->prepare($query);

        $this->estado = htmlspecialchars(strip_tags($this->estado));
        $this->empleado = htmlspecialchars(strip_tags($this->empleado));
        $this->tipo_pedido = htmlspecialchars(strip_tags($this->tipo_pedido));
        $this->observaciones = htmlspecialchars(strip_tags($this->observaciones));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(":estado", $this->estado);
        $stmt->bindParam(":id_empleado", $this->empleado);
        $stmt->bindParam(":tipo_pedido", $this->tipo_pedido);
        $stmt->bindParam(":observaciones", $this->observaciones);
        $stmt->bindParam(":id_pedido", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
        
    }

      // Eliminar un producto
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id_pedido = :id_pedido";
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(":id_pedido", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
    

} 
