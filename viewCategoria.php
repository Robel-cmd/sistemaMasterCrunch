<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📂 MasterCrunch - Gestión de Categorías</title>
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
            max-width: 1100px;
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
        .btn-back {
            background: #6c757d;
            color: white;
            border: none;
            padding: 10px 24px;
            border-radius: 40px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s;
            text-decoration: none;
            display: inline-block;
        }
        .btn-back:hover {
            background: #5a6268;
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
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 30px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        .badge-active {
            background: #c8e6c9;
            color: #1e4a2a;
        }
        .badge-inactive {
            background: #f0c0b0;
            color: #5a2a1a;
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
        .header-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 15px;
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
    <div class="header-actions">
        <h1>📂 MasterCrunch <small>Gestión de Categorías</small></h1>
        <a href="index.php" class="btn-back">← Volver a Productos</a>
    </div>

    <!-- Formulario CREAR -->
    <div class="form-section">
        <h2>➕ Nueva Categoría</h2>
        <form id="createForm">
            <div class="form-grid">
                <input type="text" name="nombre" placeholder="Nombre" required>
                <input type="text" name="descripcion" placeholder="Descripción (opcional)">
                <select name="activo">
                    <option value="1">✅ Activo</option>
                    <option value="0">❌ Inactivo</option>
                </select>
                <button type="submit" class="btn-primary">➕ Crear Categoría</button>
            </div>
        </form>
    </div>

    <!-- Formulario EDITAR (oculto) -->
    <div id="editForm">
        <h2>✏️ Editar Categoría</h2>
        <form id="updateForm">
            <input type="hidden" name="id_categoria" id="editId">
            <div class="form-grid">
                <input type="text" name="nombre" id="editNombre" placeholder="Nombre" required>
                <input type="text" name="descripcion" id="editDescripcion" placeholder="Descripción">
                <select name="activo" id="editActivo">
                    <option value="1">✅ Activo</option>
                    <option value="0">❌ Inactivo</option>
                </select>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button type="submit" class="btn-success">💾 Actualizar</button>
                    <button type="button" class="btn-cancel" onclick="cancelEdit()">❌ Cancelar</button>
                </div>
            </div>
        </form>
    </div>

    <!-- Listado -->
    <h2>📋 Lista de Categorías</h2>
    <div id="categoriaList" class="product-list">
        <p class="loading">Cargando categorías...</p>
    </div>
</div>

<script>
    const API_BASE = 'http://localhost/sistemaMasterCrunch/backEnd/index.php?entity=categoria&incluirInactivas=true';

    // ---- Cargar listado al inicio ----
    document.addEventListener('DOMContentLoaded', loadCategorias);

    // ---- Crear categoría (fetch) ----
    document.getElementById('createForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => { data[key] = value; });

        try {
            const res = await fetch(API_BASE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            alert(result.message);
            if (res.ok) {
                this.reset();
                loadCategorias();
            }
        } catch (error) {
            alert('Error al crear: ' + error.message);
        }
    });

    // ---- Cargar todas las categorías ----
    async function loadCategorias() {
        const container = document.getElementById('categoriaList');
        container.innerHTML = '<p class="loading">Cargando...</p>';
        try {
            const res = await fetch(API_BASE);
            if (!res.ok) {
                if (res.status === 404) {
                    container.innerHTML = '<p>📭 No hay categorías registradas.</p>';
                    return;
                }
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }
            const data = await res.json();
            if (data.length > 0) {
                let html = `<table>
                    <thead><tr>
                        <th>ID</th><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Acciones</th>
                    </tr></thead><tbody>`;
                data.forEach(c => {
                    const estado = c.activo ? '✅ Activo' : '❌ Inactivo';
                    const badgeClass = c.activo ? 'badge-active' : 'badge-inactive';
                    html += `<tr>
                        <td>${c.id_categoria}</td>
                        <td>${c.nombre}</td>
                        <td>${c.descripcion || ''}</td>
                        <td><span class="status-badge ${badgeClass}">${estado}</span></td>
                        <td class="actions">
                            <button class="btn-edit" onclick="editCategoria(${c.id_categoria})">✏️ Editar</button>
                            <button class="btn-delete" onclick="deleteCategoria(${c.id_categoria})">🗑️ Eliminar</button>
                        </td>
                    </tr>`;
                });
                html += '</tbody></table>';
                container.innerHTML = html;
            } else {
                container.innerHTML = '<p>📭 No hay categorías registradas.</p>';
            }
        } catch (error) {
            container.innerHTML = `<p class="error-message">⚠️ Error: ${error.message}</p>`;
        }
    }

    // ---- Eliminar categoría ----
    async function deleteCategoria(id) {
        if (!confirm('¿Eliminar esta categoría?')) return;
        try {
            const res = await fetch(`${API_BASE}&id=${id}`, {
                method: 'DELETE'
            });
            const result = await res.json();
            alert(result.message);
            if (res.ok) loadCategorias();
        } catch (error) {
            alert('Error al eliminar: ' + error.message);
        }
    }

    // ---- Editar: cargar datos ----
    async function editCategoria(id) {
        try {
            const res = await fetch(`${API_BASE}&id=${id}`);
            if (!res.ok) throw new Error('No se encontró la categoría');
            const data = await res.json();

            document.getElementById('editId').value = data.id_categoria;
            document.getElementById('editNombre').value = data.nombre || '';
            document.getElementById('editDescripcion').value = data.descripcion || '';
            document.getElementById('editActivo').value = data.activo ? 1 : 0;

            document.getElementById('editForm').style.display = 'block';
            window.scrollTo({ top: document.getElementById('editForm').offsetTop - 20, behavior: 'smooth' });
        } catch (error) {
            alert('Error al cargar categoría: ' + error.message);
        }
    }

    // ---- Cancelar edición ----
    function cancelEdit() {
        document.getElementById('editForm').style.display = 'none';
        document.getElementById('updateForm').reset();
    }

    // ---- Actualizar categoría ----
    document.getElementById('updateForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => { data[key] = value; });
        const id = data.id_categoria;
        if (!id) {
            alert('ID no válido');
            return;
        }
        delete data.id_categoria; // lo enviamos en la URL

        try {
            const res = await fetch(`${API_BASE}&id=${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            alert(result.message);
            if (res.ok) {
                cancelEdit();
                loadCategorias();
            }
        } catch (error) {
            alert('Error al actualizar: ' + error.message);
        }
    });
</script>
</body>
</html>