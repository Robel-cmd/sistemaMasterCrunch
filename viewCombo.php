<?php
// viewCombo.php - Interfaz de prueba para la API de combos
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🍗 MasterCrunch - Gestión de Combos</title>
    <style>
        /* ====== ESTILOS COPIADOS DE viewProductos ====== */
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
        .form-grid input, .form-grid select, .form-grid textarea {
            width: 100%;
            padding: 12px 14px;
            border: 1px solid #dcc8b4;
            border-radius: 30px;
            background: white;
            font-size: 0.95rem;
            transition: 0.2s;
        }
        .form-grid input:focus, .form-grid select:focus, .form-grid textarea:focus {
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
        .btn-add-detail {
            background: #4a8c6b;
            color: white;
            border: none;
            padding: 8px 20px;
            border-radius: 40px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s;
            margin-top: 10px;
        }
        .btn-add-detail:hover {
            background: #2f6b4e;
        }
        .btn-remove-detail {
            background: #c95a4a;
            color: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.2s;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        .btn-remove-detail:hover {
            background: #a84334;
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
        .message {
            padding: 10px 15px;
            border-radius: 12px;
            margin: 15px 0;
            display: none;
        }
        .message.success {
            display: block;
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .message.error {
            display: block;
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        /* ====== MODAL ====== */
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }
        .modal-overlay.active {
            display: flex;
        }
        .modal-content {
            background: #fffaf2;
            max-width: 800px;
            width: 95%;
            max-height: 90vh;
            overflow-y: auto;
            padding: 30px;
            border-radius: 30px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            border: 1px solid #f0d5b0;
        }
        .modal-content h2 {
            margin-top: 0;
        }
        .modal-close {
            float: right;
            background: transparent;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #7a4a2e;
        }
        /* ====== DETALLES ====== */
        .detail-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            align-items: center;
            background: #f9f3ec;
            padding: 8px 12px;
            border-radius: 12px;
            margin-bottom: 8px;
        }
        .detail-row input, .detail-row select {
            padding: 6px 10px;
            border: 1px solid #dcc8b4;
            border-radius: 6px;
            flex: 1 1 120px;
        }
        .detail-row input[type="number"] {
            flex: 1 1 80px;
        }
        .detail-row .product-search {
            flex: 2 1 200px;
        }
        .detalles-container {
            margin-top: 10px;
        }
        /* ====== ENLACES ====== */
        .btn-back {
            background: #6c8b9f;
            color: white;
            padding: 10px 20px;
            border-radius: 40px;
            text-decoration: none;
            font-weight: 600;
            display: inline-block;
            margin-right: 10px;
        }
        .btn-back:hover {
            background: #5a7a8a;
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
            .detail-row {
                flex-direction: column;
                align-items: stretch;
            }
            .detail-row input, .detail-row select {
                width: 100%;
            }
        }
    </style>
</head>
<body>
<div class="container">
    <h1>🍗 MasterCrunch <small>Gestión de Combos – Pollo & Sabor</small></h1>
    <div style="margin-bottom: 20px;">
        <a href="viewCategoria.php" class="btn-back">📂 Gestionar Categorías</a>
        <a href="viewProductos.php" class="btn-back">📂 Gestionar Productos</a>
    </div>

    <div id="message" class="message"></div>

    <!-- ====== FORMULARIO DE CREACIÓN ====== -->
    <div class="form-section">
        <h2>➕ Nuevo Combo</h2>
        <form id="createForm" enctype="multipart/form-data">
            <div class="form-grid">
                <input type="text" name="nombre" placeholder="Nombre del combo" required>
                <textarea name="descripcion" placeholder="Descripción" rows="2"></textarea>
                <input type="number" step="0.01" name="precio_total" placeholder="Precio total" required>
                <select name="activo">
                    <option value="1">✅ Activo</option>
                    <option value="0">❌ Inactivo</option>
                </select>
                <input type="file" name="imagen" accept="image/*">
            </div>

            <h3 style="margin-top: 15px;">Detalles del Combo</h3>
            <div id="createDetailsContainer" class="detalles-container">
                <div class="detail-row" data-index="0">
                    <input type="text" class="product-search" placeholder="Buscar producto (ID, código, nombre)" list="productos-datalist-create-0" autocomplete="off">
                    <datalist id="productos-datalist-create-0"></datalist>
                    <input type="hidden" name="detalles[0][id_producto]" class="product-id-hidden">
                    <input type="number" step="1" name="detalles[0][cantidad]" placeholder="Cantidad" value="1" required>
                    <input type="number" step="0.01" name="detalles[0][precio_individual]" placeholder="Precio indiv." required>
                    <button type="button" class="btn-remove-detail" onclick="removeDetailRow(this)" style="display:none;">✕</button>
                </div>
            </div>
            <button type="button" class="btn-add-detail" onclick="addDetailRow('create')">➕ Agregar producto</button>
            <br><br>
            <button type="submit" class="btn-primary">Crear Combo</button>
        </form>
    </div>

    <!-- ====== LISTADO ====== -->
    <h2>📋 Lista de Combos</h2>
    <div id="comboList" class="product-list">
        <p class="loading">Cargando combos...</p>
    </div>
</div>

<!-- ====== MODAL DE EDICIÓN ====== -->
<div id="editModal" class="modal-overlay">
    <div class="modal-content">
        <button type="button" class="modal-close" onclick="closeEditModal()">&times;</button>
        <h2>✏️ Editar Combo</h2>
        <form id="updateForm" enctype="multipart/form-data">
            <input type="hidden" name="id_combo" id="editId">
            <div class="form-grid">
                <input type="text" name="nombre" id="editNombre" placeholder="Nombre" required>
                <textarea name="descripcion" id="editDescripcion" placeholder="Descripción" rows="2"></textarea>
                <input type="number" step="0.01" name="precio_total" id="editPrecioTotal" placeholder="Precio total" required>
                <select name="activo" id="editActivo">
                    <option value="1">✅ Activo</option>
                    <option value="0">❌ Inactivo</option>
                </select>
                <input type="file" name="imagen" accept="image/*">
                <small style="grid-column: span 2;">Dejar vacío para conservar la imagen actual</small>
            </div>

            <h3>Detalles del Combo</h3>
            <div id="editDetailsContainer" class="detalles-container">
                <!-- se llena dinámicamente -->
            </div>
            <button type="button" class="btn-add-detail" onclick="addDetailRow('edit')">➕ Agregar producto</button>
            <br><br>
            <button type="submit" class="btn-success">💾 Actualizar</button>
            <button type="button" class="btn-secondary" onclick="closeEditModal()">❌ Cancelar</button>
        </form>
    </div>
</div>

<script>
    // ====== CONFIGURACIÓN ======
    const API_BASE = 'http://localhost/sistemaMasterCrunch/backEnd/api/meta.php?entity=combo';
    let allProducts = [];          // todos los productos (incluidos no disponibles)
    let availableProducts = [];    // solo productos con disponibilidad = 1

    // ====== CARGAR PRODUCTOS (caché) ======
    async function loadProductsCache() {
        try {
            const res = await fetch('http://localhost/sistemaMasterCrunch/backEnd/api/meta.php?entity=producto');
            if (!res.ok) throw new Error('Error al cargar productos');
            const data = await res.json();
            allProducts = data.registros || [];
            // Filtrar solo los disponibles (disponibilidad == 1)
            availableProducts = allProducts.filter(p => p.disponibilidad == 1);
        } catch (error) {
            console.error('Error cargando productos:', error);
            allProducts = [];
            availableProducts = [];
        }
    }

    // ====== ACTUALIZAR DATALIST DE UNA FILA ======
    function updateDatalistForRow(row, formType, index) {
        const input = row.querySelector('.product-search');
        const datalist = row.querySelector('datalist');
        const hidden = row.querySelector('.product-id-hidden');

        if (!input || !datalist || !hidden) return;

        // Asignar ID único al datalist
        const datalistId = `productos-datalist-${formType}-${index}`;
        datalist.id = datalistId;
        input.setAttribute('list', datalistId);

        // Llenar datalist SOLO con productos disponibles
        datalist.innerHTML = '';
        availableProducts.forEach(p => {
            const opt = document.createElement('option');
            opt.value = `ID:${p.id_producto} | Cód:${p.codigo_interno} | ${p.nombre}`;
            opt.dataset.id = p.id_producto;
            opt.dataset.precio = p.precio;
            datalist.appendChild(opt);
        });

        // Evento: al seleccionar una opción, guardar id y precio
        input.addEventListener('input', function(e) {
            const selectedOption = Array.from(datalist.options).find(opt => opt.value === this.value);
            if (selectedOption) {
                hidden.value = selectedOption.dataset.id;
                // Auto-asignar precio si no es manual
                const precioInput = row.querySelector('input[name*="precio_individual"]');
                if (precioInput && !precioInput.dataset.manual) {
                    precioInput.value = selectedOption.dataset.precio;
                }
            } else {
                // Si el valor no coincide con ninguna opción, puede ser un producto no disponible
                // que se cargó desde la BD. No lo borramos, pero el hidden se mantiene.
                // Para evitar perder el ID, solo lo borramos si el input está vacío.
                if (this.value.trim() === '') {
                    hidden.value = '';
                }
            }
        });

        // Si el usuario modifica manualmente el precio, marcamos como manual
        const precioInput = row.querySelector('input[name*="precio_individual"]');
        if (precioInput) {
            precioInput.addEventListener('input', function() {
                this.dataset.manual = 'true';
            });
        }
    }

    // ====== AGREGAR FILA DE DETALLE ======
    function addDetailRow(formType = 'create') {
        const container = document.getElementById(formType === 'create' ? 'createDetailsContainer' : 'editDetailsContainer');
        const index = container.children.length;
        const row = document.createElement('div');
        row.className = 'detail-row';
        row.dataset.index = index;

        // Siempre usar 'detalles' como prefijo para que el backend lo reciba como $_POST['detalles']
        const namePrefix = 'detalles';
        row.innerHTML = `
            <input type="text" class="product-search" placeholder="Buscar producto (ID, código, nombre)" autocomplete="off">
            <datalist></datalist>
            <input type="hidden" name="${namePrefix}[${index}][id_producto]" class="product-id-hidden">
            <input type="number" step="1" name="${namePrefix}[${index}][cantidad]" placeholder="Cantidad" value="1" required>
            <input type="number" step="0.01" name="${namePrefix}[${index}][precio_individual]" placeholder="Precio indiv." required>
            <button type="button" class="btn-remove-detail" onclick="removeDetailRow(this)">✕</button>
        `;
        container.appendChild(row);
        updateDatalistForRow(row, formType, index);
        updateRemoveButtons(formType);
    }

    // ====== ELIMINAR FILA DE DETALLE ======
    function removeDetailRow(btn) {
        const row = btn.closest('.detail-row');
        const container = row.parentElement;
        if (container.children.length <= 1) {
            alert('Debe haber al menos un detalle.');
            return;
        }
        row.remove();
        // Reindexar nombres usando siempre 'detalles'
        const rows = container.querySelectorAll('.detail-row');
        const formType = container.id.includes('create') ? 'create' : 'edit';
        const namePrefix = 'detalles';
        rows.forEach((r, i) => {
            r.dataset.index = i;
            const hidden = r.querySelector('.product-id-hidden');
            if (hidden) hidden.setAttribute('name', `${namePrefix}[${i}][id_producto]`);
            const cant = r.querySelector('input[name*="cantidad"]');
            if (cant) cant.setAttribute('name', `${namePrefix}[${i}][cantidad]`);
            const precio = r.querySelector('input[name*="precio_individual"]');
            if (precio) precio.setAttribute('name', `${namePrefix}[${i}][precio_individual]`);
            // Actualizar datalist ID para que coincida con el nuevo índice
            const input = r.querySelector('.product-search');
            const datalist = r.querySelector('datalist');
            if (input && datalist) {
                const newId = `productos-datalist-${formType}-${i}`;
                datalist.id = newId;
                input.setAttribute('list', newId);
            }
        });
        updateRemoveButtons(formType);
    }

    // ====== ACTUALIZAR VISIBILIDAD DE BOTONES ELIMINAR ======
    function updateRemoveButtons(formType) {
        const container = document.getElementById(formType === 'create' ? 'createDetailsContainer' : 'editDetailsContainer');
        const rows = container.querySelectorAll('.detail-row');
        rows.forEach(row => {
            const btn = row.querySelector('.btn-remove-detail');
            if (btn) {
                btn.style.display = rows.length > 1 ? 'inline-flex' : 'none';
            }
        });
    }

    // ====== CARGAR COMBOS ======
    async function loadCombos() {
        const list = document.getElementById('comboList');
        list.innerHTML = '<p class="loading">Cargando combos...</p>';
        try {
            const res = await fetch(API_BASE);
            if (!res.ok) {
                if (res.status === 404) {
                    list.innerHTML = '<p>📭 No hay combos registrados.</p>';
                    return;
                }
                throw new Error(`Error ${res.status}`);
            }
            const data = await res.json();
            const combos = data.registros || [];
            if (combos.length === 0) {
                list.innerHTML = '<p>📭 No hay combos registrados.</p>';
                return;
            }
            let html = `<table>
                <thead><tr>
                    <th>ID</th><th>Nombre</th><th>Precio</th><th>Imagen</th>
                    <th>Activo</th><th>Detalles</th><th>Acciones</th>
                </tr></thead><tbody>`;
            combos.forEach(c => {
                const detallesHtml = (c.detalles && c.detalles.length > 0)
                    ? c.detalles.map(d => `${d.producto_nombre || 'Prod#'+d.id_producto} x${d.cantidad} (L ${d.precio_individual})`).join('<br>')
                    : 'Sin detalles';
                const imgHtml = c.url_imagen_combo ? `<img src="${c.url_imagen_combo}" alt="imagen">` : '📷';
                html += `<tr>
                    <td>${c.id_combo}</td>
                    <td>${c.nombre}</td>
                    <td>L ${c.precio_total}</td>
                    <td>${imgHtml}</td>
                    <td><span class="status-badge ${c.activo == 1 ? 'badge-active' : 'badge-inactive'}">${c.activo == 1 ? '✅ Activo' : '❌ Inactivo'}</span></td>
                    <td>${detallesHtml}</td>
                    <td class="actions">
                        <button class="btn-edit" onclick="openEditModal(${c.id_combo})">✏️ Editar</button>
                        <button class="btn-delete" onclick="deleteCombo(${c.id_combo})">🗑️ Eliminar</button>
                    </td>
                </tr>`;
            });
            html += '</tbody></table>';
            list.innerHTML = html;
        } catch (error) {
            list.innerHTML = `<p class="error-message">⚠️ Error: ${error.message}</p>`;
        }
    }

    // ====== CREAR COMBO ======
    document.getElementById('createForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        try {
            const res = await fetch(API_BASE, {
                method: 'POST',
                body: formData
            });
            const result = await res.json();
            if (res.ok) {
                showMessage(result.message || 'Combo creado', 'success');
                this.reset();
                // Resetear detalles a una sola fila
                const container = document.getElementById('createDetailsContainer');
                container.innerHTML = '';
                addDetailRow('create');
                loadCombos();
            } else {
                showMessage(result.message || 'Error al crear', 'error');
            }
        } catch (error) {
            showMessage('Error de red: ' + error.message, 'error');
        }
    });

    // ====== MODAL: ABRIR ======
    async function openEditModal(id) {
        try {
            const res = await fetch(`${API_BASE}&id=${id}`);
            if (!res.ok) throw new Error('Error al obtener combo');
            const combo = await res.json();

            // Llenar campos
            document.getElementById('editId').value = combo.id_combo;
            document.getElementById('editNombre').value = combo.nombre || '';
            document.getElementById('editDescripcion').value = combo.descripcion || '';
            document.getElementById('editPrecioTotal').value = combo.precio_total || '';
            document.getElementById('editActivo').value = combo.activo != undefined ? combo.activo : 1;

            // Cargar detalles
            const container = document.getElementById('editDetailsContainer');
            container.innerHTML = '';
            const detalles = combo.detalles || [];
            if (detalles.length === 0) {
                addDetailRow('edit');
            } else {
                // Siempre usar 'detalles' como prefijo
                const namePrefix = 'detalles';
                detalles.forEach((det, idx) => {
                    const row = document.createElement('div');
                    row.className = 'detail-row';
                    row.dataset.index = idx;
                    row.innerHTML = `
                        <input type="text" class="product-search" placeholder="Buscar producto (ID, código, nombre)" autocomplete="off">
                        <datalist></datalist>
                        <input type="hidden" name="${namePrefix}[${idx}][id_producto]" class="product-id-hidden" value="${det.id_producto}">
                        <input type="number" step="1" name="${namePrefix}[${idx}][cantidad]" placeholder="Cantidad" value="${det.cantidad}" required>
                        <input type="number" step="0.01" name="${namePrefix}[${idx}][precio_individual]" placeholder="Precio indiv." value="${det.precio_individual}" required>
                        <button type="button" class="btn-remove-detail" onclick="removeDetailRow(this)">✕</button>
                    `;
                    container.appendChild(row);
                    // Configurar datalist y seleccionar el producto actual
                    updateDatalistForRow(row, 'edit', idx);
                    // Pre-seleccionar el producto en el input de búsqueda (usando allProducts para mostrar aunque no esté disponible)
                    const input = row.querySelector('.product-search');
                    const product = allProducts.find(p => p.id_producto == det.id_producto);
                    if (product && input) {
                        input.value = `ID:${product.id_producto} | Cód:${product.codigo_interno} | ${product.nombre}`;
                    } else {
                        // Si el producto no existe (por ejemplo, fue eliminado), mostrar el ID
                        if (input) input.value = `ID:${det.id_producto} (producto no encontrado)`;
                    }
                    // Marcar precio como manual (porque viene de la BD)
                    const precioInput = row.querySelector('input[name*="precio_individual"]');
                    if (precioInput) precioInput.dataset.manual = 'true';
                });
                updateRemoveButtons('edit');
            }

            // Mostrar modal
            document.getElementById('editModal').classList.add('active');
        } catch (error) {
            showMessage('Error al cargar combo: ' + error.message, 'error');
        }
    }

    // ====== MODAL: CERRAR ======
    function closeEditModal() {
        document.getElementById('editModal').classList.remove('active');
        document.getElementById('updateForm').reset();
        document.getElementById('editDetailsContainer').innerHTML = '';
    }

    // ====== ACTUALIZAR COMBO ======
    document.getElementById('updateForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        formData.append('_method', 'PUT');
        try {
            const res = await fetch(API_BASE, {
                method: 'POST',
                body: formData
            });
            const result = await res.json();
            if (res.ok) {
                showMessage(result.message || 'Combo actualizado', 'success');
                closeEditModal();
                loadCombos();
            } else {
                showMessage(result.message || 'Error al actualizar', 'error');
            }
        } catch (error) {
            showMessage('Error de red: ' + error.message, 'error');
        }
    });

    // ====== ELIMINAR COMBO ======
    async function deleteCombo(id) {
        if (!confirm('¿Eliminar este combo permanentemente?')) return;
        try {
            const res = await fetch(API_BASE, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_combo: id })
            });
            const result = await res.json();
            if (res.ok) {
                showMessage(result.message || 'Combo eliminado', 'success');
                loadCombos();
            } else {
                showMessage(result.message || 'Error al eliminar', 'error');
            }
        } catch (error) {
            showMessage('Error de red: ' + error.message, 'error');
        }
    }

    // ====== MENSAJES ======
    function showMessage(text, type = 'success') {
        const msg = document.getElementById('message');
        msg.textContent = text;
        msg.className = 'message ' + type;
        clearTimeout(window.msgTimeout);
        window.msgTimeout = setTimeout(() => {
            msg.className = 'message';
            msg.textContent = '';
        }, 5000);
    }

    // ====== INICIALIZACIÓN ======
    document.addEventListener('DOMContentLoaded', async function() {
        await loadProductsCache();
        // Inicializar primera fila de creación
        const firstRow = document.querySelector('#createDetailsContainer .detail-row');
        if (firstRow) {
            updateDatalistForRow(firstRow, 'create', 0);
            updateRemoveButtons('create');
        }
        loadCombos();
    });

    // (Re)definir funciones globales para botones onclick
    window.addDetailRow = addDetailRow;
    window.removeDetailRow = removeDetailRow;
    window.openEditModal = openEditModal;
    window.closeEditModal = closeEditModal;
    window.deleteCombo = deleteCombo;
</script>
</body>
</html>