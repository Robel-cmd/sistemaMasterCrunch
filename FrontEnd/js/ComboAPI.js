function initCombo() {

    function cargarAPICombo() {
        try {
            const apiMeta = 'http://localhost/sistemaMasterCrunch/backEnd/api/meta.php?entity=combo';
            fetch(apiMeta)
            .then(res=>res.json())
            .then(data=>{
                const contenedor = document.querySelector('#contenedor-combos');
                contenedor.innerHTML = "";
                
                data.registros.forEach(item => {
                    let esactivo = item.es_extra==0 ? 'Innactivo' : 'Activo';
                    let detallesContent = "";

                    item.detalles.forEach(itemDetalle => {
                        detallesContent +=`
                            <div class="card-list detalle">
                                <label><strong><strong class="cant-detalle-combo">x${itemDetalle.cantidad}</strong>&nbsp&nbsp&nbsp&nbsp ${itemDetalle.producto_nombre}</strong><strong class="detalle-precio">&nbsp&nbspLps.${itemDetalle.precio_individual}</strong></label>
                            </div>
                        `;
                    });

                    const fila =`
                    <div class="categoria">
                        <div class="image-wrapper">
                            <div class="image-category">
                                <img src="/sistemamastercrunch/${item.url_imagen_combo}" alt="Categoría 1">
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="card-title ${esactivo}">${esactivo}</div>
                            <div class="card-title"><strong>${item.nombre}</strong></div>
                            <div class="card-value precio-combo">Lps.${item.precio_total}</div>
                            <div class="card-title detalles">${detallesContent}</div>
                        </div>

                        <div class="card-actions">
                            <div class="btn btn-edit" id="button-editar">Editar</div>
                            <div class="btn btn-disable" id="button-desactivar">Desactivar</div>
                        </div>
                    </div>`;
                contenedor.innerHTML+= fila;
                });
            })
            .catch(error=>{
                console.error('error',error);
            });

        }catch (error) {
            console.error('Error al cargar los datos:', error);
        }
        
    }
    cargarAPICombo();
}
