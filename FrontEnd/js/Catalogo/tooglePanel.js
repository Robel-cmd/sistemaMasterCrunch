function initTooglePanel() {
    const btn        = document.getElementById('pedidos-toggle-btn');
    const panel      = document.getElementById('pedidos-panel');
    const btnCerrar  = document.getElementById('btn-cerrar-panel');
    const contenedor = document.getElementById('pedidos-flotante');

    //si no existen los elementos, salimos (por si se llama desde otra vista)
    if (!btn || !panel || !btnCerrar || !contenedor) return;

    // Abrir / cerrar
    btn.addEventListener('click', () => {
        contenedor.classList.toggle('abierto');
    });

    // Cerrar con la X
    btnCerrar.addEventListener('click', () => {
        contenedor.classList.remove('abierto');
    });

    // Cambio de pestañas
    document.querySelectorAll('.tab-pedido').forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            document.querySelectorAll('.tab-pedido').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.pedidos-tab-content').forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.querySelector(`.pedidos-tab-content[data-content="${target}"]`).classList.add('active');
        });
    });
}