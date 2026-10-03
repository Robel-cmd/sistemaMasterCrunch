function initCatalogoAPI() {

    // Rutas dinámicas
    const apiUrl  = `${window.API_BASE}/meta.php?entity=producto`;
    const apiUrlC = `${window.API_BASE}/meta.php?entity=combo`;

    //tarjetas de productos en el catálogo
    function renderizarCatalogo(registros) {
        const catalogoContainer = document.getElementById('catalogo-container');
        if (!catalogoContainer) return;

        catalogoContainer.innerHTML = '';

        // Estado vacío
        if (!registros || registros.length === 0) {
            catalogoContainer.innerHTML = `
                <div class="no-results" style="text-align:center; width:100%; padding:20px;">
                    No se encontraron productos
                </div>
            `;
            return;
        }

        let html = '';

        registros.forEach(item => {
            const urlRelativa = (item.url_imagen && item.url_imagen.trim() !== '')
                ? item.url_imagen
                : 'uploads/default/default-image.jpg';

            const urlImagen = `${window.BASE_URL}/${urlRelativa}`;

            const categoriaNombre = item.categoria_nombre || 'Sin categoría';

            html += `
                <article class="producto-card" data-nombre="${item.nombre}" data-id="${item.id}">
                    <img src="${urlImagen}" alt="${item.nombre}">
                    <div class="producto-info">
                        <h3>${item.nombre}</h3>
                        <p>${categoriaNombre}</p>
                        <div class="productos-footer">
                            <span class="precio-producto-catalogo">${item.precio} Lps</span>
                        </div>
                    </div>
                </article>
            `;
        });

        catalogoContainer.innerHTML = html;
    }

    // Cargar catálogo
    function fetchCategorias() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Carga tolerante: acepta array directo o {registros: [...]}
                const registros = Array.isArray(data) ? data : (data.registros || []);
                renderizarCatalogo(registros);
            })
            .catch(error => {
                console.error('Error al obtener el catálogo:', error);
                renderizarCatalogo([]);
            });
    }
    window.registerPoll(fetchCategorias, 5000);
    fetchCategorias();
}