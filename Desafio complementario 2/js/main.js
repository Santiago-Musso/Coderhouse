const $botonLogin = document.getElementById('aceptar')
const $botonRegistrarUsuario = document.getElementById('altaUsuario')

$botonLogin.onclick = () => {
    if(validarUsuario()){
        paginaCliente(nombreUsuario.value)
    }else{
        alert('Ha introducido un usuario o contraseña incorrectos o es un ADMINISTRADOR')
    }
}
$botonRegistrarUsuario.onclick = () => {
    if(nombreUsuario.value !== '' && contraseñaUsuario.value !== ''){
        altaUsuario()
    }
}


