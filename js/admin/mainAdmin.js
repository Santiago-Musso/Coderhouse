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

    verificarVacios ? alert('No ha introducido los valores correctamente') : agregarArticulo(nuevoProducto,codigoNuevoProducto) && location.reload()
}

//Envia a la pagina tienda nuevamente
botonSalir.onclick = () => {
    window.location.href = './tienda.html'
}

//Llama a la API para obtener todos los productos
//y los va sumando a la tabla 
const listarProductos = async () => {
    const codigoProducto = document.getElementById('codigoNuevoProducto')

    const listaProductos = await obtenerListaProductos()

    codigoNuevoProducto = parseInt(listaProductos[listaProductos.length-1].codigo) + 1
    codigoProducto.value = codigoNuevoProducto

    for(let i = 0; i < listaProductos.length; i++){
        const codigoProducto = document.createElement('th')
        const nombreProducto = document.createElement('td')
        const categoriaProducto = document.createElement('td')
        const precioProducto = document.createElement('td')
        const stockProducto = document.createElement('td')
        const botonBorrar = document.createElement('td')
        const filaProducto = document.createElement('tr')
        const cuerpoTabla = document.createElement('tbody')
        const borrarProducto = document.createElement('button')
        
        const tablaProductos = document.querySelector('table')

        borrarProducto.className = 'btn-close'
        borrarProducto.setAttribute('codigo',i)
        borrarProducto.onclick = (e) => {
            const codigoProductoABorrar = e.target.getAttribute('codigo')
            swal({
                title: `Estas seguro que deseas eliminar el producto ${listaProductos[codigoProductoABorrar].producto.nombre}?`,
                text: "Una vez borrado no hay manera de recuperarlo o deshacer esta accion.",
                icon: "warning",
                buttons: ['Cancelar','Aceptar'],
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    borrarArticulo(listaProductos[codigoProductoABorrar].codigo)
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

        nombreProducto.innerText = listaProductos[i]['producto'].nombre
        categoriaProducto.innerText = listaProductos[i]['producto'].categoria
        precioProducto.innerText = listaProductos[i]['producto'].precio
        stockProducto.innerText = listaProductos[i]['producto'].stock
        codigoProducto.innerText = listaProductos[i].codigo
        botonBorrar.append(borrarProducto)
        filaProducto.append(codigoProducto,nombreProducto,categoriaProducto,precioProducto,stockProducto,botonBorrar)
        cuerpoTabla.append(filaProducto)
        tablaProductos.append(cuerpoTabla)
    }
}

listarProductos()

