import {mostrarAlerta, validar} from './funciones.js';
import {obtenerCliente, editarCliente} from './API.js';

(function(){

    //Campos del formulario
    //Nota: en el formulario(HTML), tenemos solo 4 inputs, nombre, empresa, email y telefono, pero tenemos otro input HIDDEN, ese es
    //para nuestro ID 
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const empresaInput = document.querySelector('#empresa');
    const telefonoInput = document.querySelector('#telefono');
    const idInput = document.querySelector('#id');

    document.addEventListener('DOMContentLoaded', async () => {
        const parametrosURL = new URLSearchParams(window.location.search); //nos sirve para navegar en la URL y poder usar un metodo
        //por ejemplo abajo, para obtener un ID
        console.log(parametrosURL);
        const idCliente = parseInt(parametrosURL.get('id')); //obtenemos el ID de esa PAGINA

        const cliente = await obtenerCliente(idCliente);

        console.log(cliente);

        mostrarCliente(cliente);

        //Submit al formulario
        const formulario = document.querySelector('#formulario');
        formulario.addEventListener('submit', validarCliente);
    })

    function mostrarCliente(cliente){
        const {nombre, empresa, email, telefono, id} = cliente;
        //Inyectame en el HTML esos valores
        nombreInput.value = nombre;
        emailInput.value = email;
        empresaInput.value = empresa;
        telefonoInput.value = telefono;
        idInput.value = id; //este input esta hidden, pero si nos vamos a la consola podemos ver que su valor es el ID correspondiente
    }

    function validarCliente(e){
        e.preventDefault();

        /* Copiamos el codigo que ya teniamos para reusarlo de el archivo nuevoCliente */
        //Aqui no podemos usar el objectLiteral porque tenemos nombreInput como lo son los valores,
        //entonces se setea un nuevo objeto
        const cliente = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: emailInput.value,
            //le agregamos el id
            id: parseInt(idInput.value)
        }

        if(validar(cliente)){ //si es true, que en este caso significa que al menos alguno de los campos esta VACIO, osea es 
            //true que este alguno de los campos vacios
            mostrarAlerta('Todos los campos son obligatorios');
            return;
        }

        //Si se pasa la validacion, reescribe el objeto
        editarCliente(cliente);

    }
})();