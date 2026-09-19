function initProductos() {
    const apirurlCat = `/sistemaMasterCrunch/backEnd/api/meta.php?entity=categoria`;
    const apirurlProductos = `/sistemaMasterCrunch/backEnd/api/meta.php?entity=producto`;
    const apirurlCombos = `/sistemaMasterCrunch/backEnd/api/meta.php?entity=combo`;
    let listaProductosGlobal = [];
    let objetoCategoriasGlobal = {};

    // VISTA PREVIA DE IMAGEN
    const modalViewImage = document.getElementById('modalViewImg');
    const btnCloseModal = document.getElementById('btn-cancel-viewImg');
    const btnXmodal = document.getElementById('btn-close-viewImage');
    const imgPreviewContent = document.querySelector('#modalViewImg #img-preview-content');

    document.addEventListener('click', (e) => {
        // 🔧 FIX: usar closest por si el click cae en un hijo del img
        const img = e.target.closest('.img-prod');
        if (img && modalViewImage && imgPreviewContent) {
            imgPreviewContent.src = img.src;
            imgPreviewContent.alt = img.alt;
            // 🔧 FIX: guard contra doble open
            if (!modalViewImage.open) modalViewImage.showModal();
        }
    });

    if (btnCloseModal && modalViewImage) {
        btnCloseModal.addEventListener('click', () => modalViewImage.close());
    }
    if (btnXmodal && modalViewImage) {
        btnXmodal.addEventListener('click', () => modalViewImage.close());
    }
    if (modalViewImage) {
        modalViewImage.addEventListener('click', (e) => {
            const d = modalViewImage.getBoundingClientRect();
            if (
                e.clientX < d.left ||
                e.clientX > d.right ||
                e.clientY < d.top ||
                e.clientY > d.bottom
            ) {
                modalViewImage.close();
            }
        });
    }

    // RENDER TABLA
    function renderizarTabla(registros) {
        const contenedorTabla = document.querySelector('#table-content tbody');
        if (!contenedorTabla) return;
        contenedorTabla.innerHTML = "";

        if (!registros || registros.length === 0) {
            contenedorTabla.innerHTML = `<tr><td colspan="8" style="text-align: center;">No se encontraron productos</td></tr>`;
            return;
        }

        registros.forEach(item => {
            const disponibilidad = item.disponibilidad == 0 ? 'Agotado' : 'Disponible';
            const esExtraBool = String(item.es_extra) === "1";
            const extraIcono = esExtraBool ? '✅' : '❌';
            const nombreCategoria = objetoCategoriasGlobal[String(item.id_categoria)] || "Ninguna";
            const urlDefault = (item.url_imagen && item.url_imagen.trim() !== "")
                ? item.url_imagen
                : "uploads/default/default-image.jpg";

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="codigo-interno">${item.codigo_interno}</td>
                <td class="product-name-cell" style="cursor: pointer;">
                    <div>
                        <img src="/sistemamastercrunch/${urlDefault}" alt="Producto" class="img-prod">
                    </div>
                </td>
                <td class="nombre-producto">${item.nombre}</td>
                <td class="product-price-cell">${item.precio}</td>
                <td>${nombreCategoria}</td>
                <td class="row-disponible ${disponibilidad}">${disponibilidad}</td>
                <td>${extraIcono}</td>
                <td>
                    <div class="table-actions">
                        <div class="btn btn-edit-prod btn-editar"
                             data-id="${item.id_producto}"
                             data-codint="${item.codigo_interno}"
                             data-img="${item.url_imagen || ''}"
                             data-nombre="${item.nombre}"
                             data-price="${item.precio}"
                             data-categoriaid="${item.id_categoria}"
                             data-extra="${esExtraBool ? '1' : '0'}">
                             Editar
                        </div>
                        <div class="btn btn-delete-prod btn-eliminar" data-id="${item.id_producto}">Eliminar</div>
                    </div>
                </td>
            `;
            contenedorTabla.appendChild(fila);
        });
    }

    // CARGAR API PRODUCTO
    async function cargarAPIProducto() {
        try {
            const [resCat, resProd] = await Promise.all([
                fetch(apirurlCat),
                fetch(apirurlProductos)
            ]);

            // parseo tolerante a 404
            let categoriaData = {};
            let ProductoData = {};
            try { categoriaData = await resCat.json(); } catch (_) { categoriaData = {}; }
            try { ProductoData = await resProd.json(); } catch (_) { ProductoData = {}; }

            const catsArray = Array.isArray(categoriaData)
                ? categoriaData
                : (categoriaData.registros || []);

            const prodsArray = Array.isArray(ProductoData)
                ? ProductoData
                : (ProductoData.registros || []);

            const ObjCat = {};
            catsArray.forEach(item => {
                const catId = item.id_categoria || item.id;
                if (catId) ObjCat[String(catId)] = item.nombre;
            });
            objetoCategoriasGlobal = ObjCat;

            const selectCategorias = document.querySelector('#content-categorias-list');
            const selectCategoriasEdit = document.querySelector('#content-categorias-list-edit');

            if (selectCategorias) selectCategorias.innerHTML = "";
            if (selectCategoriasEdit) selectCategoriasEdit.innerHTML = "";

            catsArray.forEach(cat => {
                if (cat.activo == 0) return;
                const catId = cat.id_categoria || cat.id;

                if (selectCategorias) {
                    const optionAdd = document.createElement("option");
                    optionAdd.value = catId;
                    optionAdd.textContent = cat.nombre;
                    selectCategorias.appendChild(optionAdd);
                }
                if (selectCategoriasEdit) {
                    const optionEdit = document.createElement("option");
                    optionEdit.value = catId;
                    optionEdit.textContent = cat.nombre;
                    selectCategoriasEdit.appendChild(optionEdit);
                }
            });

            listaProductosGlobal = prodsArray;
            renderizarTabla(listaProductosGlobal);

        } catch (error) {
            console.error('Error al cargar los datos:', error);
            listaProductosGlobal = [];
            renderizarTabla([]);
        }
    }
    cargarAPIProducto();

    // AGREGAR PRODUCTO
    const btnAgregarProducto = document.getElementById('btn-POST-producto');
    const btncancelProd = document.getElementById('btn-cancel-product');
    const modalP = document.getElementById('modal-producto');

    if (btnAgregarProducto) {
        btnAgregarProducto.addEventListener('click', () => {
            const inputCodigo = document.getElementById('text-codigoInterno');
            const inputNombre = document.getElementById('text-name');
            const inputPrecio = document.getElementById('number-price');
            const inputCategoria = document.getElementById('content-categorias-list');
            const radioExtra = document.querySelector('input[name="extraA"]:checked');
            const inputImagen = document.getElementById('url-image');
            const codigoInterno = inputCodigo.value.trim();
            const nombre = inputNombre.value.trim();
            const precio = inputPrecio.value.trim();
            const categoria = inputCategoria.value;
            const valorEsExtra = radioExtra ? radioExtra.value : null;
            const archivo = inputImagen.files ? inputImagen.files[0] : null;
            const disponibilidad = 1;

            if (!valorEsExtra || !codigoInterno || !nombre || !precio || !categoria || !archivo) {
                mostrarNotificacion('Rellene todos los datos y seleccione una imagen.', 'error');
                return;
            }

            const formData = new FormData();
            formData.append('codigo_interno', codigoInterno);
            formData.append('nombre', nombre);
            formData.append('precio', precio);
            formData.append('id_categoria', categoria);
            formData.append('imagen', archivo);
            formData.append('es_extra', valorEsExtra);
            formData.append('disponibilidad', disponibilidad);

            fetch(apirurlProductos, {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (modalP) modalP.close();
                cargarAPIProducto();
                mostrarNotificacion("¡Se han agregado los datos de forma exitosa!", "success");

                inputCodigo.value = "";
                inputNombre.value = "";
                inputPrecio.value = "";
                inputCategoria.value = "";
                inputImagen.value = "";

                const radioNo = document.querySelector('input[name="extraA"][value="0"]');
                if (radioNo) radioNo.checked = true;
            })
            .catch(error => {
                console.error(error);
                mostrarNotificacion("Ha ocurrido un error al intentar enviar los datos", "error");
            });
        });
    }

    if (btncancelProd && modalP) {
        btncancelProd.addEventListener('click', () => {
            document.getElementById('text-codigoInterno').value = "";
            document.getElementById('text-name').value = "";
            document.getElementById('number-price').value = "";
            document.getElementById('content-categorias-list').value = "";
            document.getElementById('url-image').value = "";

            const radioNo = document.querySelector('input[name="extraA"][value="0"]');
            if (radioNo) radioNo.checked = true;

            modalP.close();
        });
    }

    // ELIMINAR PRODUCTO
    const modalEliminarP = document.getElementById('warning-modal-borrar-P');
    const btnCancelEliminarProd = document.getElementById('cancelar-eliminar-P');
    const btnConfirmEliminarProd = document.getElementById('confirmar-eliminar-P');
    let idProductoEliminar = null;

    document.addEventListener('click', async (e) => {
        const btnVariableEliminar = e.target.closest('.btn-eliminar');
        if (!btnVariableEliminar) return;

        const idTemporal = btnVariableEliminar.dataset.id;

        try {
            const res = await fetch(apirurlCombos);

            // si combos API responde 404 para cuando no hayan combos
            let data = {};
            try { data = await res.json(); } catch (_) { data = {}; }
            const combos = Array.isArray(data) ? data : (data.registros || []);

            const tieneProductosAsociados = combos.some(com =>
                com.detalles && com.detalles.some(detalle =>
                    String(detalle.id_producto) === String(idTemporal)
                )
            );

            if (tieneProductosAsociados) {
                mostrarNotificacion("No se puede Eliminar el producto porque tiene combos asociados", "error");
                return;
            }

            idProductoEliminar = idTemporal;
            if (modalEliminarP && !modalEliminarP.open) modalEliminarP.showModal();
        } catch (error) {
            console.error(error);
            mostrarNotificacion("Error al intentar verificar el producto", "error");
        }
    });

    if (btnCancelEliminarProd && modalEliminarP) {
        btnCancelEliminarProd.addEventListener('click', () => {
            modalEliminarP.close();
        });
    }

    // NO cerrar el modal al cargar solo se registrara el listener
    if (modalEliminarP) {
        modalEliminarP.addEventListener('close', () => {
            idProductoEliminar = null;
        });
    }

    if (btnConfirmEliminarProd) {
        btnConfirmEliminarProd.addEventListener('click', () => {
            // 🔧 FIX CRÍTICO: guardar el ID en una variable local
            // antes de cerrar el modal (evita el race con el evento 'close')
            const idAEliminar = idProductoEliminar;
            if (!idAEliminar) return;

            if (modalEliminarP && modalEliminarP.open) modalEliminarP.close();

            fetch(apirurlProductos, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_producto: idAEliminar })
            })
            .then(res => res.json().then(data => ({ ok: res.ok, data })))
            .then(({ ok, data }) => {
                if (ok) {
                    mostrarNotificacion('¡Se ha eliminado el producto con éxito!', 'success');
                    cargarAPIProducto();
                } else {
                    mostrarNotificacion(data.message || "No se pudo eliminar el producto", "error");
                }
            })
            .catch(error => {
                console.error(error);
                mostrarNotificacion("Error al intentar eliminar el producto", "error");
            });
        });
    }

    // EDITAR PRODUCTO
    const modalEditProd = document.getElementById('modal-producto-edit');
    const btncerrarEditProd = document.getElementById('btn-close-product-edit');
    const btnCancelEditarProd = document.getElementById('btn-cancel-product-edit');
    const btnUpdateProd = document.getElementById('btn-PUT-producto-edit');

    let idProducto = null;

    document.addEventListener('click', (e) => {
        const btnEditarProd = e.target.closest('.btn-edit-prod');
        if (!btnEditarProd || !modalEditProd) return;

        idProducto = btnEditarProd.dataset.id;
        const codInt = btnEditarProd.dataset.codint;
        const nombre = btnEditarProd.dataset.nombre;
        const price = btnEditarProd.dataset.price;
        const categoriaID = btnEditarProd.dataset.categoriaid;
        const esExtra = btnEditarProd.dataset.extra;  // 🔧 FIX: ahora es "1" o "0"

        const inputImagen = document.getElementById('url-image-edit-prod');
        if (inputImagen) inputImagen.value = '';

        const selectCatEdit = document.getElementById('content-categorias-list-edit');
        if (selectCatEdit) selectCatEdit.value = categoriaID;

        const radioS = document.getElementById('checked-si-rad');
        const radion = document.getElementById('checked-no-rad');
        // comparar con el valor crudo
        if (esExtra === '1') {
            if (radioS) radioS.checked = true;
            if (radion) radion.checked = false;
        } else {
            if (radion) radion.checked = true;
            if (radioS) radioS.checked = false;
        }

        document.getElementById('text-codigoInterno-edit').value = codInt || '';
        document.getElementById('text-name-edit').value = nombre || '';
        document.getElementById('number-price-edit').value = price || '';

        modalEditProd.showModal();
    });

    if (btncerrarEditProd && modalEditProd) {
        btncerrarEditProd.addEventListener('click', () => modalEditProd.close());
    }
    if (btnCancelEditarProd && modalEditProd) {
        btnCancelEditarProd.addEventListener('click', () => modalEditProd.close());
    }

    if (btnUpdateProd) {
        btnUpdateProd.addEventListener('click', async () => {
            if (!idProducto) {
                mostrarNotificacion("No hay un producto seleccionado para editar", "error");
                return;
            }

            const codIntVal = document.getElementById('text-codigoInterno-edit').value;
            const nombreVal = document.getElementById('text-name-edit').value;
            const priceVal = document.getElementById('number-price-edit').value;
            const categoriaVal = document.getElementById('content-categorias-list-edit').value;

            if (!categoriaVal) {
                mostrarNotificacion("Debe seleccionar una categoría", "error");
                return;
            }

            const inputImagen = document.getElementById('url-image-edit-prod');
            const archivoImagen = inputImagen && inputImagen.files ? inputImagen.files[0] : null;

            const radioExtraSeleccionado = document.querySelector('input[name="extra"]:checked');
            const valorExtra = radioExtraSeleccionado ? radioExtraSeleccionado.value : "0";

            const formData = new FormData();
            formData.append('id_producto', idProducto);
            formData.append('codigo_interno', codIntVal);
            formData.append('nombre', nombreVal);
            formData.append('precio', priceVal);
            formData.append('id_categoria', categoriaVal);
            formData.append('es_extra', valorExtra);
            formData.append('_method', 'PUT');

            if (archivoImagen) {
                formData.append('imagen', archivoImagen);
            }

            const apiProdID = `${apirurlProductos}&id=${idProducto}`;

            try {
                const res = await fetch(apiProdID, {
                    method: 'POST',
                    body: formData
                });

                const textoRespuesta = await res.text();
                let data;
                try {
                    data = JSON.parse(textoRespuesta);
                } catch (err) {
                    console.error("El servidor no devolvió un JSON válido:", textoRespuesta);
                    throw new Error("Respuesta no válida del servidor");
                }

                if (!res.ok) throw new Error(data.message || "Error en la respuesta del servidor");

                mostrarNotificacion('¡Se ha actualizado el producto con éxito!', 'success');
                modalEditProd.close();
                cargarAPIProducto();
            } catch (error) {
                mostrarNotificacion("Error al intentar actualizar el producto", "error");
                console.error("Detalle técnico:", error);
            }
        });
    }

    // FILTRO DE BUSCADOR
    const searchInputProd = document.getElementById('searchInputProd');
    if (searchInputProd) {
        searchInputProd.addEventListener('input', (e) => {
            const texto = e.target.value.toLowerCase().trim();

            const filtrados = listaProductosGlobal.filter(prod => {
                const codigo = (prod.codigo_interno || "").toLowerCase();
                const nombre = (prod.nombre || "").toLowerCase();
                const nombreCategoria = (objetoCategoriasGlobal[String(prod.id_categoria)] || "").toLowerCase();

                return codigo.includes(texto) ||
                       nombre.includes(texto) ||
                       nombreCategoria.includes(texto);
            });

            renderizarTabla(filtrados);
        });
    }
}