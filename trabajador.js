

var api = 'http://192.168.0.13:4800/api/mihogar/trabajador';
var token;
var trabajador;
function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        console.log('RESULT', reader.result)
        $('#image').attr('src', reader.result)        
    }
    reader.readAsDataURL(file);
}

function read_all() {
    fetch(api+'/read-all-cuenta')
    .then(resp=> resp.json())
    .then( cargar )
}

function cargar(traba) {
    console.log(traba);
    ht=""
    var fila = document.getElementById('fila');


    for (const t of traba.data) {
        // alertas
        alert="";
        if (t.alert_trabajador.length>0) {
            for (const item of t.alert_trabajador) {
                alert +='<p>'+
                item.interes_trabajo_trabajador +' * '+ 
                item.modalidad_trabajo_trabajador + ' * ' +
                item.dpto_trabajo_trabajador + '</p>';
            }
        }

          ht += '<tr>' +              
              '<td><img src="' + api + '/getImage/' + t.foto_trabajador + '"></td>' +
              '<td>' + t.nombre_trabajador + '</td>' +
              '<td>' + alert + '</td>' +
              '<td>' + t.postulaciones_trabajador.length + '</td>' +
              '<td>' + t.nombre_usuario_trabajador + '</td>' +
              '<td>' + t.ci_trabajador + '</td>' +
              '<td>' 
              //+'<button onclick="destroy(' + JSON.stringify(t.id) + ')" > X </button>'
              +"<button onclick='destroy(" + JSON.stringify(t.id) + ")' > X </button>"
              + '</td>' +
              '</tr>';
    }
    fila.innerHTML = ht;
}

function destroy(code) {        
    console.log(code);
    $("#code").val(code);
    if (confirm('Esta seguro ??')) {
        /* === INI ELIMINAR    === */
              fetch(api + '/destroy-perfil/'+code, {
                      method: 'DELETE', // POST
                      //body: JSON.stringify(data), // data
                      headers: {
                          'Content-Type': 'application/json',
                        //  'authorization': $("#token").val()
                      }
                  })
                  .then(resp => resp.json())
                  .then(console.log)
                  .then(read_all)
                  .catch(error => {
                      console.log('Error en la petición');
                      console.log(error);
                  });
        /* === FIN ELIMINAR  === */

    }
}

/*
nombre_usuario
contrasena

/api/mihogar / trabajador / login

POST
 */
function login() {
    let usu = {
        nombre_usuario: $("#user").val(),
        contrasena: $("#pass").val()
    }
   
fetch(api+'/login',{
    method:'POST',
    body: JSON.stringify(usu),
    headers:{
         'Content-Type': 'application/json'
    }
})
.then(resp => resp.json())
.then( resp => {
    console.log(resp.data);
    token = resp.token;
    $("#token").val(token);
    trabajador = resp.data;
} )
.catch(err => console.log )
 
console.log(usu);

}


// AGREGAR ALERTA
function add_alert(trabajo, modalidad, ciudad) {
    let data = {
        alert_trabajador: {
            interes_trabajo_trabajador: trabajo,
            modalidad_trabajo_trabajador: modalidad ? modalidad : '',
            dpto_trabajo_trabajador: ciudad ? ciudad : '',
            tipo_alert_trabajador: 'BUSQUEDA',
        }
    };

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
            .then(read_all)
            .catch(error => {
                console.log('Error en la petición');
                console.log(error);
            });

        }