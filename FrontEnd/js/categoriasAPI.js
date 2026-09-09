function initCategorias() {
    /*Listado de la categoria de los productos*/
    const categorias = {
        nombre: `nombre`,
        descripcion: `descripcion`,
        activo: `1`
    }
    function AgregarCategoria() {
        const contenedor = document.querySelector('#contenedor-categorias');
        if (!contenedor){console.error("¡No se encontro el contenedor"); return;}
        
        const nuevacategoria =`
        <div class="categoria">
            <div class="image-wrapper">
                <div class="image-category">
                    <img src="../assets/D529F506-94B2-4DC5-9B45-DCE2DC2709DE.jpeg" alt="Categoría 1">
                </div>
            </div>
            <div class="card-content">
                <div class="card-title">${categorias.nombre}</div>
                <div class="card-value">${categorias.descripcion}</div>
            </div>
            <div class="card-actions">
                <div class="btn btn-edit" id="button-editar">Editar</div>
                <div class="btn btn-disable" id="button-desactivar">Desactivar</div>
            </div>
        </div>
        `;
        /*Aqui verificara los datos */
        contenedor.innerHTML += nuevacategoria;
    }
    //agregar
    const agregar = document.getElementById('agregar-categoria');
    if (agregar) {
        agregar.addEventListener('click', () => {
            AgregarCategoria();
        });
    } else {
        console.warn("No se encontro el elemento.");
    }

    //botones de cada uno de las tarjetas de catalogos
    const contenedorCategorias = document.querySelector('#contenedor-categorias');
    if (contenedorCategorias) {
        contenedorCategorias.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-edit')) {
                console.log('editar');
            }
            if (e.target.classList.contains('btn-disable')) {
                console.log('desactivar');
            }
        });
    }

    /*Listado de las categorias*/
    function CargarAPICategoria() {
        const apiURL = `http://localhost/sistemaMasterCrunch/backEnd/api/meta.php?entity=categoria`;
        fetch(apiURL)
        .then(res=>res.json())
        .then(data=>{
            const contenedor = document.querySelector('#contenedor-categorias');
            let esactivo = "";
            contenedor.innerHTML = "";
            data.forEach(item => {
                if (item.activo==0) {
                    esactivo = "Innactivo"
                }else{
                    esactivo = "Activo"
                }
                const nuevacategoria =`
                    <div class="categoria">
                        <div class="image-wrapper">
                            <div class="image-category">
                                <img src="/sistemamastercrunch/${item.imagen}" alt="Categoría 1">
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="card-title">${item.nombre}</div>
                            <div class="card-value">${item.descripcion}</div>
                            <div class="card-title ${esactivo}">${esactivo}</div>
                        </div>
                        <div class="card-actions">
                            <div class="btn btn-edit" id="button-editar">Editar</div>
                            <div class="btn btn-disable" id="button-desactivar">Desactivar</div>
                        </div>
                    </div>
                `;
                contenedorCategorias.innerHTML += nuevacategoria
            });
        })
        .catch(error=>{console.error('error',error)})
    }
    CargarAPICategoria() 
}