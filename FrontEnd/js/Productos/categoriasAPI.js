function initCategorias() {
    const apiURL = `/sistemaMasterCrunch/backEnd/api/meta.php?entity=categoria`;
    const apiURLProductos = `/sistemaMasterCrunch/backEnd/api/meta.php?entity=producto`;
    let listaCategoriasGlobal = [];


    // renderizado DE tarjetas
    function renderizarCategorias(registros) {
        const contenedor = document.querySelector('#contenedor-categorias');
        if (!contenedor) return;
        contenedor.innerHTML = "";

        if (!registros || registros.length === 0) {
            contenedor.innerHTML = `<div style="text-align: center; width: 100%; padding: 20px;" class="noseencontro">No se encontraron categorías</div>`;
            return;
        }

        let html = "";
        registros.forEach(item => {
            const esactivo = item.activo == 0 ? 'innactivo' : 'activo';
            const urlDefault = (item.imagen && item.imagen.trim() !== "")
                ? item.imagen
                : "uploads/default/default-image.jpg";
            const cambiarEstadoBtn = item.activo == 1 ? 'desactivar' : 'activar';
            const textoEstadoVisual = item.activo == 0 ? 'Innactivo' : 'Activo';

            html += `
                <div class="categoria">
                    <div class="image-wrapper">
                        <div class="image-category" id="categoria-view">
                            <img class="${esactivo}-image" src="/sistemamastercrunch/uploads/default/innactive.png" alt="innactivo">
                            <img class="img-category" src="/sistemamastercrunch/${urlDefault}" alt="Categoría">
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="card-title">${item.nombre}</div>
                        <div class="card-value">${item.descripcion}</div>
                        <div class="card-title ${esactivo}">${textoEstadoVisual}</div>
                    </div>
                    <div class="card-actions">
                        <button type="button" class="btn btn-edit btn-editar-cat" data-id="${item.id_categoria}">Editar</button>
                        <div class="btn btn-${cambiarEstadoBtn} btn-${cambiarEstadoBtn}-cat" data-id="${item.id_categoria}">${cambiarEstadoBtn}</div>
                        <button type="button" class="btn btn-innactivo btn-eliminar-cat" data-id="${item.id_categoria}">Eliminar</button>
                    </div>
                </div>
            `;
        });
        contenedor.innerHTML = html;
    }

    // renderizado separado DE SELECTS
    // LLAMADO EN CARGA EXCEOPTO EN EL FILTRO
    function renderizarSelectsCategorias(registros) {
        const selectAdd = document.querySelector('#content-categorias-list');
        const selectEdit = document.querySelector('#content-categorias-list-edit');

        if (selectAdd) selectAdd.innerHTML = "";
        if (selectEdit) selectEdit.innerHTML = "";

        registros.forEach(item => {
            if (item.activo == 0) return;
            const opt = `<option value="${item.id_categoria}">${item.nombre}</option>`;
            if (selectAdd) selectAdd.innerHTML += opt;
            if (selectEdit) selectEdit.innerHTML += opt;
        });
    }


    //carga tolerante a 404 y estructuras variadas
    async function CargarAPICategoria() {
        const urlConInactivas = `${apiURL}&incluirInactivas=true`;
        try {
            const res = await fetch(urlConInactivas);
            let data = {};
            try { data = await res.json(); } catch (_) { data = {}; }

            const categorias = Array.isArray(data) ? data : (data.registros || []);
            listaCategoriasGlobal = categorias;

            renderizarCategorias(listaCategoriasGlobal);
            renderizarSelectsCategorias(listaCategoriasGlobal);
        } catch (error) {
            console.error('error', error);
            listaCategoriasGlobal = [];
            renderizarCategorias([]);
        }
    }
    CargarAPICategoria();

    // VISTA PREVIA DE IMAGEN
    const modalViewImage = document.getElementById('modalViewImg');
    const btnCloseModal = document.getElementById('btn-cancel-viewImg');
    const btnXmodal = document.getElementById('btn-close-viewImage');
    //selector específico
    const imgPreviewContent = document.querySelector('#modalViewImg #img-preview-content');

    document.addEventListener('click', (e) => {
        const img = e.target.closest('.img-category');
        if (img && modalViewImage && imgPreviewContent) {
            imgPreviewContent.src = img.src;
            imgPreviewContent.alt = img.alt;
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
            if (e.clientX < d.left || e.clientX > d.right ||
                e.clientY < d.top  || e.clientY > d.bottom) {
                modalViewImage.close();
            }
        });
    }

    // POST CATEGORÍA
    const btnPOSTCategory = document.querySelector('#btn-POST-category');
    if (btnPOSTCategory) {
        btnPOSTCategory.addEventListener('click', () => {
            const imagen = document.getElementById('url-imagen');
            const nombre = document.getElementById('nombre-categoria').value;
            const descripcion = document.getElementById('descripcion-categoria').value;
            const archivo = imagen.files ? imagen.files[0] : null;

            //mostrarNotificacion
            if (!archivo || !nombre.trim() || !descripcion.trim()) {
                mostrarNotificacion('Rellene todos los datos y seleccione una imagen.', 'error');
                return;
            }

            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('imagen', archivo);

            fetch(apiURL, { method: 'POST', body: formData })
                .then(res => res.json().then(d => ({ ok: res.ok, data: d })))
                .then(({ ok, data }) => {
                    if (!ok) {
                        mostrarNotificacion(data.message || "No se pudo crear la categoría", "error");
                        return;
                    }
                    const modalCategoria = document.querySelector('#modal-categoria');
                    if (modalCategoria && modalCategoria.open) modalCategoria.close();

                    document.getElementById('nombre-categoria').value = '';
                    document.getElementById('descripcion-categoria').value = '';
                    document.getElementById('url-imagen').value = '';

                    mostrarNotificacion("¡Se ha agregado la categoría con éxito!", "success");
                    CargarAPICategoria();
                })
                .catch(error => {
                    console.error(error);
                    mostrarNotificacion("Ha ocurrido un error al intentar enviar los datos", "error");
                });
        });
    }

    // DESACTIVAR / ACTIVAR CATEGORÍA
    const warningModal = document.getElementById('warning-modal-desactivar');
    const confirmAccion = document.querySelector('#confirmar-desactivar');
    const cancelAccion = document.querySelector('#cancelar-desactivar');
    let idCategoriaActual = null;
    let accionActual = null;

    document.addEventListener('click', async (e) => {
        const btnDesactivar = e.target.closest('.btn-desactivar-cat');
        const btnActivar = e.target.closest('.btn-activar-cat');

        if (btnDesactivar) {
            const idTemp = btnDesactivar.dataset.id;
            try {
                const res = await fetch(apiURLProductos);
                let data = {};
                try { data = await res.json(); } catch (_) { data = {}; }
                const productos = Array.isArray(data) ? data : (data.registros || []);

                const tieneProductosAsociados = productos.some(prod =>
                    String(prod.id_categoria) === String(idTemp)
                );

                if (tieneProductosAsociados) {
                    mostrarNotificacion("No se puede desactivar la categoría porque tiene productos asociados", "error");
                    return;
                }
                idCategoriaActual = idTemp;
                accionActual = 'desactivar';
                if (warningModal && !warningModal.open) warningModal.showModal();
            } catch (error) {
                console.error(error);
                mostrarNotificacion("Error al verificar la categoría", "error");
            }
        } else if (btnActivar) {
            idCategoriaActual = btnActivar.dataset.id;
            accionActual = 'activar';
            if (warningModal && !warningModal.open) warningModal.showModal();
        }
    });

    if (cancelAccion && warningModal) {
        cancelAccion.addEventListener('click', () => {
            if (warningModal.open) warningModal.close();
            idCategoriaActual = null;
            accionActual = null;
        });
    }

    // guardar estado
    if (confirmAccion) {
        confirmAccion.addEventListener('click', () => {
            const idAccion = idCategoriaActual;
            const accion = accionActual;

            if (warningModal && warningModal.open) warningModal.close();

            if (idAccion && accion) {
                const nuevoEstado = accion === 'activar' ? 1 : 0;
                const urlConId = `${apiURL}&id=${idAccion}`;

                fetch(urlConId, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_categoria: idAccion, activo: nuevoEstado })
                })
                // verificar RESPUESTA
                .then(res => res.json().then(d => ({ ok: res.ok, data: d })))
                .then(({ ok, data }) => {
                    if (ok) {
                        CargarAPICategoria();
                        mostrarNotificacion("¡Se ha modificado la categoría con éxito!", "success");
                    } else {
                        mostrarNotificacion(data.message || "No se pudo modificar la categoría", "error");
                    }
                })
                .catch(error => {
                    console.error(error);
                    mostrarNotificacion("¡No se ha podido modificar la categoría!", "error");
                });
            }

            idCategoriaActual = null;
            accionActual = null;
        });
    }

    // EDITAR CATEGORÍA
    const modalEditar = document.getElementById('modal-categoria-editar');
    const btnCerrarEditar = document.getElementById('btn-close-category-editar');
    const btnCancelarEditar = document.getElementById('btn-cancel-category-editar');
    const btnUpdateCat = document.getElementById('btn-PUT-category');

    document.addEventListener('click', (e) => {
        const btnEditar = e.target.closest('.btn-editar-cat');
        if (!btnEditar || !modalEditar) return;

        const id = btnEditar.dataset.id;

        // leer datos del global
        const cat = listaCategoriasGlobal.find(c => String(c.id_categoria) === String(id));
        if (!cat) {
            mostrarNotificacion("No se encontró la categoría", "error");
            return;
        }

        document.getElementById('nombre-categoria-editar').value = cat.nombre || '';
        document.getElementById('descripcion-categoria-editar').value = cat.descripcion || '';

        const inputImagen = document.getElementById('url-imagen-editar');
        if (inputImagen) inputImagen.value = '';

        modalEditar.dataset.idCategoria = id;
        if (!modalEditar.open) modalEditar.showModal();
    });

    if (btnCerrarEditar && modalEditar) {
        btnCerrarEditar.addEventListener('click', () => {
            if (modalEditar.open) modalEditar.close();
            modalEditar.dataset.idCategoria = '';
        });
    }
    if (btnCancelarEditar && modalEditar) {
        btnCancelarEditar.addEventListener('click', () => {
            if (modalEditar.open) modalEditar.close();
            modalEditar.dataset.idCategoria = '';
        });
    }
    //limpiar el id guardado al cerrar
    if (modalEditar) {
        modalEditar.addEventListener('close', () => {
            modalEditar.dataset.idCategoria = '';
        });
    }

    if (btnUpdateCat) {
        btnUpdateCat.addEventListener('click', () => {
            const id = modalEditar.dataset.idCategoria;
            const nuevoNombre = document.getElementById('nombre-categoria-editar').value;
            const nuevaDescripcion = document.getElementById('descripcion-categoria-editar').value;
            const inputImagen = document.getElementById('url-imagen-editar');
            const archivoImagen = inputImagen && inputImagen.files ? inputImagen.files[0] : null;

            //usar mostrarNotificacion
            if (!id || !nuevoNombre.trim() || !nuevaDescripcion.trim()) {
                mostrarNotificacion('Rellene todos los campos para actualizar.', 'error');
                return;
            }

            const formData = new FormData();
            formData.append('id_categoria', id);
            formData.append('nombre', nuevoNombre);
            formData.append('descripcion', nuevaDescripcion);
            formData.append('_method', 'PUT');

            if (archivoImagen) {
                formData.append('imagen', archivoImagen);
            }

            const urlConId = `${apiURL}&id=${id}`;

            fetch(urlConId, { method: 'POST', body: formData })
                .then(res => res.json().then(d => ({ ok: res.ok, data: d })))
                .then(({ ok, data }) => {
                    if (!ok) {
                        mostrarNotificacion(data.message || "No se pudo actualizar la categoría", "error");
                        return;
                    }
                    if (modalEditar.open) modalEditar.close();
                    mostrarNotificacion("¡Se ha modificado la categoría con éxito!", "success");
                    CargarAPICategoria();
                })
                .catch(error => {
                    console.error(error);
                    mostrarNotificacion("¡Ha ocurrido un error inesperado al intentar guardar los datos!", "error");
                });
        });
    }

    // ELIMINAR CATEGORÍA
    const warningModalEliminar = document.getElementById('warning-modal-borrar');
    const btnConfirmEliminarCat = document.querySelector('#confirmar-eliminar');
    const btnCancelarEliminarCat = document.querySelector('#cancelar-eliminar');
    let idCategoriaEliminar = null;

    document.addEventListener('click', async (e) => {
        const btnEliminarCategoria = e.target.closest('.btn-eliminar-cat');
        if (!btnEliminarCategoria) return;

        const idTemp = btnEliminarCategoria.dataset.id;

        try {
            const res = await fetch(apiURLProductos);
            let data = {};
            try { data = await res.json(); } catch (_) { data = {}; }
            const productos = Array.isArray(data) ? data : (data.registros || []);

            const tieneProductosAsociados = productos.some(prod =>
                String(prod.id_categoria) === String(idTemp)
            );

            if (tieneProductosAsociados) {
                mostrarNotificacion("No se puede eliminar la categoría porque tiene productos asociados", "error");
                return;
            }

            idCategoriaEliminar = idTemp;
            if (warningModalEliminar && !warningModalEliminar.open) warningModalEliminar.showModal();
        } catch (error) {
            console.error(error);
            mostrarNotificacion("Error al verificar la categoría", "error");
        }
    });

    if (btnCancelarEliminarCat && warningModalEliminar) {
        btnCancelarEliminarCat.addEventListener('click', () => {
            if (warningModalEliminar.open) warningModalEliminar.close();
            idCategoriaEliminar = null;
        });
    }

    if (warningModalEliminar) {
        warningModalEliminar.addEventListener('close', () => {
            idCategoriaEliminar = null;
        });
    }

    // guardar locaL
    if (btnConfirmEliminarCat) {
        btnConfirmEliminarCat.addEventListener('click', () => {
            const idEliminar = idCategoriaEliminar;

            if (warningModalEliminar && warningModalEliminar.open) warningModalEliminar.close();
            if (!idEliminar) return;

            const urlConId = `${apiURL}&id=${idEliminar}`;

            fetch(urlConId, { method: 'DELETE' })
                // 🔧 FIX 4: verificar res.ok
                .then(res => res.json().then(d => ({ ok: res.ok, data: d })))
                .then(({ ok, data }) => {
                    if (ok) {
                        CargarAPICategoria();
                        mostrarNotificacion('¡Se ha eliminado la categoría con éxito!', 'success');
                    } else {
                        mostrarNotificacion(data.message || "No se pudo eliminar la categoría", "error");
                    }
                })
                .catch(error => {
                    console.error(error);
                    mostrarNotificacion("No se pudo eliminar la categoría", "error");
                });
        });
    }

    // FILTRO DE CATEGORÍAS
    const searchInputCat = document.getElementById('searchInputCat');
    if (searchInputCat) {
        searchInputCat.addEventListener('input', (e) => {
            const texto = e.target.value.toLowerCase().trim();
            const filtradas = listaCategoriasGlobal.filter(cat => {
                const nombre = (cat.nombre || "").toLowerCase();
                return nombre.includes(texto);
            });
            renderizarCategorias(filtradas);
        });
    }
}