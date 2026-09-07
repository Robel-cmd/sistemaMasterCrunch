<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>
</head>
<body>
    <header>
        <h1>Administración de productos</h1>
        <h4>Gestiona y organiza tus productos</h4>
    </header>

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

    <!-- aun no se como hacer la tabla de catalogos de productos XD-->
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
                <a href="#">
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
                        <th>Extra</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="body-container-table"></tbody>
            </table>
        </div>
    </section>
</body>
</html>