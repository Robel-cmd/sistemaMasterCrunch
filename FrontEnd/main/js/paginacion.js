// Helper de paginación reutilizable
// container: elemento .paginacion donde se renderiza
// paginaActual: página visible (1-indexada)
// totalItems: cantidad total de elementos (ya filtrados)
// porPagina: elementos por página
// onChange(nuevaPagina): callback al cambiar de página
function renderPaginacion(container, paginaActual, totalItems, porPagina, onChange) {
    if (!container) return 1;

    const totalPaginas = Math.max(1, Math.ceil(totalItems / porPagina));
    let html = '';

    html += `<button data-page="${paginaActual - 1}" ${paginaActual <= 1 ? 'disabled' : ''}>&lt;</button>`;

    for (let i = 1; i <= totalPaginas; i++) {
        html += `<span data-page="${i}" class="${i === paginaActual ? 'active' : ''}" style="cursor:pointer;">${i}</span>`;
    }

    html += `<button data-page="${paginaActual + 1}" ${paginaActual >= totalPaginas ? 'disabled' : ''}>&gt;</button>`;

    container.innerHTML = html;

    container.querySelectorAll('[data-page]').forEach(el => {
        el.addEventListener('click', () => {
            const p = parseInt(el.dataset.page, 10);
            if (p >= 1 && p <= totalPaginas && p !== paginaActual) {
                onChange(p);
            }
        });
    });

    return totalPaginas;
}
