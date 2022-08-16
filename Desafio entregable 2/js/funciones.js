// Santiago Musso

class Productos{
    constructor(nombre,precio,categoria,cantidad,stock){
        this.nombre = nombre
        this.precio = precio
        this.categoria = categoria
        this.cantidad = cantidad
        this.stock = stock
    }
}

const palitos = [new Productos('Bombon',250,'palitos',0,10), new Productos('Limon',250,'palitos',0,10), new Productos('Frutilla',250,'palitos',0,10)]
const alfajores = [new Productos('Vainilla',300,'alfajores',0,30), new Productos('Chocolate',300,'alfajores',0,30)]
const bombones = [new Productos('Escocés',270,'bombones',0,30), new Productos('Frambuesa',270,'bombones',0,30)]
let carritoCompras = []
let menu = 1

const mostrarClase = (clase) => {
    let mensaje = ""

    for(let i = 0; i < clase.length; i++){
        mensaje += `(${i+1})${clase[i].nombre} `
    }
    return mensaje
}

const agregarCarrito = (claseProd) => {
    let claseProductos

    switch (claseProd){
        case 'palitos':
            claseProductos = palitos
            break
        case 'alfajores':
            claseProductos = alfajores
            break
        case 'bombones':
            claseProductos = bombones
            break
    }

    const producto = parseInt(prompt(`Ingrese ${mostrarClase(claseProductos)}`))
    const cantidad = parseInt(prompt("Ingrese cantidad: "))


    if (cantidad <= claseProductos[producto-1].stock){
        carritoCompras.push(claseProductos[producto-1])

        switch (claseProd){
            case 'palitos':
                palitos[producto-1].cantidad += cantidad
                palitos[producto-1].stock -= cantidad
                break
            case 'alfajores':
                claseProductos = alfajores
                alfajores[producto-1].cantidad += cantidad
                alfajores[producto-1].stock -= cantidad 
                break
            case 'bombones':
                claseProductos = bombones
                alfajores[producto-1].cantidad += cantidad
                alfajores[producto-1].stock -= cantidad  
                break
        }
    }else{
        alert("Ha introducido una cantidad superior al stock o inválida")
    }
}

const calcularTotal = () => {

    let importeTotal = 0

    for(let i = 0; i < carritoCompras.length; i++){
        importeTotal += (carritoCompras[i].cantidad * carritoCompras[i].precio)
    }

    return importeTotal
}

while(menu !== 0){
    menu = parseInt(prompt("Ingrese (1)Palitos, (2)Alfajores, (3)Bombones (4)Calcular total o (0)Salir"))
    switch (menu){
        case 0:
            menu = 0
            break
        case 1:
            agregarCarrito('palitos')
            break
        case 2:
            agregarCarrito('alfajores')
            break
        case 3:
            agregarCarrito('bombones')
            break
        case 4:
            alert(`El total de la compra es de : $ ${calcularTotal()}`)
            break
    }
}