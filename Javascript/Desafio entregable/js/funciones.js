// Codigo Santiago Musso

function ejecutarCalculadora(){
    let ingresoUsuario = "0"
    
    while( ingresoUsuario.toLowerCase() !== 'esc'){
        ingresoUsuario = prompt("Ingrese que operacion desea ejecutar: (S)umar (R)estar (M)ultiplicar (D)ividir (ESC)Salir")

        switch (ingresoUsuario.toLowerCase()){
            case "s": 
            calculador("sumar")
            break

            case "r": 
            calculador("restar")
            break

            case "m": 
            calculador("multiplicar")
            break

            case "d": 
            calculador("dividir")
            break
        }
    }
}

const calculador = (operacion) => {
    do{
        numero1 = parseFloat(prompt(`Ingrese el primer número a ${operacion}: `))
        numero2 = parseFloat(prompt(`Ingrese el segundo número a ${operacion}: `))
        if (isNaN(numero1) || isNaN(numero2)){
            alert("Ingrese correctamente los valores")
        }
    }while(isNaN(numero1) || isNaN(numero2))

    if (operacion === "sumar"){
        alert(`El resultado de la operacion es ${sumar(numero1,numero2)}`)
    }else if (operacion === "restar"){
        alert(`El resultado de la operacion es ${restar(numero1,numero2)}`)
    }else if (operacion === "multiplicar"){
        alert(`El resultado de la operacion es ${multiplicar(numero1,numero2)}`)
    }else if (operacion === "dividir"){
        if(numero2 !== 0){
            alert(`El resultado de la operacion es ${dividir(numero1,numero2)}`)
        }else{
            numero1 = NaN
            alert(`No se puede dividir por 0`)
        }
    }
}

const sumar = (numero1,numero2) => numero1 + numero2
const restar = (numero1,numero2) => numero1 - numero2
const multiplicar = (numero1,numero2) => numero1 * numero2
const dividir = (numero1,numero2) => numero1 / numero2


ejecutarCalculadora()