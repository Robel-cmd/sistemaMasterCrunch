function initProductos() {
const apirurlCat = `/sistemaMasterCrunch/backEnd/api/meta.php?entity=categoria`;
const apirurlProductos = `/sistemaMasterCrunch/backEnd/api/meta.php?entity=producto`;


async function cargarAPIProducto() {
try {

    const [resCat, resProd] = await Promise.all([
            fetch(apirurlCat),
            fetch(apirurlProductos)
    ]);
    const categoriaData = await resCat.json();
    const ProductoData = await resProd.json();

    const ObjCat={};
    categoriaData.forEach(item=>{
        const catId = item.id_categoria || item.id;
        if (catId) {
            ObjCat[String(catId)] = item.nombre;
        }
    });

            const selectCategorias = document.querySelector('#content-categorias-list');
            if (selectCategorias) {
                selectCategorias.innerHTML = "";
                categoriaData.forEach(cat => {
                    if (cat.activo == 0) return;

                    const option = document.createElement("option");
                    option.value = cat.id_categoria || cat.id;
                    option.textContent = cat.nombre;
                    selectCategorias.appendChild(option);
                });
            }
    const contenedorTabla = document.querySelector('#table-content tbody');
    contenedorTabla.innerHTML = "";

    ProductoData.registros.forEach(item=>{
        let disponibilidad = item.disponibilidad == 0 ? 'Agotado' : 'Disponible';
        let extra = item.es_extra==0 ? '❌' : '✅';
        const nombreCategoria = ObjCat[String(item.id_categoria)] || "Ninguna";
        let urlDefault = (item.url_imagen && item.url_imagen.trim() !== "") ? item.url_imagen : "uploads/default/default-image.jpg";
        const fila = document.createElement("tr");
        console.log(item.codigo_interno);
        fila.innerHTML=`
            <td class="codigo-interno">${item.codigo_interno}</td>
            <td class="product-name-cell"><img src="/sistemamastercrunch/${urlDefault}" alt="Producto"></td>
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

// AGREGAR PRODUCTOS
const btnAgregarProducto = document.getElementById('btn-POST-producto');
if (btnAgregarProducto) {
    btnAgregarProducto.addEventListener('click',()=>{
        const codigoInterno=document.getElementById('text-codigoInterno').value;
        const nombre=document.getElementById('text-name').value;
        const precio=document.getElementById('number-price').value;
        const metaMensual=document.getElementById('number-meta').value;
        const categoria=document.getElementById('content-categorias-list').value;
        const radioExtra = document.querySelector('input[name="extra"]:checked');
        const valorEsExtra = radioExtra ? radioExtra.value : null;
        const imagen = document.getElementById('url-image');
        const archivo = imagen.files ? imagen.files[0] : null;
        const disponibilidad = 1;
        console.log(archivo);
        if (!valorEsExtra||!codigoInterno||!nombre||!precio||!categoria||!valorEsExtra||!archivo) {
            console.log('Rellene todos los datos y seleccione una imagen.');
            return;
        }
        console.log(codigoInterno);
        const formData = new FormData();
        formData.append('codigo_interno',codigoInterno);
        formData.append('nombre',nombre);
        formData.append('precio',precio);
        formData.append('id_categoria',categoria);
        formData.append('imagen',archivo);
        formData.append('es_extra',valorEsExtra);
        formData.append('disponibilidad',disponibilidad);

        // POST
        fetch(apirurlProductos,{
            method: 'POST',
            body: formData
        })
        .then(res=>res.json())
        .then(data=>{
            const modalP = document.getElementById('modal-producto');
            modalP.close();
            cargarAPIProducto();
            mostrarNotificacion("¡Se han agregado los datos de forma exitosa!","success");
        })
        .catch(error=>{mostrarNotificacion("Ha ocurrido un error al intentar enviar los datos","error");})
    });
}
}
    