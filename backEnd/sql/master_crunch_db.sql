CREATE DATABASE IF NOT EXISTS master_crunch_db;
USE master_crunch_db;
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-08-2026 a las 19:08:54
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `master_crunch_db`
--

CREATE DATABASE IF NOT EXISTS master_crunch_db;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bitacora_cambios`
--

CREATE TABLE `bitacora_cambios` (
  `id_bitacora` bigint(20) UNSIGNED NOT NULL,
  `tabla` varchar(50) NOT NULL,
  `operacion` varchar(20) NOT NULL,
  `fecha_hora` time DEFAULT NULL,
  `usuario` varchar(50) NOT NULL,
  `datos_anteriores` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`datos_anteriores`)),
  `datos_nuevos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`datos_nuevos`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `combo`
--

CREATE TABLE `combo` (
  `id_combo` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `combos_detalle`
--

CREATE TABLE `combos_detalle` (
  `id_combo_detalle` bigint(20) UNSIGNED NOT NULL,
  `id_combo` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL CHECK (`cantidad` > 0),
  `precio_unitario_original` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id_empleado` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `numero_telefono` varchar(20) DEFAULT NULL,
  `usuario` varchar(50) NOT NULL,
  `contraseña_hash` varchar(255) NOT NULL,
  `id_rol` int(11) DEFAULT NULL,
  `fecha_contratacion` date DEFAULT curdate(),
  `activo` tinyint(1) DEFAULT 1,
  `ultimo_acceso` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `id_factura` bigint(20) UNSIGNED NOT NULL,
  `numero_factura` varchar(50) NOT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `id_empleado` int(11) DEFAULT NULL,
  `fecha_hora_factura` time DEFAULT NULL,
  `estado_factura` varchar(50) DEFAULT 'emitida',
  `rtn_cliente` varchar(20) DEFAULT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas_detalle`
--

CREATE TABLE `facturas_detalle` (
  `id_factura_detalle` bigint(20) UNSIGNED NOT NULL,
  `id_factura` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL CHECK (`cantidad` > 0),
  `precio_unitario` decimal(10,2) NOT NULL,
  `fecha_hora_factura` time DEFAULT NULL,
  `descuento` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metas_diarias`
--

CREATE TABLE `metas_diarias` (
  `id_meta` bigint(20) UNSIGNED NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `fecha` date DEFAULT curdate(),
  `cantidad_id_meta` int(11) NOT NULL CHECK (`cantidad_id_meta` > 0),
  `ventas_reales` int(11) DEFAULT 0,
  `id_bitacora` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes_cocina`
--

CREATE TABLE `ordenes_cocina` (
  `id_orden_cocina` bigint(20) UNSIGNED NOT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL CHECK (`cantidad` > 0),
  `estado_cocina` varchar(50) DEFAULT 'pendiente',
  `hora_recibido` time DEFAULT NULL,
  `hora_entrega` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` bigint(20) UNSIGNED NOT NULL,
  `fecha_hora_pedido` time DEFAULT NULL,
  `fecha_hora_entrega` time DEFAULT NULL,
  `id_empleado` int(11) DEFAULT NULL,
  `estado` varchar(50) DEFAULT 'pendiente',
  `tipo_pedido` varchar(50) NOT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` bigint(20) UNSIGNED NOT NULL,
  `codigo_interno` varchar(50) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `url_imagen` text DEFAULT NULL,
  `disponibilidad` tinyint(1) DEFAULT 1,
  `es_extra` tinyint(1) DEFAULT 0,
  `fecha_creacion` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `nivel_acceso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bitacora_cambios`
--
ALTER TABLE `bitacora_cambios`
  ADD PRIMARY KEY (`id_bitacora`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `combo`
--
ALTER TABLE `combo`
  ADD PRIMARY KEY (`id_combo`);

--
-- Indices de la tabla `combos_detalle`
--
ALTER TABLE `combos_detalle`
  ADD PRIMARY KEY (`id_combo_detalle`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id_empleado`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`id_factura`),
  ADD UNIQUE KEY `numero_factura` (`numero_factura`);

--
-- Indices de la tabla `facturas_detalle`
--
ALTER TABLE `facturas_detalle`
  ADD PRIMARY KEY (`id_factura_detalle`);

--
-- Indices de la tabla `metas_diarias`
--
ALTER TABLE `metas_diarias`
  ADD PRIMARY KEY (`id_meta`);

--
-- Indices de la tabla `ordenes_cocina`
--
ALTER TABLE `ordenes_cocina`
  ADD PRIMARY KEY (`id_orden_cocina`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD UNIQUE KEY `codigo_interno` (`codigo_interno`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bitacora_cambios`
--
ALTER TABLE `bitacora_cambios`
  MODIFY `id_bitacora` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `combo`
--
ALTER TABLE `combo`
  MODIFY `id_combo` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `combos_detalle`
--
ALTER TABLE `combos_detalle`
  MODIFY `id_combo_detalle` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `id_factura` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `facturas_detalle`
--
ALTER TABLE `facturas_detalle`
  MODIFY `id_factura_detalle` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metas_diarias`
--
ALTER TABLE `metas_diarias`
  MODIFY `id_meta` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ordenes_cocina`
--
ALTER TABLE `ordenes_cocina`
  MODIFY `id_orden_cocina` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
