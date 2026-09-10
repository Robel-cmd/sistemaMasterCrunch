function cargarModales() {
    function configurarModal(modalSelector,abrirBtnSelector,cerrartnSelector,cancelarBtnSelector) {
        const modal = document.querySelector(modalSelector);
        const btnAbrir = document.querySelector(abrirBtnSelector);
        const btnCerrar = document.querySelector(cerrartnSelector);
        const btnCancelar = document.querySelector(cancelarBtnSelector);
        if(!modal||!btnAbrir)return;

        const openModal = () => modal.showModal();
        const closeModal = ()=>modal.close();

        btnAbrir.addEventListener('click',openModal);
        if(btnCerrar) btnCerrar.addEventListener('click', closeModal);
        if(btnCancelar) btnCancelar.addEventListener('click', closeModal);
    }
    function cargarModales() {
        configurarModal('#modal-producto','#agregar-producto','#btn-close-product','#btn-cancel-product');
        configurarModal('#modal-categoria','#agregar-categoria','#btn-close-category','#btn-cancel-category');
        configurarModal('#modal-combos','#agregar-combos','#btn-close-combos','#btn-cancel-combos');
    }
    cargarModales();
}