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
    console.log(listaUsuarios)
    for(let i = 0; i < listaUsuarios.length ; i++){
        if( nombre === listaUsuarios[i].user && contraseña === listaUsuarios[i].password ){
            if(listaUsuarios[i].admin){
                window.location.href = './admin.html'
                return true
            }else{
                return true                
            }
        }
    }
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
const altaUsuario = (usuario,contraseña) => {
    let usuarioRepetido = false
    const listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'))

    for(let i = 0; i < listaUsuarios.length; i++){
        if(usuario === listaUsuarios[i].nombre){
            usuarioRepetido = true
            return false
        }
    }
    if(!usuarioRepetido){
        listaUsuarios.push(new Usuarios(usuario,contraseña,false))
        localStorage.setItem('listaUsuarios',JSON.stringify(listaUsuarios))
        return true
    }
}
//Obtener los productos de la API
const obtenerListaProductos = async () => {
    const response = await fetch('https://63100d3436e6a2a04ee554b1.mockapi.io/ListaProductos')
    const data = await response.json()
    return data
}