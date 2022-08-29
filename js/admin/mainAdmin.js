const botonAgregarProducto = document.getElementById('agregarNuevoProducto')
const botonSalir = document.getElementById('salirAdmin')
const codigoProducto = document.getElementById('codigoNuevoProducto')

//Seteo el codigo de producto en base al length del array de articulos
localStorage.getItem('listaArticulos') ? codigoProducto.value = JSON.parse(localStorage.getItem('listaArticulos')).length : codigoProducto.value = 0


//Agrega el producto, validando que ningun input quede vacío
botonAgregarProducto.onclick = () => {
    const nombreNuevoProducto = document.getElementById('nombreNuevoProducto')
    const categoriaNuevoProducto = document.getElementById('categoriaNuevoProducto')
    const precioNuevoProducto = document.getElementById('precioNuevoProducto')
    const stockNuevoProducto = document.getElementById('stockNuevoProducto')
    const imagenNuevoProducto = document.getElementById('imagenNuevoProducto')
    let verificarVacios = false

    const nuevoProducto = new Productos()

    nuevoProducto.nombre = nombreNuevoProducto.value
    nuevoProducto.categoria = categoriaNuevoProducto.value
    nuevoProducto.precio = parseInt(precioNuevoProducto.value)
    nuevoProducto.stock = parseInt(stockNuevoProducto.value)
    nuevoProducto.imagen = imagenNuevoProducto.value

    for(props in nuevoProducto){
        nuevoProducto[props] === '' ? verificarVacios = true : null
    }

    verificarVacios ? alert('No ha introducido los valores correctamente') : agregarArticulo(nuevoProducto) && location.reload()
}

//Envia a la pagina tienda nuevamente
botonSalir.onclick = () => {
    window.location.href = './tienda.html'
}

//Lee todos los productos que hay en la lista de articulos almacenada en el LocalStorage
//y los va sumando a la tabla, le agrega tambien 
const listarProductos = () => {
    const listaProductos = JSON.parse(localStorage.getItem('listaArticulos'))

    for(let i = 0; i < listaProductos.length; i++){
        const codigoProducto = document.createElement('th')
        const nombreProducto = document.createElement('td')
        const categoriaProducto = document.createElement('td')
        const precioProducto = document.createElement('td')
        const stockProducto = document.createElement('td')
        const botonBorrar = document.createElement('td')
        const tablaProductos = document.querySelector('table')
        const filaProducto = document.createElement('tr')
        const cuerpoTabla = document.createElement('tbody')
        const borrarProducto = document.createElement('button')

        borrarProducto.className = 'btn-close'
        borrarProducto.setAttribute('codigo',i)
        borrarProducto.onclick = (e) => {
            const codigoProductoABorrar = e.target.getAttribute('codigo')

            swal({
                title: `Estas seguro que deseas eliminar el producto ${listaProductos[codigoProductoABorrar].nombre}?`,
                text: "Una vez borrado no hay manera de recuperarlo o deshacer esta accion.",
                icon: "warning",
                buttons: ['Cancelar','Aceptar'],
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    borrarArticulo(codigoProductoABorrar)
                } else {
                  swal("El producto todavia sigue a salvo!");
                }
              });
        }
        codigoProducto.setAttribute('scope', 'row')
        nombreProducto.className = 'col'
        categoriaProducto.className = 'col'
        precioProducto.className = 'col'
        stockProducto.className = 'col'

        nombreProducto.innerText = listaProductos[i].nombre
        categoriaProducto.innerText = listaProductos[i].categoria
        precioProducto.innerText = listaProductos[i].precio
        stockProducto.innerText = listaProductos[i].stock
        codigoProducto.innerText = i
        botonBorrar.append(borrarProducto)
        filaProducto.append(codigoProducto,nombreProducto,categoriaProducto,precioProducto,stockProducto,botonBorrar)
        cuerpoTabla.append(filaProducto)
        tablaProductos.append(cuerpoTabla)
    }
}

listarProductos()