// Santiago Musso

//********************************Clases***********************************
class Productos{
    constructor(nombre,precio,categoria,stock,codigo){
        this.nombre = nombre
        this.precio = precio
        this.categoria = categoria
        this.stock = stock
        this.codigo = codigo
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
const listaArticulos = [
    new Productos('Palito limon',250,'palitos',60),
    new Productos('Palito frambuesa',250,'palitos',60),
    new Productos('Palito frutilla',250,'palitos',60),
    new Productos('Palito split',250,'palitos',60)
]

const $divAdmin = document.getElementById('divAdmin')
const $div = document.getElementById('div')
const $tablaProductos = document.getElementById('tablaProductos')
const $divCliente = document.getElementById('divCliente')
const $botonSalir = document.createElement('button')
const nombreUsuario = document.getElementById('usuario')
const contraseñaUsuario = document.getElementById('contraseña')

let codigoArticulo = 0

//******************************* Funciones ********************************


// Borra la interfaz
const borrarInterfaz = () => {
    $div.className = ''
    $divCliente.className = 'oculto'
    while($divAdmin.firstChild) {
        $divAdmin.removeChild($divAdmin.firstChild);
    }
    while($tablaProductos.childElementCount - 1) {
        $tablaProductos.removeChild($tablaProductos.lastChild)
    }
    nombreUsuario.value = ''
    contraseñaUsuario.value = ''
}
$botonSalir.innerText = 'Salir'
$botonSalir.onclick = borrarInterfaz

// Valida que sea correcto el usuario y la contraseña con respecto a la lista
// de usuarios, ademas verifica que si es admin lo envía a la pagina admin

const validarUsuario = () => {
    for(let i = 0; i < listaUsuarios.length ; i++){
        if( nombreUsuario.value === listaUsuarios[i].nombre && contraseñaUsuario.value === listaUsuarios[i].contraseña ){
            if(listaUsuarios[i].admin){
                paginaAdmin()
                return false
            }else{
                return true                
            }
        }
    }
}
 //**********Renderiza pagina del admin para agregar articulos*************
const paginaAdmin = () => {
    const $agregarArticulo = document.createElement('button')
    const $borrarArticulo = document.createElement('button')
    const $mostrarArticulos = document.createElement('button')

    $div.className = 'oculto'

    $agregarArticulo.innerText = 'Agregar articulo'
    $borrarArticulo.innerText = 'Borrar articulo'
    $mostrarArticulos.innerText = 'Mostrar articulos'

    $agregarArticulo.onclick = agregarArticulo
    $borrarArticulo.onclick = borrarArticulo
    $mostrarArticulos.onclick = () => console.table(listaArticulos)

    $divAdmin.appendChild($agregarArticulo)
    $divAdmin.appendChild($borrarArticulo)
    $divAdmin.appendChild($mostrarArticulos)
    $divAdmin.appendChild($botonSalir)
}
 //**********************Agrega los articulos****************************
 //Crea un nuevo articulo y los encola en la lista
const agregarArticulo = () => {
    const nombreArticulo = prompt("Ingrese nombre del producto")
    const precioArticulo = parseInt(prompt("Ingrese precio del producto"))
    const categoriaArticulo = prompt("Ingrese la categoria del producto")
    const stockArticulo = parseInt(prompt("Ingrese el stock del producto"))

    listaArticulos.push(new Productos(nombreArticulo,precioArticulo,categoriaArticulo,stockArticulo,codigoArticulo))
    codigoArticulo++
}
 //**********************Borra el articulo deseado**********************
 //A traves del codigo del producto puede ir borrando los articulos pero 
 //no resta el codigoArticulo ya que sino modifica el orden del futuro
 //carrito ante cualquier falta de stock o eliminacion de producto
const borrarArticulo = () => {
    const codigoBorrar = parseInt(prompt("Ingrese el codigo del producto a borrar"))

    for(let i = 0; i < listaArticulos.length; i++){
        if(listaArticulos[i].codigo === codigoBorrar){
            const confirmacionBorrar = prompt(`Desea borrar el producto ${listaArticulos[i].nombre}? [SI/NO]`)

            if(confirmacionBorrar.toLowerCase() === 'si'){
                listaArticulos.splice(i,1)
            }else if(confirmacionBorrar.toLowerCase() === 'no'){
                borrarArticulo()
            }else{
                alert('No ha introducido un valor correcto')
            }
        }
    }   
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

//******************Renderiza la pagina del cliente para comprar*********************

const paginaCliente = (usuario) => {
    for(let i = 0; i < listaArticulos.length; i++){
        const $articulo = document.createElement('tr')
        const $nombreArticulo = document.createElement('td')
        const $precioArticulo = document.createElement('td')
        const $stockArticulo = document.createElement('td')
        const $cantidadArticulo = document.createElement('td')
        const cantidadArticulo = document.createElement('input')

        $nombreArticulo.innerText = listaArticulos[i].nombre
        $precioArticulo.innerText = listaArticulos[i].precio
        $stockArticulo.innerText = listaArticulos[i].stock
        cantidadArticulo.setAttribute('type','number')
        cantidadArticulo.className += ('cantidades')

        $cantidadArticulo.appendChild(cantidadArticulo)
        $articulo.append($nombreArticulo,$precioArticulo,$stockArticulo,$cantidadArticulo)
        $tablaProductos.appendChild($articulo)

        $div.className = 'oculto'
        $divCliente.className = ''
    }

    const $verCarrito = document.createElement('button')
    $verCarrito.innerText = 'Ver carrito'
    const $meterCarrito = document.createElement('button')
    $meterCarrito.innerText = 'Agregar al carrito'
    $divCliente.append($meterCarrito,$botonSalir,$verCarrito)

    // Crea un node list de todos los input number donde el usuario indica las cantidades
    // y los guarda en la propiedad .carrito del usuario que esta logeado
    // evita las cantidades negativas, vacias o nulas
    $meterCarrito.onclick = () => {
        const $listaCantidades = document.querySelectorAll('.cantidades')
        const listaCarrito = []

        for(let i = 0; i < listaUsuarios.length; i++){
            if(listaUsuarios[i].nombre === usuario){
                for(let j = 0; j < $listaCantidades.length; j++){
                    if($listaCantidades[j].value != '' && $listaCantidades[j].value != 0 && $listaCantidades[j].value > 0 ){
                        listaCarrito.push([listaArticulos[j],$listaCantidades[j].value])
                    }
                }
                listaUsuarios[i].carrito = listaCarrito
            }
        }
        alert('Se han agregado con exito los productos!')
    }

// Limpia la interfaz y muestra el carrito definitivo y su total

    $verCarrito.onclick = () => {
        borrarInterfaz()
        $div.className = 'oculto'
        $divCliente.className = ''
        $meterCarrito.remove()
        $botonSalir.remove()
        $verCarrito.remove()
        const $totalCarrito = document.createElement('span')
        let totalCarrito = 0

        for(let i = 0; i < listaUsuarios.length; i++){
            if(listaUsuarios[i].nombre === usuario){
                for(let j = 0; j < listaUsuarios[i].carrito.length; j++){
                    const $articulo = document.createElement('tr')
                    const $nombreArticulo = document.createElement('td')
                    const $precioArticulo = document.createElement('td')
                    const $stockArticulo = document.createElement('td')
                    const $cantidadArticulo = document.createElement('td')

                    $nombreArticulo.innerText = listaUsuarios[i].carrito[j][0].nombre
                    $precioArticulo.innerText = listaUsuarios[i].carrito[j][0].precio
                    $stockArticulo.innerText = listaUsuarios[i].carrito[j][0].stock
                    $cantidadArticulo.innerText = listaUsuarios[i].carrito[j][1]

                    
                    totalCarrito += (parseInt(listaUsuarios[i].carrito[j][0].precio) * parseInt(listaUsuarios[i].carrito[j][1]))

                    $articulo.append($nombreArticulo,$precioArticulo,$stockArticulo,$cantidadArticulo)
                    $tablaProductos.append($articulo)
                }
            }
        }
        $totalCarrito.innerHTML = `Total: $${totalCarrito}`
        $divCliente.append($totalCarrito)
    }
}