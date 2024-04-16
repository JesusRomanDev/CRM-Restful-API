const url = 'http://localhost:4000/clientes';

//Cuando se crea un nuevo cliente
//Esta funcion de abajo se va a comunicar con nuevocliente.js en la parte donde si se pasa la validacion, pasandole el objeto de cliente
export const nuevoCliente = async (cliente)=>{
    console.log(cliente);
    try {
        //Siempre que vayamos a crear un nuevo registro vamos a utilizar el metodo de POST
        await fetch(url, { //esto es un objeto de configuracion
            method: 'POST',
            body: JSON.stringify(cliente),//como estamos enviando datos al servidor(en este caso un nuevocliente) se agrega un body, es el contenido de esta peticion, SE PUEDE ENVIAR ESTE BODY COMO STRING O JSON puro, lo convertimos a STRING y lo mandamos a la URL como metodo POST
            headers: {//los headers son que tipo de dato estamos enviando, varia dependiendo lo que estemos enviando al servidor
                'Content-Type': 'application/json'
            }
        });
        window.location.href = 'index.html'; //si se llega a esta linea de codigo significa que se inserto correctamente el cliente
        //podemos visualizarlo en el db.json de la pagina o nuestro archivo, tambien abajo en la terminal sale que de hicimos un POST
    } catch (error) {
        console.log(error);
    }
}

//Obtiene todos los clientes para el index
export const obtenerClientes = async() => {
    try {
        const resultado = await fetch(url);
        const clientes = await resultado.json();
        return clientes;
    } catch (error) {
        console.log(error);
    }
}

//Elimina un Cliente
export const eliminarCliente = async id => {
    try {
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
        //ese ${id} si escribimos en el navegador el ID que tenemos en el server, nos enviara a ese objeto, es por eso que se puso ese codigo por ejemplo http://localhost:4000/clientes/26 nos arroja el objeto {
        //     "nombre": "Juan NUEVO!",
        //     "email": "correo2@correo.com",
        //     "telefono": "12",
        //     "empresa": "12212",
        //     "id": 26
        //   }
    } catch (error) {
        console.log(error);
    }
}

//Obtiene un cliente por su ID

export const obtenerCliente = async id =>{ //obtenemos el ID
    try {
        const resultado = await fetch(`${url}/${id}`);
        const cliente = await resultado.json(); //todo el contenido de ese ID, damelo en un JSON, todas las propiedades de SOLO ESE ID
        console.log(cliente);
        return cliente; //retorname el cliente a esta funcion
    } catch (error) {
        console.log(error);
    }
}

//Actualiza un registro
export const editarCliente = async cliente =>{
    console.log(cliente);
    try {
        await fetch(`${url}/${cliente.id}`, {
            method: 'PUT', //2 formas de actualizar registros, PATCH Y PUT, PATCH ES PARCIAL, PUT ES COMPLETO
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.href = 'index.html';
    } catch (error) {
        console.log(error);
    }
}