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

//Rellena 
const completarProductos = () => {
    const listaArticulos = JSON.parse(localStorage.getItem('listaArticulos'))

    for(let i = 0; i < listaArticulos.length; i++){
        const contenedorCartas = document.querySelector('.contenedorProductos')
        const cartaProducto = document.createElement('div')
        const contenedorProducto = document.createElement('div')
        const nombreProducto = document.createElement('h4')
        const precioProducto = document.createElement('h4')
        const imagenProducto = document.createElement('img')

        cartaProducto.className = "col col-lg-3 d-flex justify-content-center"
        contenedorProducto.className = "producto mb-3"
        nombreProducto.innerText = listaArticulos[i].nombre
        precioProducto.innerText = listaArticulos[i].precio
        imagenProducto.setAttribute('src',listaArticulos[i].imagen)

        contenedorProducto.append(imagenProducto,nombreProducto,precioProducto)
        cartaProducto.append(contenedorProducto)
        contenedorCartas.append(cartaProducto)
    }
}

completarProductos()