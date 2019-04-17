
const ip = 'http://192.168.1.11:4800';
var api = ip + '/api/mihogar/trabajador';
var token;
var trabajador;
function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        AdelaVilla.foto_trabajador = reader.result; //bs64 img para mandar server
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
    var ht="";
    var fila = document.getElementById('fila');
    //var fila = $("#fila").html();


    for (const t of traba.data) {
        // alertas
        var alert="";
        if (t.alert_trabajador.length>0) {
            for (const item of t.alert_trabajador) {
                alert +='<p>'+
                item.interes_trabajo_trabajador +' * '+ 
                item.modalidad_trabajo_trabajador + ' * ' +
                item.dpto_trabajo_trabajador +
    "  <button onclick='destroy_alert(" + JSON.stringify(item) + ")' > X </button>" + '</p>';
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
    console.log(ht );
    // fila.innerHTML = ht;
    $("#fila").html(ht +"" );
}

function destroy_alert(params) {
    console.log(params);
    let data = {
        alert_trabajador: params
    }
     if (confirm('Esta seguro ??')) {
         /* === INI ELIMINAR    === */
         fetch(api+'/destroy-alert', {
                 method: 'DELETE', // POST
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
         /* === FIN ELIMINAR  === */

     }
     
}
function destroy(code) {        
    console.log(code);
    $("#code").val(code);
    if (confirm('Esta seguro ??')) {
        /* === INI ELIMINAR    === */
              fetch( ip + '/api/dashboard/trabajador/destroy-perfil/' + code, {
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


        /* === INI CREAR USUARIO TRABAJADOR   === */
        
function create(){
     
    fetch(api+'/create',{
        method:'POST',
        body:JSON.stringify(AdelaVilla),
        headers: {
            'Content-Type': 'application/json'
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


        /* === FIN CREAR USUARIO TRABAJADOR === */

        /* === INI SCHEMA TRABAJADOR   === */
var AdelaVilla = {
    "avisos_vistos_trabajador": [],
    "habilidades_trabajador": [],
    "postulaciones_trabajador": [],
    "sugeridos_trabajador": [],    
    "tipo_usuario": "TRABAJADOR",    
    "nombre_trabajador": "Mark",
    "apellidos_trabajador": "Zuckerberg",
    "ci_trabajador": "3174243",
    "ci_exped_trabajador": "Santa Cruz",
    "fecha_nacimiento_trabajador": "1990-08-07",
    "pais_nacimiento_trabajador": "",
    "ciudad_nacimiento_trabajador": "Tarija",
    "tel_celular_trabajador": "70979210",
    "tel_fijo_trabajador": "",
    "ciudad_residencia_trabajador": "Santa Cruz",
    "direccion_trabajador": "Quior calle 11 norte casa #52",
    "email_trabajador": "",
    "facebook_trabajador": "",
    "foto_trabajador": "",    
    "pretension_trabajador": 2000,
    "experiencias_trabajador": [{
        "verificado_experiencia": false,        
        "aspecto_mejorar_experiencia": "",
        "cargo_experiencia": "Domestico",
        "ciudad_experiencia": "",
        "fecha_retiro_experiencia": "2018-10",
        "lugar_experiencia": "",
        "motivo_retiro_experiencia": "Conclusion de Contrato",
        "nombre_jefe_experiencia": "Romero Torrico",
        "nota_honesto_experiencia": null,
        "nota_limpio_experiencia": null,
        "nota_recomendacion_experiencia": null,
        "nota_responsable_experiencia": null,
        "tel_jefe_experiencia": "70017587",
        "tiempo_anios_experiencia": 1,
        "tiempo_meses_experiencia": 6,
        "tipo_trabajo_experiencia": "",
        "verif_cargo_experiencia": "",
        "verif_motivo_retiro_experiencia": "",
        "verif_nombre_informante_experiencia": "",
        "verif_tiempo_anios_experiencia": "",
        "verif_tiempo_meses_experiencia": ""
    }],
    "educacion_trabajador": [],    
    "origen_trabajador": "mihogar",    
    "contrasena_trabajador": "",  
    "alert_trabajador": [
        {
            "interes_trabajo_trabajador": "Trabajo de Hogar",
            "modalidad_trabajo_trabajador": "Cama adentro",
            "dpto_trabajo_trabajador": "Santa Cruz",
            "tipo_alert_trabajador": "INFO"
       },
            {
            "interes_trabajo_trabajador": "Trabajo de Hogar",
            "modalidad_trabajo_trabajador": "",
            "dpto_trabajo_trabajador": "La Paz",
            "tipo_alert_trabajador": "INFO"
       }
    ] 
};
        /* === FIN SCHEMA TRABAJADOR === */