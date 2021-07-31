const styleBtnEliminar = "background-color: red; color: white;"+
"border:none; border-radius:5px; padding:5px; margin:1px;";

function mostrar() {
    let lista = JSON.parse(localStorage.getItem('clientes') ?? "[]");
    let divTabla = <HTMLElement>document.getElementById('divTabla');
    divTabla.innerHTML = "";
    divTabla.appendChild(crearTabla(lista));
}

function mostrarSeleccionados() {
    let lista = filtrarPorEleccion();
    let divTabla = <HTMLElement>document.getElementById('divTabla');
    divTabla.innerHTML = "";
    divTabla.appendChild(crearTabla(lista));
}

function filtrarPorEleccion() {
    let select = <HTMLSelectElement>document.getElementById('selectSexo');
    let lista = JSON.parse(localStorage.getItem('clientes') ?? "[]");
    let listaF = Array();
    let listaM = Array();
    let listaSeleccionada = Array();
    listaF = lista.filter((item:any)=>item.sexo=="0");
    listaM = lista.filter((item:any)=>item.sexo=="1");
    select.value == "Femenino"
        ? listaSeleccionada = listaF
        : listaSeleccionada = listaM;
    return listaSeleccionada;
} 


function checksSeleccionados() {
    let auxCheck = <any>document.getElementsByName("check");
    let idSeleccionados = Array();
    auxCheck.forEach((element:any) => {
        if(element.checked) {
            idSeleccionados.push(element.id);
        }
    });
    return idSeleccionados;
}

function crearTabla(lista: any) {
    let tabla = <HTMLTableElement>document.createElement('table');
    if (lista.length > 0) {
       tabla.appendChild(cabecera(lista[0]));
        tabla.appendChild(cuerpo(lista));
    }
    return tabla;
}

function cabecera(item:any){
    let idSeleccionados = checksSeleccionados();
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    let listaKey = Object.keys(item);
    listaKey.forEach(function (key: any) {
        idSeleccionados.forEach((e:any) => {
            if(key == e) {
                const th = document.createElement('th');
                let txt = document.createTextNode(key[0].toUpperCase()+key.slice(1));
                th.appendChild(txt);
                tr.appendChild(th);
            }
            tr.style.background = "rgb(146, 216, 221)";
        });
    });
    thead.appendChild(tr);
    return thead;
}

function cuerpo(lista: any) {
    let idSeleccionados = checksSeleccionados();
    const tbody = document.createElement('tbody');
    let listaKey = Object.keys(lista[0]);
    lista.forEach(function (element: any) {
        const tr = document.createElement('tr');
        listaKey.forEach(function (key: any) {
            idSeleccionados.forEach((e:any) => {
                if(key == e) {
                    
                    const td = document.createElement('td');
                    let txt = document.createTextNode(element[key]);
                    if(element[key]=="0"){                       
                        txt = document.createTextNode("Femenino");
                   } 
                   if(element[key]=="1"){                       
                    txt = document.createTextNode("Masculino");
               }
                    td.appendChild(txt);
                    tr.appendChild(td);
                }
            });
        });
        if (element.hasOwnProperty('id')) {
            tr.setAttribute('data-id', element['id']);
        }
        agregarManejadorTr(tr);
        tbody.appendChild(tr);
    });
    return tbody;
}

function agregarManejadorTr(tr:any) {
    if (tr) {
        tr.addEventListener('click', (e:any) => {
            let idSeleccionada = e.target.parentNode.dataset.id;
            let lista = JSON.parse(localStorage.getItem('clientes') ?? "[]");
            for (let i = 0; i < lista.length; i++) {//recorro la lista con un FOR para saber la posicion de la persona
                if (lista[i].id == idSeleccionada) {
                    cargarDatosAlFormulario(lista[i]);
                }
            }   
        });
    }
} 

function cargarDatosAlFormulario(aux:any) {    
    let nombre = <HTMLInputElement>document.getElementById('inputNombre');
    let apellido = <HTMLInputElement>document.getElementById('inputApellido');
    let edad = <HTMLInputElement>document.getElementById('inputEdad');
    let id = <HTMLInputElement>document.getElementById('inputId');
    let sexo = <any>document.getElementsByName('inputSexo');
    nombre.value = aux.nombre;
    apellido.value = aux.apellido;
    edad.value = aux.edad;
    id.value = aux.id;
    if(aux.sexo == "0"){
        sexo[0].checked=true;
    }else {
        sexo[1].checked=true;
    }
}

function eliminar() {
    let lista = JSON.parse(localStorage.getItem('clientes') ?? "[]");
    let id = <HTMLInputElement>document.getElementById('inputId');
    for (let i = 0; i < lista.length; i++) {//recorro la lista con un FOR para saber la posicion de la persona
        if (lista[i].id == id.value) {
            lista.splice(i,1);
        }
    }
    localStorage.setItem('clientes', JSON.stringify(lista));
    console.log("ok");
    mostrar();  
    limpiarFormulario();
}

function filtrarPorSexo(){
    let lista = JSON.parse(localStorage.getItem('clientes') ?? "[]");
    let select = <HTMLSelectElement>document.getElementById('selectSexo');
    let promedio = <HTMLInputElement>document.getElementById('inputPromedio');
    let listaFemenino = Array();
    let listaMasculino = Array();
    let listaSeleccionado = Array();
    listaFemenino = lista.filter((item:any)=>item.sexo=="0");
    listaMasculino = lista.filter((item:any)=>item.sexo=="1");
    console.log(listaFemenino);
    select.value == "Femenino"
        ? listaSeleccionado = listaFemenino
        : listaSeleccionado = listaMasculino;
        let totalPrecios: number = listaSeleccionado.reduce(function (total: number, valor: any) {
            return total + valor.edad;
        }, 0);
    promedio.value = String(totalPrecios / listaSeleccionado.length);
}

function limpiarLocalStorage(){
    localStorage.clear();
    mostrar();
    limpiarFormulario();
}

function limpiarFormulario(){
    let nombre = <HTMLInputElement>document.getElementById('inputNombre');
    let apellido = <HTMLInputElement>document.getElementById('inputApellido');
    let edad = <HTMLInputElement>document.getElementById('inputEdad');
    let id = <HTMLInputElement>document.getElementById('inputId');
    nombre.value="";
    apellido.value="";
    edad.value = "";
    id.value = "";
}

function calcularPromedio() {
    let lista = JSON.parse(localStorage.getItem('clientes') ?? "[]");
    let promedio = <HTMLInputElement>document.getElementById('inputPromedio');
    let listaAux = lista.reduce(function (total: number, valor: any) {
        return total + valor.edad;
    }, 0);
    promedio.value = String(listaAux / lista.length);
}
