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
    constructor(nombre,contraseña,admin,carrito){
        this.nombre = nombre
        this.contraseña = contraseña
        this.admin = admin
        this.carrito = carrito
    }
}

//***************************Constantes y variables*************************

const listaUsuarios = [
    new Usuarios('admin','12345',true)
]

const $divAdmin = document.getElementById('divAdmin')
const $div = document.getElementById('div')
const $tablaProductos = document.getElementById('tablaProductos')
const $divCliente = document.getElementById('divCliente')
const $botonSalir = document.createElement('button')
const nombreUsuario = document.getElementById('usuario')
const contraseñaUsuario = document.getElementById('contraseña')


//******************************* Funciones ********************************

// Valida que sea correcto el usuario y la contraseña con respecto a la lista
// de usuarios, ademas verifica que si es admin lo envía a la pagina admin

const validarUsuario = async (nombre,contraseña) => {
    const respuesta = await fetch('https://63100d3436e6a2a04ee554b1.mockapi.io/ListaUsuarios')
    const listaUsuarios = await respuesta.json()

    for(let i = 0; i < listaUsuarios.length; i++){
        if(nombre === listaUsuarios[i].user && contraseña === listaUsuarios[i].password){
            if(listaUsuarios[i].admin){
                window.location.href = './admin.html'
                return true
            }else{
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
    const respuesta = await fetch('https://63100d3436e6a2a04ee554b1.mockapi.io/ListaUsuarios')
    const listaUsuarios = await respuesta.json()

    for(let i = 0; i < listaUsuarios.length; i++){
        if(usuario === listaUsuarios[i].user){
            return false
        }
    }
    const nuevoUsuario = {
        user : usuario,
        password : contraseña,
        admin : false
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

//SweetAlert cantidad de productos
const elegirCantidadProducto = async (stock) => {
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
      .then(resp => console.log(resp.value))
}