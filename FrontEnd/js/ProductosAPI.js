function initProductos() {
    //Agregar nuevo producto
    const modalAddProduct = document.querySelector('.modal');
    const botonAddProducto = document.querySelector('#agregar-producto');
    const cerrarModal = document.querySelector('#btn-close');

    function openModal(){modalAddProduct.showModal();}
    function closeModal(){modalAddProduct.close();}
    
    botonAddProducto.addEventListener('click',(openModal));
    cerrarModal.addEventListener('click',(closeModal));




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

async function cargarAPIProducto() {
try {
    const apirurlCat = `http://localhost/sistemaMasterCrunch/backEnd/api/meta.php?entity=categoria`;
    const apirurlProductos = `http://localhost/sistemaMasterCrunch/backEnd/api/meta.php?entity=producto`;
    const [resCat, resProd] = await Promise.all([
            fetch(apirurlCat),
            fetch(apirurlProductos)
    ]);
    const categoriaData = await resCat.json();
    const ProductoData = await resProd.json();

    const ObjCat={};
    categoriaData.forEach(item=>{
        ObjCat[item.id_categoria]=item.nombre;
    });

    const contenedorTabla = document.querySelector('#table-content tbody');
    contenedorTabla.innerHTML = "";
    
    ProductoData.registros.forEach(item=>{
        let disponibilidad = item.disponibilidad == 0 ? 'Agotado' : 'Disponible';
        let extra = item.es_extra==0 ? '❌' : '✅';
        const nombreCategoria = ObjCat[item.id_categoria] || "Ninguna";

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
                    <div class="btn btn-disable" id="btn-desactivar">Eliminar</div>
                </div>
            </td>
        `;
        contenedorTabla.appendChild(fila);
    });
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}   
cargarAPIProducto();
}
    