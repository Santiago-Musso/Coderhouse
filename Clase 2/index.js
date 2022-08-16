const MAYOR_EDAD = 17
const MENOR_EDAD = 13

let nombreUsuario = prompt("Cual es tu nombre?")
let edadUsuario = parseInt(prompt("Cual es tu edad?"))
let mensajeAlert

if (edadUsuario > MAYOR_EDAD){
    mensajeAlert = `Hola ${nombreUsuario}, tu eres mayor y tienes ${edadUsuario} años de edad`
}else if (edadUsuario < MENOR_EDAD){
    mensajeAlert = `Hola ${nombreUsuario}, tu eres niño/a y tienes ${edadUsuario} años de edad`
}else{
    mensajeAlert = `Hola ${nombreUsuario}, tu eres adolescente y tienes ${edadUsuario} años de edad`
}

alert(mensajeAlert)