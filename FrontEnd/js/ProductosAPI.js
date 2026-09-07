function initProductos() {
    const producto = {
    id: `id`,
    codigo: `codigo`,
    imagen: `../assets/D529F506-94B2-4DC5-9B45-DCE2DC2709DE.jpeg`,
    nombre: `nombre`,
    precio: `precio`,
    categoria: `categoria`,
    disponible: `disponible`,
    extra: `extra`,
    fecha_creacion: `tu madre`
    };

    function AgregarFila() {
        const contenedor = document.querySelector('#body-container-table');
        const fila = `
            <tr>
                <td>${producto.id}</td>
                <td>${producto.codigo}</td>
                <td class="product-name-cell">
                    <img src="${producto.imagen}" alt="Producto">
                </td>
                <td>${producto.nombre}</td>
                <td class="product-price-cell">${producto.precio}</td>
                <td>${producto.categoria}</td>
                <td>${producto.disponible}</td>
                <td>${producto.extra}</td>
                <td>
                    <div class="table-actions" id="table-actions">
                        <div class="btn btn-edit" id="btn-editar">Editar</div>
                        <div class="btn btn-disable" id="btn-desactivar">Desactivar</div>
                    </div>
                </td>
            </tr>
        `;
        contenedor.innerHTML += fila;
    }
//Agregar nuevo producto
    const Agregar = document.getElementById('agregar-producto');
    if (Agregar) {
        Agregar.addEventListener('click',()=>{
            AgregarFila();
        });
    } else {
        console.warn("No se encontro el elemento.");
    }
    const contenedorAcciones = document.querySelector('#table-actions');
    if (contenedorAcciones) {
        contenedorAcciones.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-edit')) {
                console.log('editar');
            }
            if (e.target.classList.contains('btn-disable')) {
                console.log('desactivar');
            }
        });
    }

function cargarAPIProducto() {
    const apirurlCat = `http://localhost/sistemaMasterCrunch/backEnd/api/meta.php?entity=categoria`;
    const ObjCat={};
    fetch(apirurlCat)
    .then(res=>res.json())
    .then(data=>{
        data.forEach(item => {
            console.log(item.id_categoria);
            ObjCat[item.id_categoria] = item.nombre;
            console.log(ObjCat[item.id_categoria]);
        });
    })
    .catch(error=>{
        console.error('error',error);
    })
    const apirurlProductos = `http://localhost/sistemaMasterCrunch/backEnd/api/meta.php?entity=producto`;
    fetch(apirurlProductos)
    .then(res => res.json())
    .then(data => {
        const contenedorTabla = document.querySelector('#table-content tbody');
        contenedorTabla.innerHTML = "";
        
        data.registros.forEach(item => {
            let disponibilidad = item.disponibilidad;
            let extra = item.es_extra;

            const nombreCategoria = ObjCat[item.id_categoria]||"Ninguna";

            if (disponibilidad==0) {
                disponibilidad = 'Agotado';
            }else if(disponibilidad==1){
                disponibilidad = 'Disponible';
            }
            if (extra==0) {
                extra ='❌';
            } else if(extra==1){
                extra ='✅';
            }
            const fila = document.createElement("tr");
            fila.innerHTML=`
                <td>${item.id_producto}</td>
                <td class="codigo-interno">${item.codigo_interno}</td>
                <td class="product-name-cell"><img src="/sistemamastercrunch/${item.url_imagen}" alt="Producto"></td>
                <td class="nombre-producto">${item.nombre}</td>
                <td class="product-price-cell">${item.precio}</td>
                <td>${nombreCategoria}</td>
                <td class="row-disponible ${disponibilidad}">${disponibilidad}</td>
                <td>${extra}</td>
                <td>
                    <div class="table-actions" id="table-actions">
                        <div class="btn btn-edit" id="btn-editar">Editar</div>
                        <div class="btn btn-disable" id="btn-desactivar">Desactivar</div>
                    </div>
                </td>
            `;
            console.log(fila);
            contenedorTabla.appendChild(fila);
            });
    })
    .catch(error => {
        console.error('error',error);
    })
}
    
cargarAPIProducto();
}
    