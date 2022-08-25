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
    new Usuarios('admin','12345',true),
    new Usuarios('santi','123',false)
]
const listaArticulos = []

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

const validarUsuario = (nombre,contraseña) => {
    for(let i = 0; i < listaUsuarios.length ; i++){
        if( nombre === listaUsuarios[i].nombre && contraseña === listaUsuarios[i].contraseña ){
            if(listaUsuarios[i].admin){
                window.location.pathname = '/C:/Users/Santiago/Documents/GitHub/Coderhouse/pages/admin.html'
                return true
            }else{
                return true                
            }
        }
    }
}
 //**********************Agrega los articulos****************************
const agregarArticulo = (producto) => {
    let listaProductosLocal = JSON.parse(localStorage.getItem('listaArticulos'))

    if(listaProductosLocal === null ){
        listaProductosLocal = [producto]
        localStorage.setItem('listaArticulos',JSON.stringify(listaProductosLocal))
        return true
    }else{
        listaProductosLocal.push(producto)
        localStorage.setItem('listaArticulos',JSON.stringify(listaProductosLocal))
        return true
    } 
}

 //**********************Borra el articulo deseado**********************

const borrarArticulo = (codigo) => {
    const listaArticulos = JSON.parse(localStorage.getItem('listaArticulos'))
    const nuevaLista = []

    for(let i = 0; i < listaArticulos.length; i++){
        if( i != codigo ){
            nuevaLista.push(listaArticulos[i])
        }
    }
    localStorage.setItem('listaArticulos',JSON.stringify(nuevaLista))
    location.reload()
}
 //**********************Da de alta un usuario que sea nuevo************************
 //Chequea que no se repita nombre de usuario y limpia los inputs
const altaUsuario = () => {
    let usuarioRepetido = false

    for(let i = 0; i < listaUsuarios.length; i++){
        if(nombreUsuario.value === listaUsuarios[i].nombre){
            alert('El usuario ya se encuentra registrado!')
            usuarioRepetido = true
            break
        }
    }
    if(!usuarioRepetido){
        listaUsuarios.push(new Usuarios(nombreUsuario.value,contraseñaUsuario.value,false))
        alert("Usuario dado de alta correctamente!")
        nombreUsuario.value = ''
        contraseñaUsuario.value = ''
    }
}