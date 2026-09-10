<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>
</head>
<body>
    <header class="header-body">
        <h1>Administración de productos</h1>
        <h4>Gestiona y organiza tus productos</h4>
    </header>
    <!-- Categorias -->
    <section class="container container-secondary">
        <div class="header-card-container">
            <div class="header-left">
                <div class="icon-image">
                    <span class="material-symbols-outlined">lightbulb_2</span>
                    <span class="titulo">Categorias de productos</span>
                </div>
                <div class="search-general">
                    <i class='bx bx-search-alt-2' ></i>
                    <input type="search" placeholder="Buscar categoria" id="searchInput">
                </div>
            </div>
            <div class="button-general" id="agregar-categoria">
                <a>
                    <i class='bx bx-plus' ></i>
                    <span>Nueva categoría</span>
                </a>
            </div>
        </div>

    <div class="contenedor-categorias" id="contenedor-categorias"></div>
    </section>

    <!-- productos -->
    <!--Where is the doom eternium, in this time. I need it-->
    <section class="container container-secondary">
        <div class="header-card-container">
            <div class="header-left">
                <div class="icon-image">
                    <span class="material-symbols-outlined">lightbulb_2</span>
                    <span class="titulo">Productos</span>
                </div>
                <div class="search-general">
                    <i class='bx bx-search-alt-2'></i>
                    <input type="search" placeholder="Buscar producto" id="searchInputProd">
                </div>
            </div>


            <div class="button-general" id="agregar-producto">
                <a>
                    <i class='bx bx-plus' ></i>
                    <span>Nuevo producto</span>
                </a>
            </div>
        </div>

        <div class="table-container" id="table-container">
            <table class="styled-table" id="table-content">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Código</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <!-- <th>Descripción</th> -->
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Disponible</th>
                        <th>Complemento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="body-container-table"></tbody>
            </table>
        </div>
    </section>


    <!-- combos -->
    <section class="container container-secondary">
        <div class="header-card-container">
            <div class="header-left">
                <div class="icon-image">
                    <span class="material-symbols-outlined">lightbulb_2</span>
                    <span class="titulo">Combos</span>
                </div>
                <div class="search-general">
                    <i class='bx bx-search-alt-2'></i>
                    <input type="search" placeholder="Buscar combo" id="searchInputProd">
                </div>
            </div>


            <div class="button-general" id="agregar-combos">
                <a>
                    <i class='bx bx-plus' ></i>
                    <span>Nuevo combo</span>
                </a>
            </div>
        </div>
        <div class="contenedor-categorias" id="contenedor-combos"></div>
    </section>
<!-- Modal Agregar categoria-->
 <dialog class="modal" id="modal-categoria">

        <header class="modal-header">
            <h2 class="modal-title">Agregar nueva categoria</h2>
            <button class="modal-close" id="btn-close-category">X</button>
        </header>
        
        <section class="modal-content">
            <div class="datos-modal-producto">
                <div class="datos-modal-producto">
                    <span>Imagen</span>
                    <input type="file" name="" id="">
                </div>
                <div class="datos-modal-producto">
                    <span>Nombre</span>
                    <input type="text" name="" id="">
                </div >
                <div class="datos-modal-producto">
                    <span>Descripción</span>
                    <input type="text" name="" id="">
                </div >
            </div>
            <div class="contenido-botones-modal">
                <button class="emergente-btn" id="btn-cancel-category">Cancelar</button>
                <button class="confirm-btn">Confirmar producto</button>
            </div>
        </section>
 </dialog>
<!-- Modal Agregar Producto-->
 <dialog class="modal" id="modal-producto">

        <header class="modal-header">
            <h2 class="modal-title">Agregar nuevo producto</h2>
            <button class="modal-close" id="btn-close-product">X</button>
        </header>
        
        <section class="modal-content">
            <div class="datos-modal-producto">
                <div>
                    <span>Codigo interno</span>
                    <input type="text" name="" id="">
                </div>
                <div class="datos-modal-producto">
                    <span>Imagen</span>
                    <input type="file" name="" id="">
                </div>
                <div class="datos-modal-producto">
                    <span>Nombre</span>
                    <input type="text" name="" id="">
                </div >
                <div class="datos-modal-producto">
                    <span>Precio</span>
                    <input type="number" name="" id="">
                </div>
                <div class="datos-modal-producto">
                    <span>Meta diaria</span>
                    <input type="number" name="" id="">
                </div>
                <div class="datos-modal-producto">
                    <span>Categoria</span>
                    <select name="" id="">
                        <!-- AQUI IRAN LOS DATOS DE CATEGORIAS -->
                    </select>
                </div>
                <div class="datos-modal-producto">
                    <fieldset>
                        <legend>¿Este producto es un extra?</legend>
                        <div>
                            <input type="radio" name="extra" value="1">
                            <label for="extra-si">Si</label>
                        </div>
                        <div>
                            <input type="radio" name="extra" value="0">
                            <label for="extra-no">No</label>
                        </div>
                    </fieldset>

                </div>
            </div>

            <div class="contenido-botones-modal">
                <button class="emergente-btn" id="btn-cancel-product">Cancelar</button>
                <button class="confirm-btn">Confirmar producto</button>
            </div>
        </section>
 </dialog>
 <!-- Modal Agregar combos -->
  <dialog class="modal" id="modal-combos">

        <header class="modal-header">
            <h2 class="modal-title">Agregar nuevo combo</h2>
            <button class="modal-close" id="btn-close-combos">X</button>
        </header>
        
        <section class="modal-content">
            <div class="datos-modal-producto">
                <div class="datos-modal-producto">
                    <span>Nombre</span>
                    <input type="text" name="" id="">
                </div >
                <div class="datos-modal-producto">
                    <span>Imagen</span>
                    <input type="file" name="" id="">
                </div>
                <div class="datos-modal-producto">
                    <span>Descripcion</span>
                    <input type="text" name="" id="">
                </div >
                <div class="datos-modal-producto">
                    <span>Precio total</span>
                    <input type="number" name="" id="" disable>
                </div>
                <div class="datos-modal-producto">
                    <fieldset style="padding: 16px; color: gray;">
                        <legend>Agregar productos al combo</legend>
                        <div>
                            <select name="productos" id="">
                                <option value="">producto 1</option>
                                <!-- Se cargaran los productos desde la API -->
                            </select>
                        </div>
                        <div>
                            <span>Cantdad total</span>
                            <input type="number" name="" id="" disable min=0 max=9999>
                        </div>
                        <button class="button-agregar-producto">Agregar producto</button>
                    </fieldset>
                    
                    
                    <table>
                        <tr>
                           <th>Producto</th> 
                           <th>cantidad</th> 
                           <th>precio</th>
                        </tr>
                        <tbody>
                            <!-- xd -->
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="contenido-botones-modal">
                <button class="emergente-btn" id="btn-cancel-combos">Cancelar</button>
                <button class="confirm-btn">Confirmar producto</button>
            </div>
        </section>
 </dialog>
</body>
</html>