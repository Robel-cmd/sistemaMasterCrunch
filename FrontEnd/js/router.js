function ajax(url) {
    //objeto
    const http = new XMLHttpRequest();

    http.onreadystatechange = function(){
        if (this.readyState == 4) {
            if (this.status == 200) {
                document.getElementById('content-main').innerHTML = this.responseText;
                if (url.includes('resumen')) {
                    initVentasPorEmpleado();
                    initProductosMasVendidos();
                    initVentasPorHora();
                }else if(url.includes('Productos')){
                    initCategorias();
                    initProductos();
                    initCombo();

                    cargarModales();
                }else if(url.includes('Catalogo')){
                    // datos de catalogo
                }
            } else {
                console.error("Error en la petición AJAX. Estado:", this.status, "URL:", url);
            }
        }
    }
    http.open("GET", url, true);
    http.send();
}
const menuLinks = document.querySelectorAll('.menu-link');

menuLinks.forEach(link=>{
    link.addEventListener('click',(e)=>{
        e.preventDefault();
        const url = link.getAttribute('href');
        menuLinks.forEach(L => L.parentElement.classList.remove('active'));
        if (url&&url!=='#') {
            ajax(url);
        }
    });
});

window.addEventListener('DOMContentLoaded',()=>{
    const defaultLink = document.querySelector('#resumen');
    if (defaultLink) {
        const urlDefault = defaultLink.getAttribute('href');
        if (urlDefault && urlDefault!=='#') {
            defaultLink.parentElement.classList.add('active');
            ajax(urlDefault);
        }
    }
});
