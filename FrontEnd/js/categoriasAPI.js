function initCategorias() {

    // API CATEGORIA
    const apiURL = `/sistemaMasterCrunch/backEnd/api/meta.php?entity=categoria`;
    const apiURLProductos = `/sistemaMasterCrunch/backEnd/api/meta.php?entity=producto`;
    let listaCategoriasGlobal = [];

    function renderizarCategorias(registros) {
        const contenedor = document.querySelector('#contenedor-categorias');
        const contenedorSelectioCategorias = document.querySelector('#content-categorias-list');
        const contenedorSelectioCategoriasEditar = document.querySelector('#content-categorias-list-edit');
        
        if (contenedor) contenedor.innerHTML = "";
        if (contenedorSelectioCategorias) contenedorSelectioCategorias.innerHTML = "";
        if (contenedorSelectioCategoriasEditar) contenedorSelectioCategoriasEditar.innerHTML = "";

        if (registros.length === 0) {
            if (contenedor) {
                contenedor.innerHTML = `<div style="text-align: center; width: 100%; padding: 20px;">No se encontraron categorías</div>`;
            }
            return;
        }

        registros.forEach(item => {
            let esactivo = item.activo == 0 ? 'innactivo' : 'activo';
            let urlDefault = (item.imagen && item.imagen.trim() !== "") ? item.imagen : "uploads/default/default-image.jpg";
            let cambiarEstadoBtn = item.activo == 1 ? 'desactivar' : 'activar';
            let textoEstadoVisual = item.activo == 0 ? 'Innactivo' : 'Activo';

            const nuevacategoria = `
                <div class="categoria">
                    <div class="image-wrapper">
                        <div class="image-category" id="categoria-view">
                            <img class="${esactivo}-image" src="/sistemamastercrunch/uploads/default/innactive.png" alt="innactivo">
                            <img class="img-category" src="/sistemamastercrunch/${urlDefault}" alt="Categoría 1">
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="card-title">${item.nombre}</div>
                        <div class="card-value">${item.descripcion}</div>
                        <div class="card-title ${esactivo}">${textoEstadoVisual}</div>
                    </div>
                    <div class="card-actions">
                        <button type="button" class="btn btn-edit btn-editar-cat" data-id="${item.id_categoria}" data-nombre="${item.nombre}" data-descripcion="${item.descripcion}">Editar</button>
                        <div class="btn btn-${cambiarEstadoBtn} btn-${cambiarEstadoBtn}-cat" data-id="${item.id_categoria}">${cambiarEstadoBtn}</div>
                        <button type="button" class="btn btn-innactivo btn-eliminar-cat" data-id="${item.id_categoria}">Eliminar</button>
                    </div>
                </div>
            `;
            if (contenedor) contenedor.innerHTML += nuevacategoria;

            const listadoCategorias = `
                <option value="${item.id_categoria}">${item.nombre}</option>
            `;
            if (contenedorSelectioCategorias) contenedorSelectioCategorias.innerHTML += listadoCategorias;
            if (contenedorSelectioCategoriasEditar) contenedorSelectioCategoriasEditar.innerHTML += listadoCategorias;
        });
    }

    /*Listado de las categorias*/
    function CargarAPICategoria() {
        const urlConInactivas = `${apiURL}&incluirInactivas=true`;
        fetch(urlConInactivas)
        .then(res => res.json())
        .then(data => {
            listaCategoriasGlobal = data;
            renderizarCategorias(listaCategoriasGlobal);
        })
        .catch(error => { console.error('error', error) });
    }
    CargarAPICategoria();

    // Vista previa de imagen
    const modalViewImage = document.getElementById('modalViewImg');
    const btnCloseModal = document.getElementById('btn-cancel-viewImg');
    const btnXmodal = document.getElementById('btn-close-viewImage');
    const imgPreviewContent = document.querySelector('#img-preview-content');

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('img-category')) {
            imgPreviewContent.src = e.target.src;
            imgPreviewContent.alt = e.target.alt;
            modalViewImage.showModal();
        }
    });
    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            modalViewImage.close();
        });
    }
    if (btnXmodal) {
        btnXmodal.addEventListener('click', () => {
            modalViewImage.close();
        });
    }
    if (modalViewImage) {
        modalViewImage.addEventListener('click', (e) => {
            const dialogDimensions = modalViewImage.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                modalViewImage.close();
            }
        });
    }

    // METODO POST PARA CATEGORIAS
    const btnPOSTCategory = document.querySelector('#btn-POST-category');
    if (btnPOSTCategory) {
        btnPOSTCategory.addEventListener('click', () => {
            const imagen = document.getElementById('url-imagen');
            const nombre = document.getElementById('nombre-categoria').value;
            const descripcion = document.getElementById('descripcion-categoria').value;
            const archivo = imagen.files[0];
            if (!archivo || !nombre.trim() || !descripcion.trim()) {
                console.log('Rellene todos los datos y seleccione una imagen.');
                return;
            }
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('imagen', archivo);

            fetch(apiURL, {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                const modalCategoria = document.querySelector('#modal-categoria');
                if (modalCategoria) {
                    modalCategoria.close();
                }
                document.getElementById('nombre-categoria').value = '';
                document.getElementById('descripcion-categoria').value = '';
                document.getElementById('url-imagen').value = '';

                const successModal = document.querySelector('#success-modal');
                if (successModal) {
                    mostrarNotificacion("¡Se ha agregado la categoría con éxito!", "success");
                }
                CargarAPICategoria();
            })
            .catch(error => { mostrarNotificacion("Ha ocurrido un error al intentar enviar los datos", "error"); });
        });
    }

    // DESACTIVAR / ACTIVAR CATEGORIA
    const warningModal = document.getElementById('warning-modal-desactivar');
    const confirmAccion = document.querySelector('#confirmar-desactivar');
    const cancelAccion = document.querySelector('#cancelar-desactivar');
    let idCategoriaActual = null;
    let accionActual = null;

    document.addEventListener('click', async(e) => {
        const btnDesactivar = e.target.closest('.btn-desactivar-cat');
        const btnActivar = e.target.closest('.btn-activar-cat');

        if (btnDesactivar) {
            idCategoriaActual = btnDesactivar.dataset.id;
            accionActual = 'desactivar';
            try {
                const res = await fetch(apiURLProductos);
                const data = await res.json();
                const productos = data.registros || data;

                const tieneProductosAsociados = productos.some(prod => String(prod.id_categoria) === String(idCategoriaActual));
                if (tieneProductosAsociados) {
                    mostrarNotificacion("No se puede desactivar la categoría porque tiene productos asociados", "error");
                    idCategoriaActual = null;
                    accionActual = null;
                    return;
                }
                warningModal.showModal();
            } catch (error) {
                mostrarNotificacion("Error al verificar la categoría", "error");
            }
        } else if (btnActivar) {
            idCategoriaActual = btnActivar.dataset.id;
            accionActual = 'activar';
            warningModal.showModal();
        }
    });

    if (cancelAccion) {
        cancelAccion.addEventListener('click', () => {
            warningModal.close();
            idCategoriaActual = null;
            accionActual = null;
        });
    }

    if (confirmAccion) {
        confirmAccion.addEventListener('click', () => {
            warningModal.close();
            if (idCategoriaActual && accionActual) {
                const nuevoEstado = accionActual === 'activar' ? 1 : 0;

                const datosActualizacion = {
                    id_categoria: idCategoriaActual,
                    activo: nuevoEstado
                };

                const urlConId = `${apiURL}&id=${idCategoriaActual}`;

                fetch(urlConId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datosActualizacion)
                })
                .then(res => res.json())
                .then(data => {
                    CargarAPICategoria();
                    mostrarNotificacion("¡Se ha modificado la categoría con éxito!", "success");
                })
                .catch(error => { mostrarNotificacion("¡No se ha podido modificar la categoría!", "error"); console.error('error', error) });
            }
            idCategoriaActual = null;
            accionActual = null;
        });
    }

    // EDITAR CATEGORIA
    const modalEditar = document.getElementById('modal-categoria-editar');
    const btnCerrarEditar = document.getElementById('btn-close-category-editar');
    const btnCancelarEditar = document.getElementById('btn-cancel-category-editar');
    const btnUpdateCat = document.getElementById('btn-PUT-category');

    document.addEventListener('click', (e) => {
        const btnEditar = e.target.closest('.btn-editar-cat');
        if (btnEditar && modalEditar) {
            const id = btnEditar.dataset.id;
            const nombre = btnEditar.dataset.nombre;
            const descripcion = btnEditar.dataset.descripcion;

            document.getElementById('nombre-categoria-editar').value = nombre;
            document.getElementById('descripcion-categoria-editar').value = descripcion;

            const inputImagen = document.getElementById('url-imagen-editar');
            if (inputImagen) inputImagen.value = '';

            modalEditar.dataset.idCategoria = id;
            modalEditar.showModal();
        }
    });

    if (btnCerrarEditar) btnCerrarEditar.addEventListener('click', () => modalEditar.close());
    if (btnCancelarEditar) btnCancelarEditar.addEventListener('click', () => modalEditar.close());

    if (btnUpdateCat) {
        btnUpdateCat.addEventListener('click', () => {
            const id = modalEditar.dataset.idCategoria;
            const nuevoNombre = document.getElementById('nombre-categoria-editar').value;
            const nuevaDescripcion = document.getElementById('descripcion-categoria-editar').value;
            const inputImagen = document.getElementById('url-imagen-editar');
            const archivoImagen = inputImagen ? inputImagen.files[0] : null;

            if (!id || !nuevoNombre.trim() || !nuevaDescripcion.trim()) {
                console.log('Rellene todos los campos para actualizar.');
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

            fetch(urlConId, {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                modalEditar.close();
                mostrarNotificacion("¡Se ha modificado la categoría con éxito!", "success");
                CargarAPICategoria();
            })
            .catch(error => { mostrarNotificacion("¡Ha ocurrido un error inesperado al intentar guardar los datos!", "error"); });
        });
    }

    // ELIMINAR CATEGORIA
    const warningModalEliminar = document.getElementById('warning-modal-borrar');
    const btnConfirmEliminarCat = document.querySelector('#confirmar-eliminar');
    const btnCancelarEliminarCat = document.querySelector('#cancelar-eliminar');
    let idCategoriaEliminar = null;

    document.addEventListener('click', async(e) => {
        const btnEliminarCategoria = e.target.closest('.btn-eliminar-cat');

        if (btnEliminarCategoria) {
            idCategoriaEliminar = btnEliminarCategoria.dataset.id;

            try {
                const res = await fetch(apiURLProductos);
                const data = await res.json();
                const productos = data.registros || data;

                const tieneProductosAsociados = productos.some(prod => String(prod.id_categoria) === String(idCategoriaEliminar));
                if (tieneProductosAsociados) {
                    mostrarNotificacion("No se puede eliminar la categoría porque tiene productos asociados", "error");
                    idCategoriaEliminar = null;
                    return;
                }
                warningModalEliminar.showModal();
            } catch (error) {
                mostrarNotificacion("Error al verificar la categoría", "error");
            }
        }
    });

    if (btnCancelarEliminarCat) {
        btnCancelarEliminarCat.addEventListener('click', () => {
            warningModalEliminar.close();
            idCategoriaEliminar = null;
        });
    }

    if (btnConfirmEliminarCat) {
        btnConfirmEliminarCat.addEventListener('click', () => {
            warningModalEliminar.close();
            if (idCategoriaEliminar) {
                const urlConId = `${apiURL}&id=${idCategoriaEliminar}`;

                fetch(urlConId, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    CargarAPICategoria();
                    mostrarNotificacion('¡Se ha eliminado la categoría con éxito!', 'success');
                })
                .catch(error => { mostrarNotificacion("No se pudo eliminar la categoría", "error"); })
            }
            idCategoriaEliminar = null;
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