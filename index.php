<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🍗 MasterCrunch - Gestión de Productos</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #fdf6ed;
            background-image: radial-gradient(circle at 20% 30%, #fff3e0 0%, #fce4d6 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1300px;
            margin: 0 auto;
            background: rgba(255, 248, 240, 0.92);
            border-radius: 30px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(180, 90, 30, 0.15);
            border: 1px solid #f0d5b0;
        }
        h1 {
            font-size: 2.8rem;
            color: #a64b2a;
            text-align: center;
            margin-bottom: 10px;
            letter-spacing: 2px;
            font-weight: 700;
            text-shadow: 2px 2px 0 #f0d5b0;
        }
        h1 small {
            font-size: 1rem;
            display: block;
            color: #7a4a2e;
            font-weight: 400;
            letter-spacing: 1px;
        }
        h2 {
            color: #7a4a2e;
            border-bottom: 3px solid #f0c8a0;
            padding-bottom: 8px;
            margin: 25px 0 15px;
            font-weight: 600;
        }
        .form-section {
            background: #fffaf2;
            padding: 20px 25px;
            border-radius: 20px;
            box-shadow: inset 0 1px 4px rgba(0,0,0,0.03);
            border: 1px solid #e8d5c0;
            margin-bottom: 30px;
        }
        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 15px;
        }
        .form-grid input, .form-grid select {
            width: 100%;
            padding: 12px 14px;
            border: 1px solid #dcc8b4;
            border-radius: 30px;
            background: white;
            font-size: 0.95rem;
            transition: 0.2s;
        }
        .form-grid input:focus, .form-grid select:focus {
            outline: none;
            border-color: #c67a4a;
            box-shadow: 0 0 0 3px rgba(198, 122, 74, 0.2);
        }
        .form-grid input[type="file"] {
            padding: 8px 12px;
            background: #f7efe8;
            border-radius: 30px;
        }
        .btn-primary {
            background: #c67a4a;
            color: white;
            border: none;
            padding: 12px 28px;
            border-radius: 40px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: 0.2s;
            box-shadow: 0 4px 8px rgba(198, 122, 74, 0.3);
        }
        .btn-primary:hover {
            background: #a85f34;
            transform: translateY(-2px);
        }
        .btn-secondary {
            background: #a0a0a0;
            color: white;
            border: none;
            padding: 12px 28px;
            border-radius: 40px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s;
        }
        .btn-secondary:hover {
            background: #7a7a7a;
        }
        .btn-success {
            background: #4a8c6b;
            color: white;
            border: none;
            padding: 12px 28px;
            border-radius: 40px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s;
        }
        .btn-success:hover {
            background: #2f6b4e;
        }
        .btn-edit {
            background: #e6b85e;
            color: #3d2b1a;
            border: none;
            padding: 6px 16px;
            border-radius: 30px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s;
            margin-right: 6px;
        }
        .btn-edit:hover {
            background: #d4a040;
        }
        .btn-delete {
            background: #c95a4a;
            color: white;
            border: none;
            padding: 6px 16px;
            border-radius: 30px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s;
        }
        .btn-delete:hover {
            background: #a84334;
        }
        .btn-cancel {
            background: #9a9a9a;
            color: white;
            border: none;
            padding: 12px 28px;
            border-radius: 40px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s;
        }
        .btn-cancel:hover {
            background: #7a7a7a;
        }
        #editForm {
            display: none;
            background: #fcf4ea;
            padding: 20px 25px;
            border-radius: 20px;
            border: 2px solid #e6c8a8;
            margin: 25px 0;
        }
        #editForm .form-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        th {
            background: #f0d5b0;
            color: #4d2e1a;
            font-weight: 600;
            padding: 14px 10px;
            text-align: left;
        }
        td {
            padding: 12px 10px;
            border-bottom: 1px solid #efddcc;
            vertical-align: middle;
        }
        tr:last-child td {
            border-bottom: none;
        }
        img {
            max-width: 70px;
            max-height: 70px;
            object-fit: cover;
            border-radius: 12px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .product-list {
            margin-top: 15px;
        }
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 30px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        .badge-available {
            background: #c8e6c9;
            color: #1e4a2a;
        }
        .badge-unavailable {
            background: #f0c0b0;
            color: #5a2a1a;
        }
        .badge-extra {
            background: #f7d86a;
            color: #5a4a1a;
        }
        .badge-normal {
            background: #d0d8e0;
            color: #2a3a4a;
        }
        .actions {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
        }
        .loading {
            color: #7a5a3a;
            font-style: italic;
            padding: 20px;
            text-align: center;
        }
        .error-message {
            color: #b34a3a;
            background: #fde8e0;
            padding: 12px;
            border-radius: 12px;
            border-left: 6px solid #b34a3a;
        }
        @media (max-width: 700px) {
            .form-grid {
                grid-template-columns: 1fr;
            }
            table {
                font-size: 0.85rem;
            }
            th, td {
                padding: 8px 6px;
            }
        }
    </style>
</head>
<body>
<div class="container">
    <h1>🍗 MasterCrunch <small>Gestión de productos – Pollo & Sabor</small></h1>
    <!-- Formulario CREAR -->    <a href="viewCategoria.php" class="btn-back" style="background: #6c8b9f; color: white; padding: 10px 20px; border-radius: 40px; text-decoration: none; font-weight: 600;">📂 Gestionar Categorías</a>


    <div class="form-section">
        <h2>➕ Nuevo Producto</h2>
        <form id="createForm" enctype="multipart/form-data">
            <div class="form-grid">
                <input type="text" name="codigo_interno" placeholder="Código interno" required>
                <input type="text" name="nombre" placeholder="Nombre del producto" required>
                <input type="number" step="0.01" name="precio" placeholder="Precio" required>
                <select name="id_categoria" id="createCategoria" required>
                    <option value="">Selecciona categoría</option>
                </select>
                <select name="disponibilidad">
                    <option value="1">✅ Disponible</option>
                    <option value="0">❌ No disponible</option>
                </select>
                <select name="es_extra">
                    <option value="0">🍗 Normal</option>
                    <option value="1">⭐ Extra</option>
                </select>
                <input type="file" name="imagen" accept="image/*">
                <button type="submit" class="btn-primary">➕ Crear Producto</button>
            </div>
        </form>
    </div>

    <!-- Formulario EDITAR (oculto) -->
    <div id="editForm">
        <h2>✏️ Editar Producto</h2>
        <form id="updateForm" enctype="multipart/form-data">
            <input type="hidden" name="id_producto" id="editId">
            <div class="form-grid">
                <input type="text" name="codigo_interno" id="editCodigo" placeholder="Código interno">
                <input type="text" name="nombre" id="editNombre" placeholder="Nombre">
                <input type="number" step="0.01" name="precio" id="editPrecio" placeholder="Precio">
                <select name="id_categoria" id="editCategoria" required>
                    <option value="">Selecciona categoría</option>
                </select>
                <select name="disponibilidad" id="editDisponibilidad">
                    <option value="1">✅ Disponible</option>
                    <option value="0">❌ No disponible</option>
                </select>
                <select name="es_extra" id="editExtra">
                    <option value="0">🍗 Normal</option>
                    <option value="1">⭐ Extra</option>
                </select>
                <input type="file" name="imagen" accept="image/*">
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button type="submit" class="btn-success">💾 Actualizar</button>
                    <button type="button" class="btn-cancel" onclick="cancelEdit()">❌ Cancelar</button>
                </div>
            </div>
        </form>
    </div>

    <!-- Listado -->
    <h2>📋 Lista de Productos</h2>
    <div id="productList" class="product-list">
        <p class="loading">Cargando productos...</p>
    </div>
</div>

<script>
    const API_BASE = 'http://localhost/sistemaMasterCrunch/backEnd/index.php';

    // ---- Cargar categorías y productos al inicio ----
    document.addEventListener('DOMContentLoaded', async () => {
        await cargarCategorias('createCategoria');
        loadProducts();
    });

    // ---- Función para cargar categorías en un select ----
    async function cargarCategorias(selectId, selectedId = null) {
        try {
            const res = await fetch(`${API_BASE}?categorias=true`);
            if (!res.ok) {
                console.warn('No se pudieron cargar categorías');
                return;
            }
            const data = await res.json();
            const select = document.getElementById(selectId);
            if (!select) return;
            select.innerHTML = '<option value="">Selecciona categoría</option>';
            data.forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat.id_categoria;
                opt.textContent = cat.nombre;
                if (selectedId && cat.id_categoria == selectedId) {
                    opt.selected = true;
                }
                select.appendChild(opt);
            });
        } catch (error) {
            console.error('Error cargando categorías:', error);
        }
    }

    // ---- Crear producto (XMLHttpRequest) ----
    document.getElementById('createForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', API_BASE, true);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                const result = JSON.parse(xhr.responseText);
                alert(result.message);
                document.getElementById('createForm').reset();
                cargarCategorias('createCategoria');
                loadProducts();
            } else {
                alert('Error al crear: ' + xhr.status + ' - ' + xhr.responseText);
            }
        };
        xhr.onerror = function() {
            alert('Error de red al crear.');
        };
        xhr.send(formData);
    });

    // ---- Cargar productos (fetch) ----
    async function loadProducts() {
        const container = document.getElementById('productList');
        container.innerHTML = '<p class="loading">Cargando...</p>';
        try {
            const res = await fetch(API_BASE);
            if (!res.ok) {
                if (res.status === 404) {
                    container.innerHTML = '<p>📭 No hay productos registrados.</p>';
                    return;
                }
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }
            const data = await res.json();
            if (data.registros && data.registros.length > 0) {
                let html = `<table>
                    <thead><tr>
                        <th>ID</th><th>Código</th><th>Nombre</th><th>Precio</th>
                        <th>Categoría</th><th>Imagen</th><th>Disponible</th><th>Extra</th><th>Acciones</th>
                    </tr></thead><tbody>`;
                data.registros.forEach(p => {
                    const disponible = p.disponibilidad ? '✅ Sí' : '❌ No';
                    const extra = p.es_extra ? '⭐ Sí' : '🍗 No';
                    const imgHtml = p.url_imagen ? `<img src="${p.url_imagen}" alt="imagen">` : '📷 Sin imagen';
                    html += `<tr>
                        <td>${p.id_producto}</td>
                        <td>${p.codigo_interno}</td>
                        <td>${p.nombre}</td>
                        <td>L ${p.precio}</td>
                        <td>${p.categoria_nombre || p.id_categoria}</td>
                        <td>${imgHtml}</td>
                        <td><span class="status-badge ${p.disponibilidad ? 'badge-available' : 'badge-unavailable'}">${disponible}</span></td>
                        <td><span class="status-badge ${p.es_extra ? 'badge-extra' : 'badge-normal'}">${extra}</span></td>
                        <td class="actions">
                            <button class="btn-edit" onclick="editProduct(${p.id_producto})">✏️ Editar</button>
                            <button class="btn-delete" onclick="deleteProduct(${p.id_producto})">🗑️ Eliminar</button>
                        </td>
                    </tr>`;
                });
                html += '</tbody></table>';
                container.innerHTML = html;
            } else {
                container.innerHTML = '<p>📭 No hay productos registrados.</p>';
            }
        } catch (error) {
            container.innerHTML = `<p class="error-message">⚠️ Error: ${error.message}</p>`;
        }
    }

    // ---- Eliminar producto (fetch) ----
    async function deleteProduct(id) {
        if (!confirm('¿Seguro que deseas eliminar este producto?')) return;
        try {
            const res = await fetch(API_BASE, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_producto: id })
            });
            const result = await res.json();
            alert(result.message);
            if (res.ok) loadProducts();
        } catch (error) {
            alert('Error al eliminar: ' + error.message);
        }
    }

    // ---- Editar producto: cargar datos y categorías ----
    async function editProduct(id) {
        try {
            const res = await fetch(`${API_BASE}?id=${id}`);
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Error ${res.status}: ${text.substring(0, 100)}`);
            }
            const product = await res.json();

            await cargarCategorias('editCategoria', product.id_categoria);

            document.getElementById('editId').value = product.id_producto;
            document.getElementById('editCodigo').value = product.codigo_interno || '';
            document.getElementById('editNombre').value = product.nombre || '';
            document.getElementById('editPrecio').value = product.precio || '';
            document.getElementById('editDisponibilidad').value = product.disponibilidad ? 1 : 0;
            document.getElementById('editExtra').value = product.es_extra ? 1 : 0;

            document.getElementById('editForm').style.display = 'block';
            window.scrollTo({ top: document.getElementById('editForm').offsetTop - 20, behavior: 'smooth' });
        } catch (error) {
            alert('Error al cargar producto: ' + error.message);
        }
    }

    // ---- Cancelar edición ----
    function cancelEdit() {
        document.getElementById('editForm').style.display = 'none';
        document.getElementById('updateForm').reset();
        const select = document.getElementById('editCategoria');
        if (select) select.innerHTML = '<option value="">Selecciona categoría</option>';
    }

    // ---- Actualizar producto (XMLHttpRequest con _method) ----
    document.getElementById('updateForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const id = document.getElementById('editId').value;
        if (!id) {
            alert('ID de producto no encontrado');
            return;
        }
        formData.append('_method', 'PUT');
        const xhr = new XMLHttpRequest();
        xhr.open('POST', API_BASE, true);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                const result = JSON.parse(xhr.responseText);
                alert(result.message);
                cancelEdit();
                loadProducts();
            } else {
                alert('Error al actualizar: ' + xhr.status + ' - ' + xhr.responseText);
            }
        };
        xhr.onerror = function() {
            alert('Error de red al actualizar.');
        };
        xhr.send(formData);
    });
</script>
</body>
</html>