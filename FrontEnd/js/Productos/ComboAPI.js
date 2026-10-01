function initCombo() {
    const apirurlProductos = `/sistemaMasterCrunch/backEnd/api/meta.php?entity=producto`;
    const apirurlCombos = `/sistemaMasterCrunch/backEnd/api/meta.php?entity=combo`;

    let todosLosCombos = [];
    let valorTotalProd = 0;
    const contenedor = document.querySelector('#contenedor-combos');
    const inputSearch = document.querySelector('#searchInputCombo');

    //reconstruye el array de detalles desde el DOM
    function recolectarDetallesDesdeDOM(tbodyId) {
        const tbody = document.getElementById(tbodyId);
        if (!tbody) return [];
        const filas = tbody.querySelectorAll('tr');
        const detalles = [];
        filas.forEach(tr => {
            const id = tr.getAttribute('data-id-producto');
            const cantidad = tr.getAttribute('data-cantidad');
            const precio = tr.getAttribute('data-precio');
            if (id && cantidad && precio) {
                detalles.push({
                    id_producto: id.toString(),
                    cantidad: cantidad.toString(),
                    precio_individual: precio.toString()
                });
            }
        });
        return detalles;
    }

    //ahora con botón desactivar/activar
    function renderizarCombos(registros) {
        if (!contenedor) return;
        contenedor.innerHTML = "";

        if (!registros || registros.length === 0) {
            contenedor.innerHTML = `<p class="no-results" style="padding: 20px; text-align: center; width: 100%;">No se encontraron combos.</p>`;
            return;
        }

        let htmlAcumulado = "";

        registros.forEach(item => {
            const esActivo = item.activo == 0 ? 'innactivo' : 'activo';
            const claseActivo = item.activo == 0 ? 'inactivo' : 'activo';
            const cambiarEstadoBtn = item.activo == 1 ? 'desactivar' : 'activar';
            const textoEstadoVisual = item.activo == 0 ? 'Innactivo' : 'Activo';

            let detallesContent = "";
            if (item.detalles && Array.isArray(item.detalles)) {
                item.detalles.forEach(itemDetalle => {
                    detallesContent += `
                        <div class="card-list detalle">
                            <label>
                                <strong>
                                    <strong class="cant-detalle-combo">x${itemDetalle.cantidad}</strong>
                                    &nbsp;&nbsp;&nbsp;&nbsp; ${itemDetalle.producto_nombre}
                                </strong>
                                <strong class="detalle-precio">&nbsp;&nbsp;Lps.${itemDetalle.precio_individual}</strong>
                            </label>
                        </div>
                    `;
                });
            }

            const urlDefault = (item.url_imagen_combo && item.url_imagen_combo.trim() !== "")
                ? item.url_imagen_combo
                : "uploads/default/default-image.jpg";

            htmlAcumulado += `
                <div class="categoria">
                    <div class="image-wrapper">
                        <div class="image-category" id="categoria-view">
                            <img class="${esActivo}-image" src="/sistemamastercrunch/uploads/default/innactive.png" alt="innactivo">
                            <img class="img-category" src="/sistemamastercrunch/${urlDefault}" alt="Imagen del combo">
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="card-title ${claseActivo}">${textoEstadoVisual}</div>
                        <div class="card-title"><strong>${item.nombre}</strong></div>
                        <div class="card-value precio-combo">Lps.${item.precio_total}</div>
                        <div class="card-title detalles">${detallesContent}</div>
                    </div>
                    <div class="card-actions">
                        <div class="btn btn-edit button-editar btn-combo-edit" data-id="${item.id_combo}" id="editar-combo">Editar</div>
                        <div class="btn btn-${cambiarEstadoBtn} btn-${cambiarEstadoBtn}-combo" data-id="${item.id_combo}">${cambiarEstadoBtn}</div>
                        <div class="btn btn-borrar-Combo" data-id="${item.id_combo}">Eliminar</div>
                    </div>
                </div>
            `;
        });

        contenedor.innerHTML = htmlAcumulado;
    }

    // CARGAR API COMBO

    async function cargarAPICombo() {
        const apiMeta = '/sistemaMasterCrunch/backEnd/api/meta.php?entity=combo';

        try {
            const response = await fetch(apiMeta);

            if (response.status === 404) {
                todosLosCombos = [];
                renderizarCombos([]);
                return;
            }

            if (!response.ok) throw new Error('Error en la respuesta de la API');

            const data = await response.json();
            todosLosCombos = data.registros || data || [];
            renderizarCombos(todosLosCombos);

        } catch (error) {
            console.error('Error al cargar los datos:', error);
            todosLosCombos = [];
            renderizarCombos([]);
        }
    }

    if (inputSearch) {
        inputSearch.addEventListener('input', (e) => {
            const textoBusqueda = e.target.value.toLowerCase().trim();
            const combosFiltrados = todosLosCombos.filter(item => {
                const nombreCombo = item.nombre ? item.nombre.toLowerCase() : "";
                return nombreCombo.includes(textoBusqueda);
            });
            renderizarCombos(combosFiltrados);
        });
    }

    // FILTRO MODAL AGREGAR
    function initFiltroModalCombos() {
        let productosOriginales = [];
        const inputFiltroModal = document.querySelector('#filtro-productos-modal');
        const selectProductos = document.querySelector('#content-list-product');

        function actualizarSelect(productos) {
            if (!selectProductos) return;
            selectProductos.innerHTML = "";

            if (!productos || productos.length === 0) {
                const option = document.createElement('option');
                option.text = "No se encontraron productos";
                option.disabled = true;
                selectProductos.appendChild(option);
                return;
            }

            const optionDefault = document.createElement('option');
            optionDefault.text = "Seleccione un producto...";
            optionDefault.value = "";
            optionDefault.disabled = true;
            optionDefault.selected = true;
            selectProductos.appendChild(optionDefault);

            productos.forEach(prod => {
                const option = document.createElement('option');
                option.value = prod.id_producto;
                option.text = prod.nombre;
                selectProductos.appendChild(option);
            });
        }

        async function cargarProductosParaModal() {
            try {
                const response = await fetch('/sistemaMasterCrunch/backEnd/api/meta.php?entity=producto');
                const data = await response.json();
                productosOriginales = data.registros || data || [];
                actualizarSelect(productosOriginales);
            } catch (error) {
                console.error('Error al cargar productos para el modal:', error);
            }
        }

        if (inputFiltroModal) {
            inputFiltroModal.addEventListener('input', (e) => {
                const texto = e.target.value.toLowerCase().trim();
                const productosFiltrados = productosOriginales.filter(prod => {
                    const nombreProd = prod.nombre ? prod.nombre.toLowerCase() : "";
                    return nombreProd.includes(texto);
                });
                actualizarSelect(productosFiltrados);
            });
        }

        cargarProductosParaModal();
    }

    cargarAPICombo();
    initFiltroModalCombos();

    // LIMPIAR MODAL AGREGAR
    function limpiarModalCombo() {
        valorTotalProd = 0;

        const contenidoLista = document.getElementById('content-prod-list');
        if (contenidoLista) contenidoLista.innerHTML = '';

        const campos = ['nombreCombo', 'desc-combo', 'precio-total-combo', 'cant-prod-cmb', 'filtro-productos-modal'];
        campos.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = (id === 'cant-prod-cmb') ? '1' : '';
        });

        const fileInput = document.getElementById('url-imagen-combo');
        if (fileInput) fileInput.value = '';

        const valorSpan = document.getElementById('precio-total-prod');
        if (valorSpan) valorSpan.textContent = "Total: 00.00 Lps";

        const modal = document.getElementById('modal-combos');
        if (modal && modal.open) modal.close();
    }

    // AGREGAR PRODUCTO AL COMBO
    const btnAgregarProd = document.getElementById('meter-datos-prod-cmb');
    if (btnAgregarProd) {
        btnAgregarProd.addEventListener('click', () => {
            const inputSelectProd = document.getElementById('content-list-product').value;
            const cantidad = document.getElementById('cant-prod-cmb').value;

            if (!inputSelectProd) { alert("Selecciona un producto válido"); return; }
            if (!cantidad || cantidad <= 0) { alert("Ingresa una cantidad válida"); return; }

            fetch(`${apirurlProductos}&id=${inputSelectProd}`)
                .then(res => res.json())
                .then(data => {
                    if (data.nombre === undefined) { alert("Producto no válido"); return; }

                    const precioNum = parseFloat(data.precio) || 0;
                    const total = precioNum * cantidad;
                    valorTotalProd += total;

                    const valorSpan = document.getElementById('precio-total-prod');
                    valorSpan.textContent = valorTotalProd > 0
                        ? `Total: ${valorTotalProd.toFixed(2)} Lps`
                        : "Total: 00.00 Lps";

                    document.getElementById('precio-total-combo').value = valorTotalProd.toFixed(2);

                    const bodyContent = document.getElementById('content-prod-list');
                    const contentList = `
                        <tr data-id-producto="${data.id_producto}"
                            data-cantidad="${cantidad}"
                            data-precio="${precioNum}"
                            data-total="${total.toFixed(2)}">
                            <td>${data.nombre}</td>
                            <td>${cantidad}</td>
                            <td>${precioNum.toFixed(2)}</td>
                            <td>${total.toFixed(2)}</td>
                            <td><button type="button" class="btn btn-cancelar-fila" data-total="${total.toFixed(2)}">Cancelar</button></td>
                        </tr>
                    `;
                    bodyContent.innerHTML += contentList;
                })
                .catch(error => console.error("Error al obtener producto:", error));
        });
    }

    // CANCELAR FILA
    const bodyContentList = document.getElementById('content-prod-list');
    if (bodyContentList) {
        bodyContentList.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-cancelar-fila, .btn-cancelar-fila-edit');
            if (!btn) return;

            const tr = btn.closest('tr');
            if (!tr) return;

            const totalFila = parseFloat(tr.getAttribute('data-total')) || 0;

            valorTotalProd = Math.max(0, valorTotalProd - totalFila);

            const valorSpan = document.getElementById('precio-total-prod');
            const inputTotal = document.getElementById('precio-total-combo');
            if (valorTotalProd <= 0) {
                valorTotalProd = 0;
                valorSpan.textContent = "Total: 00.00 Lps";
                if (inputTotal) inputTotal.value = '';
            } else {
                valorSpan.textContent = `Total: ${valorTotalProd.toFixed(2)} Lps`;
                if (inputTotal) inputTotal.value = valorTotalProd.toFixed(2);
            }

            tr.remove();
        });
    }

    const btnCancelCombos = document.getElementById('btn-cancel-combos');
    const btnCloseCombos = document.getElementById('btn-close-combos');
    if (btnCancelCombos) btnCancelCombos.addEventListener('click', limpiarModalCombo);
    if (btnCloseCombos) btnCloseCombos.addEventListener('click', limpiarModalCombo);

    const modalCombosEl = document.getElementById('modal-combos');
    if (modalCombosEl) modalCombosEl.addEventListener('close', limpiarModalCombo);

    // CREAR COMBO
    const agregarCombo = document.getElementById('AgregarComboNuevo');
    if (agregarCombo) {
        agregarCombo.addEventListener('click', async () => {
            const nombreCombo = document.getElementById('nombreCombo').value.trim();
            const descCombo = document.getElementById('desc-combo').value.trim();
            const precioTotalCombo = document.getElementById('precio-total-combo').value.trim();

            const detallesFinales = recolectarDetallesDesdeDOM('content-prod-list');

            if (detallesFinales.length === 0) {
                alert("Debes agregar al menos un producto al combo.");
                return;
            }
            if (nombreCombo === "" || descCombo === "" || precioTotalCombo === "") {
                alert("Debes rellenar todos los campos.");
                return;
            }

            const suma = detallesFinales.reduce((acc, d) =>
                acc + (parseFloat(d.precio_individual) * parseInt(d.cantidad)), 0);
            if (Math.abs(suma - parseFloat(precioTotalCombo)) > 0.01) {
                alert(`El precio total (${parseFloat(precioTotalCombo).toFixed(2)}) no coincide con la suma (${suma.toFixed(2)}).`);
                return;
            }

            const formData = new FormData();
            formData.append("nombre", nombreCombo);
            formData.append("descripcion", descCombo);
            formData.append("precio_total", precioTotalCombo);
            formData.append("activo", "1");

            detallesFinales.forEach((det, i) => {
                formData.append(`detalles[${i}][id_producto]`, det.id_producto);
                formData.append(`detalles[${i}][cantidad]`, det.cantidad);
                formData.append(`detalles[${i}][precio_individual]`, det.precio_individual);
            });

            const fileInput = document.getElementById('url-imagen-combo');
            if (fileInput && fileInput.files && fileInput.files[0]) {
                formData.append("imagen", fileInput.files[0]);
            }

            try {
                const res = await fetch(apirurlCombos, { method: 'POST', body: formData });
                const resultado = await res.json();
                if (res.ok) {
                    mostrarNotificacion(resultado.message, "success");
                    limpiarModalCombo();
                    cargarAPICombo();
                } else {
                    mostrarNotificacion(resultado.message, "error");
                }
            } catch (error) {
                console.error("Error de red al enviar el combo:", error);
            }
        });
    }

    // EDITAR COMBO
    let comboAnteriorUrl = "";
    let valorTotalProdedit = 0;
    let idComboEnEdicion = null;

    function limpiarModalComboEdit() {
        idComboEnEdicion = null;
        comboAnteriorUrl = "";
        valorTotalProdedit = 0;

        const contenidoLista = document.getElementById('content-prod-list-edit');
        if (contenidoLista) contenidoLista.innerHTML = '';

        const campos = ['nombreCombo-edit', 'desc-combo-edit', 'precio-total-combo-edit', 'cant-prod-cmb-edit', 'filtro-productos-modal-edit'];
        campos.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = (id === 'cant-prod-cmb-edit') ? '1' : '';
        });

        const fileInput = document.getElementById('url-imagen-combo-edit');
        if (fileInput) fileInput.value = '';

        const valorSpan = document.getElementById('precio-total-prod-edit');
        if (valorSpan) valorSpan.textContent = "Total: 00.00 Lps";

        const modal = document.getElementById('modal-combos-edit');
        if (modal && modal.open) modal.close();
    }

    const modalEditCombo = document.getElementById('modal-combos-edit');
    const btncerrarEditFCombo = document.getElementById('btn-close-combos-edit');
    const btnCancelEditarCombo = document.getElementById('btn-cancel-combos-edit');

    if (modalEditCombo) modalEditCombo.addEventListener('close', limpiarModalComboEdit);

    document.addEventListener('click', async (e) => {
        const btnEditarCombo = e.target.closest('.btn-combo-edit');
        if (btnEditarCombo && modalEditCombo) {
            const idCombo = btnEditarCombo.dataset.id;
            idComboEnEdicion = idCombo;

            valorTotalProdedit = 0;
            document.getElementById('content-prod-list-edit').innerHTML = '';

            const apiComboId = `${apirurlCombos}&id=${idCombo}`;
            try {
                const res = await fetch(apiComboId);
                const data = await res.json();
                document.getElementById('nombreCombo-edit').value = data.nombre || '';
                document.getElementById('desc-combo-edit').value = data.descripcion || '';
                document.getElementById('precio-total-combo-edit').value = data.precio_total || '';

                comboAnteriorUrl = data.url_imagen_combo || '';

                const bodyContent = document.getElementById('content-prod-list-edit');
                const valorSpan = document.getElementById('precio-total-prod-edit');

                if (data.detalles && Array.isArray(data.detalles)) {
                    for (const item of data.detalles) {
                        let nombreProd = item.producto_nombre || "Producto";
                        if (!item.producto_nombre) {
                            try {
                                const resProd = await fetch(`${apirurlProductos}&id=${item.id_producto}`);
                                const prodData = await resProd.json();
                                if (prodData.nombre) nombreProd = prodData.nombre;
                            } catch (err) { console.error(err); }
                        }
                        const precioInd = parseFloat(item.precio_individual) || 0;
                        const cantidad = parseFloat(item.cantidad) || 0;
                        const totalFila = precioInd * cantidad;

                        valorTotalProdedit += totalFila;

                        const contentList = `
                            <tr data-id-producto="${item.id_producto}"
                                data-cantidad="${cantidad}"
                                data-precio="${precioInd}"
                                data-total="${totalFila.toFixed(2)}">
                                <td>${nombreProd}</td>
                                <td>${cantidad}</td>
                                <td>${precioInd.toFixed(2)}</td>
                                <td>${totalFila.toFixed(2)}</td>
                                <td><button type="button" class="btn btn-cancelar-fila-edit" data-total="${totalFila.toFixed(2)}">Cancelar</button></td>
                            </tr>
                        `;
                        bodyContent.insertAdjacentHTML('beforeend', contentList);
                    }
                }
                valorSpan.textContent = valorTotalProdedit > 0
                    ? `Total: ${valorTotalProdedit.toFixed(2)} Lps`
                    : "Total: 00.00 Lps";
            } catch (error) {
                console.error("Error al cargar el combo para editar:", error);
            }
            modalEditCombo.showModal();
        }
    });

    if (btncerrarEditFCombo) btncerrarEditFCombo.addEventListener('click', limpiarModalComboEdit);
    if (btnCancelEditarCombo) btnCancelEditarCombo.addEventListener('click', limpiarModalComboEdit);

    // CANCELAR FILA
    const bodyContentListEdit = document.getElementById('content-prod-list-edit');
    if (bodyContentListEdit) {
        bodyContentListEdit.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-cancelar-fila-edit, .btn-cancelar-fila');
            if (!btn) return;

            const tr = btn.closest('tr');
            if (!tr) return;

            const totalFila = parseFloat(tr.getAttribute('data-total')) || 0;

            valorTotalProdedit = Math.max(0, valorTotalProdedit - totalFila);

            const valorSpan = document.getElementById('precio-total-prod-edit');
            const inputTotal = document.getElementById('precio-total-combo-edit');
            if (valorTotalProdedit <= 0) {
                valorTotalProdedit = 0;
                valorSpan.textContent = "Total: 00.00 Lps";
                if (inputTotal) inputTotal.value = '';
            } else {
                valorSpan.textContent = `Total: ${valorTotalProdedit.toFixed(2)} Lps`;
                if (inputTotal) inputTotal.value = valorTotalProdedit.toFixed(2);
            }

            tr.remove();
        });
    }

    // AGREGAR PRODUCTO EDITAR
    const btnAgregarProdEdit = document.getElementById('meter-datos-prod-cmb-edit');
    if (btnAgregarProdEdit) {
        btnAgregarProdEdit.addEventListener('click', async () => {
            const inputSelectProd = document.getElementById('content-list-product-edit').value;
            const cantidad = parseFloat(document.getElementById('cant-prod-cmb-edit').value);

            if (!inputSelectProd) { alert("Selecciona un producto válido"); return; }
            if (!cantidad || cantidad <= 0) { alert("Ingresa una cantidad válida"); return; }

            try {
                const res = await fetch(`${apirurlProductos}&id=${inputSelectProd}`);
                const data = await res.json();
                if (!data || !data.nombre) { alert("Producto no encontrado"); return; }

                const precioNum = parseFloat(data.precio) || 0;
                const totalFila = precioNum * cantidad;
                valorTotalProdedit += totalFila;

                const valorSpan = document.getElementById('precio-total-prod-edit');
                valorSpan.textContent = `Total: ${valorTotalProdedit.toFixed(2)} Lps`;
                document.getElementById('precio-total-combo-edit').value = valorTotalProdedit.toFixed(2);

                const bodyContent = document.getElementById('content-prod-list-edit');
                const contentList = `
                    <tr data-id-producto="${data.id_producto}"
                        data-cantidad="${cantidad}"
                        data-precio="${precioNum}"
                        data-total="${totalFila.toFixed(2)}">
                        <td>${data.nombre}</td>
                        <td>${cantidad}</td>
                        <td>${precioNum.toFixed(2)}</td>
                        <td>${totalFila.toFixed(2)}</td>
                        <td><button type="button" class="btn btn-cancelar-fila-edit" data-total="${totalFila.toFixed(2)}">Cancelar</button></td>
                    </tr>
                `;
                bodyContent.insertAdjacentHTML('beforeend', contentList);
            } catch (error) {
                console.error("Error al obtener producto:", error);
            }
        });
    }

    // FILTRO MODAL EDITAR

    function initFiltroModalCombosEdit() {
        let productosOriginalesEdit = [];
        const inputFiltroModalEdit = document.querySelector('#filtro-productos-modal-edit');
        const selectProductosEdit = document.querySelector('#content-list-product-edit');

        function actualizarSelectEdit(productos) {
            if (!selectProductosEdit) return;
            selectProductosEdit.innerHTML = "";

            if (!productos || productos.length === 0) {
                const option = document.createElement('option');
                option.text = "No se encontraron productos";
                option.disabled = true;
                selectProductosEdit.appendChild(option);
                return;
            }

            const optionDefault = document.createElement('option');
            optionDefault.text = "Seleccione un producto...";
            optionDefault.value = "";
            optionDefault.disabled = true;
            optionDefault.selected = true;
            selectProductosEdit.appendChild(optionDefault);

            productos.forEach(prod => {
                const option = document.createElement('option');
                option.value = prod.id_producto;
                option.text = prod.nombre;
                selectProductosEdit.appendChild(option);
            });
        }

        async function cargarProductosParaModalEdit() {
            try {
                const response = await fetch(apirurlProductos);
                const data = await response.json();
                productosOriginalesEdit = data.registros || data || [];
                actualizarSelectEdit(productosOriginalesEdit);
            } catch (error) {
                console.error('Error al cargar productos para el modal de edición:', error);
            }
        }

        if (inputFiltroModalEdit) {
            inputFiltroModalEdit.addEventListener('input', (e) => {
                const texto = e.target.value.toLowerCase().trim();
                const productosFiltrados = productosOriginalesEdit.filter(prod => {
                    const nombreProd = prod.nombre ? prod.nombre.toLowerCase() : "";
                    return nombreProd.includes(texto);
                });
                actualizarSelectEdit(productosFiltrados);
            });
        }

        cargarProductosParaModalEdit();
    }
    initFiltroModalCombosEdit();

    // UPDATE COMBO
    const buttonPUTdata = document.getElementById('btn-PUT-combos-edit');
    if (buttonPUTdata) {
        buttonPUTdata.addEventListener('click', async () => {
            if (!idComboEnEdicion) { alert('No se ha identificado el ID del combo'); return; }

            const nombreCombo = document.getElementById('nombreCombo-edit').value.trim();
            const descCombo = document.getElementById('desc-combo-edit').value.trim();
            const precioTotalCombo = document.getElementById('precio-total-combo-edit').value.trim();

            const detallesFinales = recolectarDetallesDesdeDOM('content-prod-list-edit');

            if (detallesFinales.length === 0) {
                alert("Debes agregar al menos un producto al combo.");
                return;
            }
            if (nombreCombo === "" || descCombo === "" || precioTotalCombo === "") {
                alert("Debes rellenar todos los campos obligatorios.");
                return;
            }

            const suma = detallesFinales.reduce((acc, d) =>
                acc + (parseFloat(d.precio_individual) * parseInt(d.cantidad)), 0);
            if (Math.abs(suma - parseFloat(precioTotalCombo)) > 0.01) {
                alert(`El precio total (${parseFloat(precioTotalCombo).toFixed(2)}) no coincide con la suma (${suma.toFixed(2)}).`);
                return;
            }

            const formData = new FormData();
            formData.append("id_combo", idComboEnEdicion.toString());
            formData.append("nombre", nombreCombo);
            formData.append("descripcion", descCombo);
            formData.append("precio_total", precioTotalCombo);
            formData.append("activo", "1");

            detallesFinales.forEach((det, i) => {
                formData.append(`detalles[${i}][id_producto]`, det.id_producto);
                formData.append(`detalles[${i}][cantidad]`, det.cantidad);
                formData.append(`detalles[${i}][precio_individual]`, det.precio_individual);
            });

            formData.append("_method", "PUT");

            const inputFile = document.getElementById('url-imagen-combo-edit');
            if (inputFile && inputFile.files && inputFile.files.length > 0) {
                formData.append("imagen", inputFile.files[0]);
            } else {
                formData.append("url_imagen_combo", comboAnteriorUrl || "");
            }

            try {
                const res = await fetch(`${apirurlCombos}&id=${idComboEnEdicion}`, {
                    method: 'POST',
                    body: formData
                });
                const resultado = await res.json();
                if (res.ok) {
                    mostrarNotificacion(resultado.message || "Combo actualizado con éxito", "success");
                    limpiarModalComboEdit();
                    cargarAPICombo();
                } else {
                    mostrarNotificacion(resultado.message || "Error al actualizar el combo", "error");
                }
            } catch (error) {
                console.error("Error de red al actualizar el combo:", error);
                mostrarNotificacion("Error de conexión con el servidor", "error");
            }
        });
    }

    // DESACTIVAR / ACTIVAR COMBO
    const warningModalCombo = document.getElementById('warning-modal-desactivar-combo');
    const confirmAccionCombo = document.getElementById('confirmar-desactivar-combo');
    const cancelAccionCombo = document.getElementById('cancelar-desactivar-combo');
    let idComboActual = null;
    let accionComboActual = null;

    document.addEventListener('click', (e) => {
        const btnDesactivar = e.target.closest('.btn-desactivar-combo');
        const btnActivar = e.target.closest('.btn-activar-combo');

        if (btnDesactivar) {
            idComboActual = btnDesactivar.dataset.id;
            accionComboActual = 'desactivar';
            if (warningModalCombo && !warningModalCombo.open) warningModalCombo.showModal();
        } else if (btnActivar) {
            idComboActual = btnActivar.dataset.id;
            accionComboActual = 'activar';
            if (warningModalCombo && !warningModalCombo.open) warningModalCombo.showModal();
        }
    });

    if (cancelAccionCombo && warningModalCombo) {
        cancelAccionCombo.addEventListener('click', () => {
            if (warningModalCombo.open) warningModalCombo.close();
            idComboActual = null;
            accionComboActual = null;
        });
    }

    if (warningModalCombo) {
        warningModalCombo.addEventListener('close', () => {
            idComboActual = null;
            accionComboActual = null;
        });
    }

    if (confirmAccionCombo) {
        confirmAccionCombo.addEventListener('click', () => {
            const idAccion = idComboActual;
            const accion = accionComboActual;

            if (warningModalCombo && warningModalCombo.open) warningModalCombo.close();
            if (!idAccion || !accion) return;

            const nuevoEstado = accion === 'activar' ? 1 : 0;

            fetch(`${apirurlCombos}&id=${idAccion}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_combo: idAccion, activo: nuevoEstado })
            })
            .then(res => res.json().then(d => ({ ok: res.ok, data: d })))
            .then(({ ok, data }) => {
                if (ok) {
                    cargarAPICombo();
                    mostrarNotificacion("¡Se ha modificado el combo con éxito!", "success");
                } else {
                    mostrarNotificacion(data.message || "No se pudo modificar el combo", "error");
                }
            })
            .catch(error => {
                console.error(error);
                mostrarNotificacion("¡No se ha podido modificar el combo!", "error");
            });
        });
    }

    //ELIMINAR COMBO
    const warningModalBorrarCombo = document.getElementById('warning-modal-borrar-combo');
    const btnConfirmEliminarCombo = document.getElementById('confirmar-eliminar-combo');
    const btnCancelarEliminarCombo = document.getElementById('cancelar-eliminar-combo');
    let idComboEliminar = null;

    document.addEventListener('click', (e) => {
        const btnEliminarCombo = e.target.closest('.btn-borrar-Combo');
        if (!btnEliminarCombo) return;
        const id = btnEliminarCombo.dataset.id;
        if (!id) return;
        idComboEliminar = id;
        if (warningModalBorrarCombo && !warningModalBorrarCombo.open) warningModalBorrarCombo.showModal();
    });

    if (btnCancelarEliminarCombo && warningModalBorrarCombo) {
        btnCancelarEliminarCombo.addEventListener('click', () => {
            if (warningModalBorrarCombo.open) warningModalBorrarCombo.close();
            idComboEliminar = null;
        });
    }

    if (warningModalBorrarCombo) {
        warningModalBorrarCombo.addEventListener('close', () => {
            idComboEliminar = null;
        });
    }

    if (btnConfirmEliminarCombo) {
        btnConfirmEliminarCombo.addEventListener('click', async () => {
            const idEliminar = idComboEliminar;

            if (warningModalBorrarCombo && warningModalBorrarCombo.open) warningModalBorrarCombo.close();
            if (!idEliminar) return;

            try {
                const res = await fetch(apirurlCombos, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_combo: idEliminar.toString() })
                });
                const data = await res.json();

                if (res.ok) {
                    mostrarNotificacion(data.message || "Combo eliminado exitosamente", "success");
                    cargarAPICombo();
                } else {
                    mostrarNotificacion(data.message || "No se pudo eliminar el combo", "error");
                }
            } catch (error) {
                console.error('Error de red al eliminar:', error);
                mostrarNotificacion("Error de conexión con el servidor", "error");
            }
        });
    }
}