function initCategoriasCatalogo() {

    // Ruta dinámica
    const apiUrl = `${window.API_BASE}/meta.php?entity=categoria`;

    //tarjetas de categorías
    function renderizarCategorias(registros) {
        const categoriasContainer = document.getElementById('categorias-container');
        if (!categoriasContainer) return;

        categoriasContainer.innerHTML = '';

        // Estado vacío
        if (!registros || registros.length === 0) {
            categoriasContainer.innerHTML = `
                <div class="no-results" style="text-align:center; width:100%; padding:20px;">
                    No se encontraron categorías
                </div>
            `;
            return;
        }

        let html = '';

        registros.forEach(item => {
            const urlRelativa = (item.imagen && item.imagen.trim() !== '')
                ? item.imagen
                : 'uploads/default/default-image.jpg';

            const urlImagen = `${window.BASE_URL}/${urlRelativa}`;

            const descripcion = item.descripcion || '';

            html += `
                <article class="categoria-card-catalogo" data-nombre="${item.nombre}" data-id="${item.id}">
                    <img src="${urlImagen}" alt="Imagen de ${item.nombre}">
                    <h3>${item.nombre}</h3>
                    <p>${descripcion}</p>
                </article>
            `;
        });

        categoriasContainer.innerHTML = html;
    }

    // Cargar categorías
    function fetchCategorias() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const registros = Array.isArray(data) ? data : (data.registros || []);
                renderizarCategorias(registros);
            })
            .catch(error => {
                console.error('Error al obtener las categorías:', error);
                renderizarCategorias([]);
            });
    }

    fetchCategorias();
    window.registerPoll(fetchCategorias, 5000);
}