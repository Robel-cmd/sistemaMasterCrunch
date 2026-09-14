
function initCategorias() {

    // API CATEGORIA
    const apiURL = `/sistemaMasterCrunch/backEnd/api/meta.php?entity=categoria`;
    const apiURLProductos = `/sistemaMasterCrunch/backEnd/api/meta.php?entity=producto`;
    /*Listado de las categorias*/
    function CargarAPICategoria() {
        const urlConInactivas = `${apiURL}&incluirInactivas=true`;
        fetch(urlConInactivas)
        .then(res=>res.json())
        .then(data=>{
            const contenedor = document.querySelector('#contenedor-categorias');
            const contenedorSelectioCategorias = document.querySelector('#content-categorias-list');

            contenedor.innerHTML = "";
            contenedorSelectioCategorias.innerHTML="";

            data.forEach(item => {
                let esactivo = item.activo == 0 ? 'Innactivo' : 'Activo';
                let urlDefault = (item.imagen && item.imagen.trim() !== "") ? item.imagen : "uploads/default/default-image.jpg";
                if (item.activo==0) {
                    esactivo = "innactivo"
                }else{
                    esactivo = "activo"
                }
                

                let cambiarEstadoBtn = item.activo==1?'desactivar':'activar';
                const nuevacategoria =`
                    <div class="categoria">
                        <div class="image-wrapper">
                            <div class="image-category">
                                <img class="${esactivo}-image"" src="/sistemamastercrunch/uploads/default/innactive.png" alt="innactivo">
                                <img class="img-category" src="/sistemamastercrunch/${urlDefault}" alt="Categoría 1">
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="card-title">${item.nombre}</div>
                            <div class="card-value">${item.descripcion}</div>
                            <div class="card-title ${esactivo}">${esactivo}</div>
                        </div>
                        <div class="card-actions">
                            <button type="button" class="btn btn-edit btn-editar-cat" data-id="${item.id_categoria}" data-nombre="${item.nombre}" data-descripcion="${item.descripcion}">Editar</button>
                            <div class="btn btn-${cambiarEstadoBtn} btn-${cambiarEstadoBtn}-cat" data-id="${item.id_categoria}">${cambiarEstadoBtn}</div>
                        </div>
                    </div>
                `;
                contenedor.innerHTML += nuevacategoria;
                const listadoCategorias=`
                    <option value="${item.id_categoria}">${item.nombre}</option>
                `;
                contenedorSelectioCategorias.innerHTML += listadoCategorias;
            });
        })
        .catch(error=>{console.error('error',error)})
    }
    CargarAPICategoria() 







    // METODO POST PARA CATEGORIAS
    // POST
    const btnPOSTCategory = document.querySelector('#btn-POST-category');
    if (btnPOSTCategory) {
        btnPOSTCategory.addEventListener('click',()=>{

            const imagen=document.getElementById('url-imagen');
            const nombre=document.getElementById('nombre-categoria').value;
            const descripcion=document.getElementById('descripcion-categoria').value;
            const archivo = imagen.files[0];
            if (!archivo||!nombre.trim()||!descripcion.trim()) {
                console.log('Rellene todos los datos y seleccione una imagen.');
                return;
            }
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('imagen', archivo);

            fetch(apiURL,{
                method: 'POST',
                body: formData
            })
            .then(res=>res.json())
            .then(data=>{
            console.log('Respuesta: ', data);
            const modalCategoria = document.querySelector('#modal-categoria');
                if (modalCategoria) {
                    modalCategoria.close();
                }
                document.getElementById('nombre-categoria').value = '';
                document.getElementById('descripcion-categoria').value = '';
                document.getElementById('url-imagen').value = '';

                const successModal = document.querySelector('#success-modal');
                if (successModal) {
                    mostrarNotificacion("¡Se ha agregado el producto con exito!","success");
                }
                CargarAPICategoria();
            })
            .catch(error=>{ mostrarNotificacion("Ha ocurrido un error al intentar enviar los datos","error");});
        });
    }








    // DESACTIVAR / ACTIVAR CATEGORIA
    // PUT
        const warningModal = document.getElementById('warning-modal');
        const successModal = document.querySelector('#success-modal');
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
            }else if(btnActivar){
                idCategoriaActual = btnActivar.dataset.id;
                accionActual = 'activar';
                warningModal.showModal();
            }
        });

    cancelAccion.addEventListener('click', () => {
        warningModal.close();
        idCategoriaActual = null;
        accionActual = null;
    });

    confirmAccion.addEventListener('click', () => {
        warningModal.close();
        if (idCategoriaActual&&accionActual) {
            const nuevoEstado = accionActual==='activar'?1:0;

            const datosActualizacion = {
                id_categoria: idCategoriaActual,
                activo: nuevoEstado
            };

            const urlConId = `${apiURL}&id=${idCategoriaActual}`;

            fetch(urlConId,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosActualizacion)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data.message);
                CargarAPICategoria();
                mostrarNotificacion("¡Se ha modificado la categoria con exito!","success");
            })
            .catch(error=>{mostrarNotificacion("¡No se ha podido desactivar la categoria!","error");console.error('error',error)});
        }
        idCategoriaActual = null;
        accionActual=null;
    });








    // EDITAR CATEGORIA
    // PUT
    const modalEditar = document.getElementById('modal-categoria-editar');
    const btnCerrarEditar = document.getElementById('btn-close-category-editar');
    const btnCancelarEditar = document.getElementById('btn-cancel-category-editar');
    const btnUpdateCat = document.getElementById('btn-PUT-category');


    document.addEventListener('click',(e)=>{
        const btnEditar = e.target.closest('.btn-editar-cat');
        if (btnEditar&&modalEditar) {
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

    // PUT DATOS
    if (btnUpdateCat){
        btnUpdateCat.addEventListener('click', () => {

            const id = modalEditar.dataset.idCategoria;

            const nuevoNombre = document.getElementById('nombre-categoria-editar').value;
            const nuevaDescripcion = document.getElementById('descripcion-categoria-editar').value;
            const inputImagen = document.getElementById('url-imagen-editar');
            const archivoImagen = inputImagen?inputImagen.files[0]: null;

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
                console.log('Actualizado con éxito:', data);
                modalEditar.close();

                    mostrarNotificacion("¡Se ha modificado la categoria con exito!","success");
                    CargarAPICategoria();
            })
            .catch(error => { mostrarNotificacion("¡Ha ocurrido un error inesperado al intentar guardar los datos!","error");});
        });
    }
}
