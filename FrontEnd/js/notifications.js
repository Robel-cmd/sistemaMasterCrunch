function mostrarNotificacion(mensaje,tipoMensaje ) {
    const notificacion = document.getElementById('notificaion-poput');
    const tipoNot = document.querySelector('.notification');
    tipoNot.classList.add(tipoMensaje);

    if (!notificacion) return;

    notificacion.innerHTML = mensaje;
    if (tipoMensaje==='success') {
        tipoNot.classList.remove('error');
    }else{
        tipoNot.classList.remove('success');
    }
    notificacion.classList.add('show');

    if (notificacion.timeoutId) {
        clearTimeout(notificacion.timeoutId);
    }

    notificacion.timeoutId = setTimeout(() => {
        notificacion.classList.remove('show');
        tipoNot.classList.remove(tipoMensaje);
    }, 3000);
}
function initNotifications() {
    
}