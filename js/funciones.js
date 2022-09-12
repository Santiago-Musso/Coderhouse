// Santiago Musso

//********************************Clases***********************************
class Productos{
    constructor(nombre,precio,categoria,stock,codigo,imagen){
        this.nombre = nombre
        this.precio = precio
        this.categoria = categoria
        this.stock = stock
        this.codigo = codigo
        this.imagen = imagen
    }
}
class Usuarios{
    constructor(nombre,contraseña,admin,token){
        this.nombre = nombre
        this.contraseña = contraseña
        this.admin = admin
        this.token = token
    }
}

//***************************Constantes y variables*************************

const $divAdmin = document.getElementById('divAdmin')
const $div = document.getElementById('div')
const $tablaProductos = document.getElementById('tablaProductos')
const $divCliente = document.getElementById('divCliente')
const $botonSalir = document.createElement('button')
const nombreUsuario = document.getElementById('usuario')
const contraseñaUsuario = document.getElementById('contraseña')
const myModal = document.getElementById('modalCarrito')
const myInput = document.getElementById('modal')

let totalCompra = 0


//******************************* Funciones ********************************

// Valida que sea correcto el usuario y la contraseña con respecto a la lista
// de usuarios, ademas verifica que si es admin lo envía a la pagina admin

const validarUsuario = async (nombre,contraseña) => {
    const listaUsuarios = await obtenerListaUsuarios()

    for(let i = 0; i < listaUsuarios.length; i++){
        if(nombre === listaUsuarios[i].user && contraseña === listaUsuarios[i].password){
            if(listaUsuarios[i].admin){
                window.location.href = './admin.html'
                return true
            }else{
                localStorage.setItem('tokenUser', listaUsuarios[i].token)
                return true                
            }
        }
    }
    return false
}
 //**********************Agrega los articulos****************************
const agregarArticulo = (productoEnviar,codigo) => {

    const productoJSON = {
        producto : productoEnviar,
        codigo: codigo
    }

    fetch(`https://63100d3436e6a2a04ee554b1.mockapi.io/ListaProductos/`,{
        method: 'POST',
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(productoJSON)
    })
        .then(resp => location.reload())
        .catch(error => console.error(error))
}

 //**********************Borra el articulo deseado**********************

const borrarArticulo = (codigo) => {
    fetch(`https://63100d3436e6a2a04ee554b1.mockapi.io/ListaProductos/${codigo}`, {
    method: 'DELETE'
})
    .then(resp => location.reload())
    .catch(error => console.log(error))
}
 //**********************Da de alta un usuario que sea nuevo************************
 //Chequea que no se repita nombre de usuario y limpia los inputs
const altaUsuario = async (usuario,contraseña) => {
    const listaUsuarios = await obtenerListaUsuarios()

    for(let i = 0; i < listaUsuarios.length; i++){
        if(usuario === listaUsuarios[i].user){
            return false
        }
    }
    const nuevoUsuario = {
        user : usuario,
        password : contraseña,
        admin : false,
        token : randomToken() + randomToken()
    }
    fetch('https://63100d3436e6a2a04ee554b1.mockapi.io/ListaUsuarios', {
        method: 'POST',
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(nuevoUsuario)
    })
        .then(resp => () => {
            return true
        })
        .catch(error => (error) => {
            console.log(error)
            return false
        } )
}
//Obtener los productos de la API
const obtenerListaProductos = async () => {
    const response = await fetch('https://63100d3436e6a2a04ee554b1.mockapi.io/ListaProductos')
    const data = await response.json()
    return data
}
//Obtener lista de usuarios de la API
const obtenerListaUsuarios = async () => {
    const response = await fetch('https://63100d3436e6a2a04ee554b1.mockapi.io/ListaUsuarios')
    const data = await response.json()
    return data
}
//SweetAlert cantidad de productos
const elegirCantidadProducto = async (stock,codigo) => {
    Swal.fire({
        title: 'Ingrese cantidad',
        icon: 'question',
        input: 'range',
        inputLabel: 'Cantidad',
        inputAttributes: {
          min: 0,
          max: stock,
          step: 1
        },
      })
    .then(cantidad => agregarCarrito(codigo,cantidad.value))
}

//Token random para usuario
const randomToken = () => {
    return Math.random().toString(36).substr(2)
};

//Se ejecuta cuando el usuario es valido
const usuarioValido = (nombreUser) => {
    iconoLogin.className = 'animate__animated animate__bounceOutLeft'
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
      setTimeout(() => {
            iconoLogin.className = 'oculto'
            botonVerCarrito.className = 'btn bg-marron p-1 rounded-start border-dark'
            botonSalirUsuario.className = "btn bg-marron border-dark rounded-end p-1"
            nombreUsuarioLogueado.className = 'nav-link disabled p-2'
            nombreUsuarioLogueado.innerText = `Bienvenido ${nombreUser}!`
      },500)
}

//Busca el token guardado en el localStorage 
const buscarToken = async () => {
    const tokenLocal = localStorage.getItem('tokenUser')
    const listaUsuarios = await obtenerListaUsuarios()

    for(let i = 0; i < listaUsuarios.length; i++){
        if(listaUsuarios[i].token === tokenLocal){
            usuarioValido(listaUsuarios[i].user)
        }
    }
}
//Añadir al carrito
const agregarCarrito = async(codigo,cantidad) => {
    if(cantidad !== undefined && parseInt(cantidad) !== 0){
        const usuarioLogueado = localStorage.getItem('tokenUser')
        const listaUsuarios = await obtenerListaUsuarios()
        const productoASumar = {
            codigo : codigo,
            cantidad : cantidad
        }
        
        for(let i = 0; i < listaUsuarios.length; i++){
            if(listaUsuarios[i].token === usuarioLogueado){      
    
                listaUsuarios[i].carrito.push(productoASumar)
    
                fetch(`https://63100d3436e6a2a04ee554b1.mockapi.io/ListaUsuarios/${listaUsuarios[i].id}`, {
                    method: 'PUT',
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify(listaUsuarios[i])
                })
                .then(() => {
                    Swal.fire(
                        'Producto agregado correctamente',
                        '',
                        'success'
                      )
                })
            }
        }
    }
}

//Muestra el carrito
const mostrarCarrito = async() => {

    const listaUsuarios = await obtenerListaUsuarios()
    const listaProductos = await obtenerListaProductos()

    const tokenUsuarioLogueado = localStorage.getItem('tokenUser')

    const tabla = document.createElement('table')
    const headerTabla = document.createElement('thead')
    const cantidadHeader = document.createElement('th')
    const nombreHeader = document.createElement('th')
    const precioHeader = document.createElement('th')
    const borrarHeader = document.createElement('th')
    const totalCarrito = document.createElement('td')
    const columnaVacia = document.createElement('td')
    const columnaTotal = document.createElement('td')

    tabla.className = 'table'

    cantidadHeader.innerText = 'Cantidad'
    nombreHeader.innerText = 'Nombre'
    precioHeader.innerText = 'Precio'
    columnaTotal.innerHTML = '<b>Total: </b>$'

    for(let i = 0; i < listaUsuarios.length ; i++){
        if(listaUsuarios[i].token === tokenUsuarioLogueado){
            for(let j = 0; j < listaUsuarios[i].carrito.length; j++){
                const filaProducto = document.createElement('tr')
                const cantidadProducto = document.createElement('td')
                const nombreProducto = document.createElement('td')
                const precioProducto = document.createElement('td')
                const borrarProducto = document.createElement('button')
                
            
                borrarProducto.className = 'btn-close'
                borrarProducto.setAttribute('codigo',listaUsuarios[i].carrito[j].codigo)
                cantidadProducto.innerText = listaUsuarios[i].carrito[j].cantidad

                borrarProducto.onclick = (e) => {
                    borrarProductoCarrito(e.target.getAttribute('codigo'), listaUsuarios[i].id)
                }

                for(let k = 0; k < listaProductos.length ; k++){
                    if(listaProductos[k].codigo === listaUsuarios[i].carrito[j].codigo){
                        nombreProducto.innerText = listaProductos[k].producto.nombre
                        precioProducto.innerText = '$' + listaProductos[k].producto.precio
                        totalCompra += (listaUsuarios[i].carrito[j].cantidad * listaProductos[k].producto.precio)
                    }
                }
                filaProducto.append(cantidadProducto,nombreProducto,precioProducto,borrarProducto)
                tabla.append(filaProducto)
            }
            if(listaUsuarios[i].carrito.length === 0){
                const mensaje = document.createElement('h4')
                mensaje.innerText = 'El carrito de compras esta vacío'
                modalCarrito.append(mensaje)
            }else{
                headerTabla.append(cantidadHeader,nombreHeader,precioHeader,borrarHeader)
                tabla.append(headerTabla)
                modalCarrito.append(tabla)
                totalCarrito.innerHTML = totalCompra
                tabla.append(columnaVacia,columnaTotal,totalCarrito)
            }
        }
    }
}

//Borra el producto del carrito

const borrarProductoCarrito = async (codigo,id) => {
    const data = await fetch(`https://63100d3436e6a2a04ee554b1.mockapi.io/ListaUsuarios/${id}`)
    const usuario = await data.json()

    const nuevoCarrito = []

    for(let i = 0; i < usuario.carrito.length ; i++){
        if(usuario.carrito[i].codigo !== codigo){
            nuevoCarrito.push(usuario.carrito[i])
        }
    }

    usuario.carrito = nuevoCarrito

    fetch(`https://63100d3436e6a2a04ee554b1.mockapi.io/ListaUsuarios/${id}`, {
        method: 'PUT',
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(usuario)
    })
        .then(() => {
            botonCerrarCarrito.click()
        })
}