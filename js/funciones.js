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

 //Carga de articulos de ejemplo
const articuloEjemplo1  = new Productos()
articuloEjemplo1.nombre = 'Bombon Rocher'
articuloEjemplo1.precio = 270
articuloEjemplo1.categoria = 'bombones'
articuloEjemplo1.stock = 15
articuloEjemplo1.imagen = 'https://static.wixstatic.com/media/3bf84c_af26b847aee04e4ebabee76f92dca420~mv2.jpg/v1/fill/w_159,h_170,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/IMG_4271-Editar_edited.jpg'

const articuloEjemplo2  = new Productos()
articuloEjemplo2.nombre = 'Bombon Frambuesa'
articuloEjemplo2.precio = 270
articuloEjemplo2.categoria = 'bombones'
articuloEjemplo2.stock = 15
articuloEjemplo2.imagen = 'https://static.wixstatic.com/media/3bf84c_3bd0fbed83c043b7b19c8a735476b318~mv2.jpg/v1/fill/w_191,h_170,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/bombon%2520frambuesaaa-01_edited.jpg'

const articuloEjemplo3  = new Productos()
articuloEjemplo3.nombre = 'Bombon Dulce de leche'
articuloEjemplo3.precio = 270
articuloEjemplo3.categoria = 'bombones'
articuloEjemplo3.stock = 15
articuloEjemplo3.imagen = 'https://static.wixstatic.com/media/3bf84c_45ee57b0552a4fc1b6a2e5eb8fb7c292~mv2.jpg/v1/fill/w_170,h_170,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/IMG_4246-Editar_edited.jpg'


const listaArticulos = [
    articuloEjemplo1,
    articuloEjemplo2,
    articuloEjemplo3
]
const listaVacia = JSON.parse(localStorage.getItem('listaArticulos'))
const usuariosVacio = JSON.parse(localStorage.getItem('listaUsuarios'))

usuariosVacio === null ? localStorage.setItem('listaUsuarios',JSON.stringify(listaUsuarios)) : false

if(listaVacia === null){
    localStorage.setItem('listaArticulos', JSON.stringify(listaArticulos))
}else{
    listaVacia.length === 0 ? localStorage.setItem('listaArticulos', JSON.stringify(listaArticulos)) : false
}




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
    const listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'))

    for(let i = 0; i < listaUsuarios.length ; i++){
        if( nombre === listaUsuarios[i].nombre && contraseña === listaUsuarios[i].contraseña ){
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