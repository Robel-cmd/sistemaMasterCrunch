function initCombo() {
    let todosLosCombos = [];

    const contenedor = document.querySelector('#contenedor-combos');
    const inputSearch = document.querySelector('#searchInputCombo');

    function renderizarCombos(registros) {
        if (!contenedor) return;
        contenedor.innerHTML = "";
        
        if (!registros || registros.length === 0) {
            contenedor.innerHTML = `<p class="no-results" style="padding: 20px; text-align: center; width: 100%;">No se encontraron combos.</p>`;
            return;
        }

        let htmlAcumulado = "";

        registros.forEach(item => {
            const esActivo = item.es_extra == 0 ? 'Inactivo' : 'Activo';
            const claseActivo = item.es_extra == 0 ? 'inactivo' : 'activo';
            
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
                        <div class="image-category">
                            <img src="/sistemamastercrunch/${urlDefault}" alt="Imagen del combo">
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="card-title ${claseActivo}">${esActivo}</div>
                        <div class="card-title"><strong>${item.nombre}</strong></div>
                        <div class="card-value precio-combo">Lps.${item.precio_total}</div>
                        <div class="card-title detalles">${detallesContent}</div>
                    </div>
                    <div class="card-actions">
                        <div class="btn btn-edit button-editar" data-id="${item.id}">Editar</div>
                        <div class="btn btn-disable button-desactivar" data-id="${item.id}">Desactivar</div>
                    </div>
                </div>
            `;
        });

        contenedor.innerHTML = htmlAcumulado;
    }

    async function cargarAPICombo() {
        const apiMeta = '/sistemaMasterCrunch/backEnd/api/meta.php?entity=combo';
        
        try {
            const response = await fetch(apiMeta);
            if (!response.ok) throw new Error('Error en la respuesta de la API');
            
            const data = await response.json();
            todosLosCombos = data.registros || data || []; 
            
            renderizarCombos(todosLosCombos);

        } catch (error) {
            console.error('Error al cargar los datos:', error);
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
                option.value = prod.id; 
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
}