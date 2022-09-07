const botonLogin = document.getElementById('botonLogin')
const botonRegistro = document.getElementById('botonRegistro')
const iconoLogin = document.querySelector('.login')
const contendorProductos = document.querySelector('.contenedorProductos')

//Valida el usuario ingresado
botonLogin.onclick = async () => {
    const nombreUsuario = document.getElementById('nombreUsuario')
    const contraseñaUsuario = document.getElementById('contraseñaUsuario')
    const usuarioValido = await validarUsuario(nombreUsuario.value, contraseñaUsuario.value)

    if(usuarioValido){
        iconoLogin.className = 'animate__animated animate__bounceOutDown'
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Ingresado correctamente!'
          })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o contraseña incorrectos'
        })
    }
}

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
//Rellena 
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
        botonAgregarCarrito.setAttribute('codigo',i+1)

        botonAgregarCarrito.onclick = (e) => {
            const productoASumar = e.target.getAttribute('codigo')
            const stockProductoASumar = listaArticulos[productoASumar].producto.stock
            elegirCantidadProducto(stockProductoASumar)
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

completarProductos()
