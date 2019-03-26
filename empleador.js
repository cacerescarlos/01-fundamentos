const api = 'http://192.168.0.13:4800/api/mihogar/empleador';
const api_aviso = 'http://192.168.0.13:4800/api/mihogar/aviso';
const api_config = 'http://192.168.0.13:4800/api/dashboard';
var token;
var empleador;
// CREATE EMPLEADOR
function postData() {
    let data = {
        nombre_empleador: 'CARLOS2',
        apellidos_empleador: 'CACERES2',
        ci_empleador: '9041531',
        ci_expedido_empleador: 'SCZ',
        fecha_nacimiento_empleador: '27-09-1993',
        tel_celular_empleador: '69056651',
        tel_fijo_empleador: '',
        ciudad_residencia_empleador: 'Santa Cruz',
        direccion_empleador: 'Av Virgen de Cotoca',
        //alert_empleador : [trabajdo, modalidad, ciudad]   
    };

    return fetch(api + '/create', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

}

// LOGIN EMPLEADOR 
function login_empleador(user, pass) {

    let usuario = {
        nombre_usuario: user,
        contrasena: pass
    };

    fetch(api + '/login', {
            method: 'POST', // PUT
            body: JSON.stringify(usuario), // data
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp.data);
            token = resp.token;
            $("#token").val(token);
            empleador = resp.data;
        })
        .catch(error => {
            console.log('Error en la petición');
            console.log(error);
        });

}

// READ-ALL EMPLEADORES
function read_empleador() {
    fetch(api + '/read-all')
        .then(resp => resp.json())
        .then(console.log);
}

// CREATE AND READ-ALL
function create_empleador() {
    postData()
        .then(resp => resp.json())
        .then(console.log)
        .then(read_empleador)
        .catch(error => {
            console.log('ERROR EN PROMESA');
            console.log(error);
        });


}

function add_alert(trabajo, modalidad, ciudad) {
    let data = {
        alert_empleador: {
            interes_trabajo_empleador: trabajo,
            modalidad_trabajo_empleador: modalidad ? modalidad : '',
            dpto_trabajo_empleador: ciudad ? ciudad : '',
            tipo_alert_empleador: 'BUSQUEDA',
        }
    };

    /* // si no tiene nada
    if (empleador.alert_empleador.length == 0) {
        empleador.alert_empleador.push(item_alert);
        console.log(empleador);
        alert('SE AGREGO EL PRIMERO');
        return;
    }


    if (empleador.alert_empleador.length > 4) {
        alert('MAXIMO DE ALERTAS');
        return;
    }

    //verificacion de si el item existe
    //let value = 
    var index = empleador.alert_empleador.find(i => (i.interes_trabajo_empleador == item_alert.interes_trabajo_empleador && i.modalidad_trabajo_empleador == item_alert.modalidad_trabajo_empleador && i.dpto_trabajo_empleador == item_alert.dpto_trabajo_empleador));

    if (index) {
        alert(' ya existe criterio');
        return;
    }


    empleador.alert_empleador.push(item_alert);
    console.log(empleador);

*/
    //console.log(alert_empleador)

    fetch(api + '/update-filtro', {
            method: 'PUT', // POST
            body: JSON.stringify(data), // data
            headers: {
                'Content-Type': 'application/json',
                'authorization': $("#token").val()
            }
        })
        .then(resp => resp.json())
        .then(console.log)
        .catch(error => {
            console.log('Error en la petición');
            console.log(error);
        });

}

fetch(api_config + '/trabajo/read-all')
    .then(resp => resp.json())
    .then(data => console.log(data.data))

fetch(api_config + '/modalidad/read-all')
    .then(resp => resp.json())
    .then(resp => console.log(resp.data))

fetch(api_config + '/ciudad/read-all')
    .then(resp => resp.json())
    .then(resp => console.log(resp.data))








// ==================================================================
// AVISO
function readAll_aviso() {
    console.log('leer-aviso');
    fetch(api_aviso + '/read-all')
        .then(resp => resp.json())
        .then(console.log)
        .catch(error => console.log(error))
}

function create_aviso() {
    let aviso = {
        interes_trabajo_aviso: $("#interes_trabajo_aviso").val(),
        modalidad_trabajo_aviso: $("#modalidad_trabajo_aviso").val(),
        dpto_trabajo_aviso: $("#dpto_trabajo_aviso").val(),
        sueldo_aviso: $("#sueldo_aviso").val(),
        descripcion_trabajo_aviso: $("#descripcion_trabajo_aviso").val(),
        pago_aviso: $("#pago_aviso").val()
    }

    //  console.log(aviso);
    // console.log(token);

    fetch(api_aviso + '/create', {
            method: 'POST',
            body: JSON.stringify(aviso),
            headers: {
                'Content-Type': 'application/json',
                'authorization': $("#token").val()
            }
        })
        .then(resp => resp.json())
        .then(resp => console.log)
        .catch(error => console.log(error));


}
// ==================================================================