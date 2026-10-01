function initCategoriasCatalogo() {
    const apiUrl = `/sistemaMasterCrunch/backEnd/api/meta.php?entity=categoria`;



    // CARGAR CATEGORIAS
    function fetchCategorias() {
        let html = "";
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                
                const categoriasContainer = document.getElementById('categorias-container');
                categoriasContainer.innerHTML = '';
                data.forEach(item => {
                    const urlDefault = (item.imagen && item.imagen.trim() !== "")
                    ? item.imagen
                    : "uploads/default/default-image.jpg";

                    html = `
                        <article class="categoria-card-catalogo" data-nombre="${item.nombre}" data-id="${item.id}">
                            <img src="/sistemamastercrunch/${urlDefault}" alt="Imagen de ${item.nombre}">
                            <h3>${item.nombre}</h3>
                            <p>${item.descripcion}</p>
                        </article>
                    `;
                    categoriasContainer.innerHTML += html;
                });
            })
            .catch(error => {
                console.error('Error al obtener las categorías:', error);
            });
    }

    fetchCategorias();
}