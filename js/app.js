import {obtenerClientes, eliminarCliente} from './API.js';

//Lo protegemos con un IFEE para que las variables no se resuelvan con las de los otros archivos
(function(){
    const listado = document.querySelector('#listado-clientes'); //seleccionando el t-body

    document.addEventListener('DOMContentLoaded', mostrarClientes);

    listado.addEventListener('click', confirmarEliminar); //ese se genera cuando se carga la pagina HTML, por eso es un addEventListener
    //sino seria un onclick
    //este ID de listado almacena UNA AREA GRANDE, lo ponemos asi para poner despues el IF de si contiene tal clase, asi se IDENTIFICA
    //DONDE SE DIO CLICK


    async function mostrarClientes(){
        const clientes = await obtenerClientes(); //podemos tener 1 o 100 clientes y va a tomar tiempo en descargarse todo el listado, por eso el promise de abajo sin el async await nos muestra un Promise Pending, ya con el async await funcionara el codigo correctamente
        console.log(clientes);

        clientes.forEach(cliente => {
            const {nombre, email, telefono, empresa, id } = cliente; //como podemos ver, en donde estaba el ID en el objeto?, nosotros no creamos ningun ID en el objeto, bueno Lo hace automaticamente json server
            const row = document.createElement('tr');
            
            row.innerHTML += `
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                <p class="text-sm leading-10 text-gray-700"> ${email} </p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                <p class="text-gray-700">${telefono}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                <p class="text-gray-600">${empresa}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a> 
            </td>
        `;
                        /* el codigo de arriba nos reenvia a la pagina de editar cliente y es dinamico al obtener su ID */

        listado.appendChild(row);
        });
    }

    function confirmarEliminar(e){

        //La clase de eliminar se agrega en el boton de acciones
        if(e.target.classList.contains('eliminar')){
            console.log('Diste click en eliminar');
            const clienteId = parseInt(e.target.dataset.cliente); //hay que convertirlo a numero
            console.log(clienteId);

            const confirmar = confirm('¿Deseas eliminar este registro?'); //confirm es nativo de JS, no hay un cuerpo de la funcion
            if(confirmar){
                eliminarCliente(clienteId);
            }
        }
    }
})();