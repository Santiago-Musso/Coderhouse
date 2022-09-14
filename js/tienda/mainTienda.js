
//Valida el usuario ingresado
botonLogin.onclick = async () => {
    const nombreUsuario = document.getElementById('nombreUsuario')
    const contraseñaUsuario = document.getElementById('contraseñaUsuario')
    const usuario = await validarUsuario(nombreUsuario.value, contraseñaUsuario.value)

    if(usuario){
        usuarioValido(nombreUsuario.value)
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o contraseña incorrectos'
        })
    }
}

botonVerCarrito.onclick = mostrarCarrito

//Cierra el carrito y borra todos los elementos de los modales por si se los llama de nuevo

botonCerrarCarrito.onclick = () => {
    while (modalCarrito.firstChild) {
        modalCarrito.removeChild(modalCarrito.firstChild)
      }
    totalCompra = 0
}
botonCerrarCarrito2.onclick = () => {
    while (modalCarrito.firstChild) {
        modalCarrito.removeChild(modalCarrito.firstChild)
    }
    totalCompra = 0
}
botonPagar.onclick = () => {
    while (modalCarrito.firstChild) {
        modalCarrito.removeChild(modalCarrito.firstChild)
    }
    totalCompra = 0
}


//Registra un usuario nuevo, validando que no sea vacio el input

botonRegistro.onclick = () => {
    const nombreUsuario = document.getElementById('nombreUsuario')
    const contraseñaUsuario = document.getElementById('contraseñaUsuario')

    if(nombreUsuario.value !== '' && contraseñaUsuario.value !== ''){
        swal({
            title: `Estas seguro que desea dar de alta este usuario?`,
            icon: "warning",
            buttons: ['Cancelar','Aceptar'],
            dangerMode: false,
          })
          .then((willDelete) => {
            if(altaUsuario(nombreUsuario.value,contraseñaUsuario.value)){
                swal("Usuario creado correctamente!")
                nombreUsuario.value = ''
                contraseñaUsuario.value = ''
            }else{
                if (willDelete) {
                    swal("El usuario ya se encuentra registrado");
                }
            }
          });
    }
}

//Desloguea el usuario logeado quitando el token del local storage
botonSalirUsuario.onclick = () => {
    if(localStorage.getItem('tokenUser') != undefined){
        localStorage.removeItem('tokenUser')
        location.reload()
    }
}

//Rellena la tienda de productos
const completarProductos = async () => {
    const listaArticulos = await obtenerListaProductos()

    for(let i = 0; i < listaArticulos.length; i++){
        const contenedorCartas = document.querySelector('.contenedorProductos')
        const cartaProducto = document.createElement('div')
        const contenedorProducto = document.createElement('div')
        const nombreProducto = document.createElement('h6')
        const precioProducto = document.createElement('h7')
        const imagenProducto = document.createElement('img')
        const botonAgregarCarrito = document.createElement('button')

        cartaProducto.className = "card m-3 p-0 d-flex justify-content-center producto animate__animated animate__flipInX"
        contenedorProducto.className = "card-body p-0 contenedorProducto"
        botonAgregarCarrito.className = "btn p-0 btn-outline-dark"
        botonAgregarCarrito.setAttribute('codigo',listaArticulos[i].codigo)

        botonAgregarCarrito.onclick = (e) => {
            if(localStorage.getItem('tokenUser') != undefined){
                const productoASumar = e.target.getAttribute('codigo')
                let stockProductoASumar

                for(let j = 0; j < listaArticulos.length; j++){
                    if(listaArticulos[j].codigo === productoASumar){
                        stockProductoASumar = listaArticulos[j].producto.stock
                    }
                }
                elegirCantidadProducto(stockProductoASumar,productoASumar)
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Debes loguearte para agregar al carrito'
                  })
            }
        }
        
        nombreProducto.innerText = listaArticulos[i].producto.nombre
        precioProducto.innerText = '$' + listaArticulos[i].producto.precio
        imagenProducto.className = "card-img-top imagenProducto"
        imagenProducto.setAttribute('src',listaArticulos[i].producto.imagen)
        botonAgregarCarrito.innerText = 'Agregar al carrito'

        contenedorProducto.append(nombreProducto,precioProducto)
        cartaProducto.append(imagenProducto,contenedorProducto,botonAgregarCarrito)
        contenedorCartas.append(cartaProducto)
    }
}

//Por cada tecla que se presiona en la barra de busqueda filtra los productos

document.addEventListener("keyup", e => {
    if( e.target.matches('#buscador')){
        document.querySelectorAll('.producto').forEach( producto => {
            const palabra = producto.textContent.slice(0,producto.textContent.length - 18).toLowerCase()
            palabra.includes(e.target.value.toLowerCase()) ? producto.classList.remove("d-none") : producto.classList.add("d-none")
        })
    }
})

document.addEventListener("keyup", e => {
    if( e.target.matches('#buscador')){
        document.querySelectorAll('.producto').forEach( producto => {
            producto.textContent.toLowerCase().includes(e.target.value.toLowerCase()) ? producto.classList.remove("d-none") : producto.classList.add("d-none")
        })
    }
})

buscarToken()
completarProductos()
