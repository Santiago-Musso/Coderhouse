const botonLogin = document.getElementById('botonLogin')
const botonRegistro = document.getElementById('botonRegistro')
const iconoLogin = document.querySelector('.login')
const contendorProductos = document.querySelector('.contenedorProductos')

//Valida el usuario ingresado
botonLogin.onclick = () => {
    const nombreUsuario = document.getElementById('nombreUsuario')
    const contraseñaUsuario = document.getElementById('contraseñaUsuario')

    if(validarUsuario(nombreUsuario.value, contraseñaUsuario.value)){
        iconoLogin.className = 'oculto'
    }else{
        alert('Nombre de usuario o contraseña incorrecto')
    }
}

botonRegistro.onclick = () => {
    const nombreUsuario = document.getElementById('nombreUsuario')
    const contraseñaUsuario = document.getElementById('contraseñaUsuario')

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

        cartaProducto.className = "col col-lg-3 d-flex justify-content-center"
        contenedorProducto.className = "producto mb-3"
        nombreProducto.innerText = listaArticulos[i].producto.nombre
        precioProducto.innerText = listaArticulos[i].producto.precio
        imagenProducto.setAttribute('src',listaArticulos[i].producto.imagen)

        contenedorProducto.append(imagenProducto,nombreProducto,precioProducto)
        cartaProducto.append(contenedorProducto)
        contenedorCartas.append(cartaProducto)
    }
}

completarProductos()
