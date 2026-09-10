CREATE DATABASE IF NOT EXISTS master_crunch_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE master_crunch_db;

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `nivel_acceso` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `metodo_pago` (
  `id_metodo_pago` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_metodo_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `combo` (
  `id_combo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio_total` decimal(10,2) NOT NULL,
  `url_imagen_combo` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_combo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_interno` varchar(30) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `url_imagen` varchar(255) DEFAULT NULL,
  `disponibilidad` tinyint(1) NOT NULL DEFAULT 1,
  `es_extra` tinyint(1) NOT NULL DEFAULT 0,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_producto`),
  KEY `fk_productos_categoria` (`id_categoria`),
  CONSTRAINT `fk_productos_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `combo_detalle` (
  `id_combo_detalle` int(11) NOT NULL AUTO_INCREMENT,
  `id_combo` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `precio_unitario_original` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_combo_detalle`),
  KEY `fk_combodet_combo` (`id_combo`),
  KEY `fk_combodet_producto` (`id_producto`),
  CONSTRAINT `fk_combodet_combo` FOREIGN KEY (`id_combo`) REFERENCES `combo` (`id_combo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_combodet_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `numero_telefono` varchar(20) DEFAULT NULL,
  `usuario` varchar(50) NOT NULL,
  `contrasena_hash` varchar(255) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `fecha_contratacion` date NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `ultimo_acceso` datetime DEFAULT NULL,
  PRIMARY KEY (`id_empleado`),
  UNIQUE KEY `usuario` (`usuario`),
  KEY `fk_empleados_roles` (`id_rol`),
  CONSTRAINT `fk_empleados_roles` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_hora_pedido` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_hora_entrega` datetime DEFAULT NULL,
  `id_empleado` int(11) NOT NULL,
  `estado` varchar(30) NOT NULL DEFAULT 'pendiente',
  `tipo_pedido` varchar(30) NOT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `fk_pedidos_empleados` (`id_empleado`),
  CONSTRAINT `fk_pedidos_empleados` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `pedidos_detalle` (
  `id_detalle` int(11) NOT NULL AUTO_INCREMENT,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `precio_unitario` decimal(10,2) NOT NULL,
  `comentarios` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `fk_pedidosdet_pedido` (`id_pedido`),
  KEY `fk_pedidosdet_producto` (`id_producto`),
  CONSTRAINT `fk_pedidosdet_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pedidosdet_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `facturas` (
  `id_factura` int(11) NOT NULL AUTO_INCREMENT,
  `numero_factura` varchar(30) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  `id_metodo_pago` int(11) NOT NULL,
  `fecha_hora_factura` datetime NOT NULL DEFAULT current_timestamp(),
  `estado_factura` varchar(30) NOT NULL DEFAULT 'emitida',
  `rtn_cliente` varchar(20) DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_factura`),
  UNIQUE KEY `numero_factura` (`numero_factura`),
  KEY `fk_facturas_pedido` (`id_pedido`),
  KEY `fk_facturas_empleado` (`id_empleado`),
  KEY `fk_facturas_metodopago` (`id_metodo_pago`),
  CONSTRAINT `fk_facturas_empleado` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`) ON UPDATE CASCADE,
  CONSTRAINT `fk_facturas_metodopago` FOREIGN KEY (`id_metodo_pago`) REFERENCES `metodo_pago` (`id_metodo_pago`) ON UPDATE CASCADE,
  CONSTRAINT `fk_facturas_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `factura_detalle` (
  `id_factura_detalle` int(11) NOT NULL AUTO_INCREMENT,
  `id_factura` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `precio_unitario` decimal(10,2) NOT NULL,
  `descuento` decimal(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id_factura_detalle`),
  KEY `fk_facturadet_factura` (`id_factura`),
  KEY `fk_facturadet_producto` (`id_producto`),
  CONSTRAINT `fk_facturadet_factura` FOREIGN KEY (`id_factura`) REFERENCES `facturas` (`id_factura`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_facturadet_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `metas_diarias` (
  `id_meta` int(11) NOT NULL AUTO_INCREMENT,
  `id_producto` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad_meta` int(11) NOT NULL,
  `ventas_reales` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_meta`),
  KEY `fk_metasdiarias_producto` (`id_producto`),
  CONSTRAINT `fk_metasdiarias_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ordenes_cocina` (
  `id_orden_cocina` int(11) NOT NULL AUTO_INCREMENT,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `estado_cocina` varchar(30) NOT NULL DEFAULT 'pendiente',
  `hora_recibido` datetime DEFAULT NULL,
  `hora_entrega` datetime DEFAULT NULL,
  PRIMARY KEY (`id_orden_cocina`),
  KEY `fk_ordenescocina_pedido` (`id_pedido`),
  KEY `fk_ordenescocina_producto` (`id_producto`),
  CONSTRAINT `fk_ordenescocina_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ordenescocina_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;