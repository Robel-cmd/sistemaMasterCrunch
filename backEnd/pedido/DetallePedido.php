<?php
class DetallePedido {
    private $conn;
    private $table_name = "pedidos_detalle";

    public $id;
    public $pedido;
    public $producto;
    public $combo;
    public $cantidad;
    public $precio;

    public function __construct($db){
        $this->conn = $db;
    }
    // crear nuevo detalle
    public function create(){
        $query = "INSERT INTO " . $this->table_name . "
                      (id_pedido, id_producto, id_combo, cantidad, precio_unitario)
                      VALUES 
                      (:id_pedido, :id_producto, :id_combo, :cantidad, :precio_unitario)";
        $stmt = $this->conn->prepare($query);

        $this->pedido = htmlspecialchars(strip_tags($this->pedido)); 
        $this->producto = htmlspecialchars(strip_tags($this->producto));
        $this->cantidad = htmlspecialchars(strip_tags($this->cantidad));
        $this->precio = htmlspecialchars(strip_tags($this->precio));
        $this->combo = htmlspecialchars(strip_tags($this->combo));

        $stmt->bindParam(":id_pedido", $this->pedido);
        $stmt->bindParam(":id_producto", $this->producto);
        $stmt->bindParam(":id_combo", $this->combo);
        $stmt->bindParam(":cantidad", $this->cantidad);
        $stmt->bindParam(":precio_unitario", $this->precio);
        

        if ($stmt->execute()) {
            return true;
        }
        return false;

          
    }
    // Obtener un nuevo detalle
    public function read() {
        $query = "SELECT id_detalle, id_pedido, id_producto, id_combo, cantidad, precio_unitario FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
    public function readOne() {
        $query = "SELECT id_detalle, id_pedido, id_producto, estado, id_combo, cantidad, precio_unitario FROM " . $this->table_name."WHERE id_detalle = :id_detalle";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
    

     // Actualizar un producto existente
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET id_pedido =:id_pedido, id_producto =:id_producto, id_combo =:id_combo, cantidad =:cantidad, precio_unitario = :precio_unitario WHERE id_detalle = :id_detalle";
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->pedido = htmlspecialchars(strip_tags($this->pedido));
        $this->producto = htmlspecialchars(strip_tags($this->producto));
        $this->combo = htmlspecialchars(strip_tags($this->combo));
        $this->cantidad = htmlspecialchars(strip_tags($this->cantidad));
        $this->precio = htmlspecialchars(strip_tags($this->precio));

        $stmt->bindParam(":id_detalle", $this->id);        
        $stmt->bindParam(":id_pedido", $this->pedido);
        $stmt->bindParam(":id_producto", $this->producto);
        $stmt->bindParam(":id_combo", $this->combo);
        $stmt->bindParam(":cantidad", $this->cantidad);
        $stmt->bindParam(":precio_unitario", $this->precio);
        

        if ($stmt->execute()) {
            return true;
        }
        return false;
        
    }

      // Eliminar un producto
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id_detalle = :id_detalle";
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(":id_detalle", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
    

} 
