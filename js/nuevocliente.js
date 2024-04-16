//Hay que importar el archuivo de funciones
import {mostrarAlerta, validar} from './funciones.js';
import {nuevoCliente} from './API.js'; //importamos la funcion de nuevoCliente

(function(){
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarCliente);
    
    // const nombre = document.querySelector('#nombre');
    // const email = document.querySelector('#email');
    // const telefono = document.querySelector('#telefono');
    // const empresa = document.querySelector('#empresa');
            //El codigo de arriba y abajo es usando la funcion de leerValor
    // nombre.addEventListener('change', leerValor);
    // email.addEventListener('change', leerValor);
    // telefono.addEventListener('change', leerValor);
    // empresa.addEventListener('change', leerValor);
    // const cliente = {
    //     nombre : '',
    //     email : '',
    //     telefono : '',
    //     empresa : ''
    // }

    function validarCliente(e){
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        const cliente = {
            nombre,
            email,
            telefono,
            empresa
        }

        console.log(!Object.values(cliente).every(input => input !== '')); //vamos a leer los valores del objeto de cliente con every que every lo que hace es
        //revisar una condicion en todos los elementos donde el input no sea vacio, esto nos arrojara un true donde 
        //ALGUNO/AL MENOS UNO DE LOS CAMPOS ESTE VACIO
        if(validar(cliente)){ //si es true, que en este caso significa que al menos alguno de los campos esta VACIO, osea es 
            //true que este alguno de los campos vacios
            mostrarAlerta('Todos los campos son obligatorios');
            return;
        }

        nuevoCliente(cliente);

    }

    // function leerValor(e){
    //     e.preventDefault();
    //     cliente[e.target.name] = e.target.value;
    //     console.log(cliente);
    // }

    //Movemos esta funcion de abajo a funciones
    // function validar(obj){
    //     return !Object.values(obj).every(input => input !== ''); //nos retorna un true o false, true si falta algun campos, false
    //     //si ningun campo esta vacio
    // }
})(); //Ponemos un IFEE para que estas funciones no se salgan de este archivo y queden locales estas variables y funciones