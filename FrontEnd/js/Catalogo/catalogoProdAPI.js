function initCatalogoAPI() {
    const apiUrl = `/sistemaMasterCrunch/backEnd/api/meta.php?entity=producto`;



    // CARGAR catalogo
    function fetchCategorias() {
        let html = "";
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                
                const catalogoContainer = document.getElementById('catalogo-container');
                catalogoContainer.innerHTML = '';
                data.registros.forEach(item => {
                    const urlDefault = (item.url_imagen && item.url_imagen.trim() !== "")
                    ? item.url_imagen
                    : "uploads/default/default-image.jpg";

                    html = `
                        <article class="producto-card" data-nombre="${item.nombre}" data-id="${item.id}">
                            <img src="/sistemamastercrunch/${urlDefault}" alt="Pollo frito">
                            <div class="producto-info">
                                <h3>${item.nombre}</h3>
                                <p>${item.categoria_nombre}</p>
                                <div class="productos-footer">
                                    <span class="precio-producto-catalogo">${item.precio} Lps</span>
                                </div>
                            </div>
                        </article>
                    `;
                    catalogoContainer.innerHTML += html;
                });
            })
            .catch(error => {
                console.error('Error al obtener el catálogo:', error);
            });
    }

    fetchCategorias();
}