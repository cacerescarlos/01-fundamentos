
const ip = 'http://192.168.1.11:4800';
const api_aviso = ip + "/api/mihogar/aviso";
const api_job = ip + "/api/mihogar/trabajador";
var token;
var trabajador;

/* === INI CARGAR TABLA AVISO   === */
function read_all_aviso() {
    fetch(api_aviso + '/read-all')
        .then(resp => resp.json())
        .then(cargar)        
}

//postular a empleo
function postular(params) {
    if (confirm('SEGURO POSTULAR ???')) { 
     //   console.log(params);
        
        var data = {
            aviso : params
        }       

  fetch(api_job + '/postular', {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
              'authorization': $("#token").val()
          }
      })
      .then(resp => resp.json())
      .then( console.log )
      .then( read_all_aviso )
      .catch(err => console.log)

  
    }
}

//postular a empleo
function eliminar() {
if (confirm('SEGURO ELIMINAR ???')) {
    
}
}



function cargar(aviso) {    
    ht = ""
    var fila = document.getElementById('avisos');
    var alert = "";
    console.log(aviso);
    let i = 0;
    for (const t of aviso.data) {
                alert = '<p>' +
                    t.interes_trabajo_aviso + ' * ' +
                    t.modalidad_trabajo_aviso + ' * ' +
                    t.dpto_trabajo_aviso + '</p>';
                    
        ht += '<tr>' +
            '<td>' +' ('+i +') '+ t.id + '</td>' +
            '<td>' + alert + '</td>' +
            '<td>' + t.empleador.nombre_empleador + '</td>' +
            "<td>"+
            "<button onclick='postular(" + JSON.stringify(t) + ")' >POSTULAR</button>" +
            "<button onclick='eliminar()' >ELIMINAR</button>"+
             "<br>"+
            t.fecha_creacion_aviso + "</td>" +
            '</tr>';
            i++;
    }
    fila.innerHTML = ht;
}

/* === FIN CARGAR AVISO === */

function login_trab() {
        let usu = {
            nombre_usuario: $("#user").val(),
            contrasena: $("#pass").val()
        }

        fetch(api_job + '/login', {
                method: 'POST',
                body: JSON.stringify(usu),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp.data);
                token = resp.token;
                $("#token").val(token);
                trabajador = resp.data;
            })
            .catch(err => console.log)
        }
