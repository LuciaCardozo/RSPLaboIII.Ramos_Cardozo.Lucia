"use strict";
var styleBtnEliminar = "background-color: red; color: white;" +
    "border:none; border-radius:5px; padding:5px; margin:1px;";
function mostrar() {
    var _a;
    var lista = JSON.parse((_a = localStorage.getItem('clientes')) !== null && _a !== void 0 ? _a : "[]");
    var divTabla = document.getElementById('divTabla');
    divTabla.innerHTML = "";
    divTabla.appendChild(crearTabla(lista));
}
function mostrarSeleccionados() {
    var lista = filtrarPorEleccion();
    var divTabla = document.getElementById('divTabla');
    divTabla.innerHTML = "";
    divTabla.appendChild(crearTabla(lista));
}
function filtrarPorEleccion() {
    var _a;
    var select = document.getElementById('selectSexo');
    var lista = JSON.parse((_a = localStorage.getItem('clientes')) !== null && _a !== void 0 ? _a : "[]");
    var listaF = Array();
    var listaM = Array();
    var listaSeleccionada = Array();
    listaF = lista.filter(function (item) { return item.sexo == "0"; });
    listaM = lista.filter(function (item) { return item.sexo == "1"; });
    select.value == "Femenino"
        ? listaSeleccionada = listaF
        : listaSeleccionada = listaM;
    return listaSeleccionada;
}
function checksSeleccionados() {
    var auxCheck = document.getElementsByName("check");
    var idSeleccionados = Array();
    auxCheck.forEach(function (element) {
        if (element.checked) {
            idSeleccionados.push(element.id);
        }
    });
    return idSeleccionados;
}
function crearTabla(lista) {
    var tabla = document.createElement('table');
    if (lista.length > 0) {
        tabla.appendChild(cabecera(lista[0]));
        tabla.appendChild(cuerpo(lista));
    }
    return tabla;
}
function cabecera(item) {
    var idSeleccionados = checksSeleccionados();
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    var listaKey = Object.keys(item);
    listaKey.forEach(function (key) {
        idSeleccionados.forEach(function (e) {
            if (key == e) {
                var th = document.createElement('th');
                var txt = document.createTextNode(key[0].toUpperCase() + key.slice(1));
                th.appendChild(txt);
                tr.appendChild(th);
            }
            tr.style.background = "rgb(146, 216, 221)";
        });
    });
    thead.appendChild(tr);
    return thead;
}
function cuerpo(lista) {
    var idSeleccionados = checksSeleccionados();
    var tbody = document.createElement('tbody');
    var listaKey = Object.keys(lista[0]);
    lista.forEach(function (element) {
        var tr = document.createElement('tr');
        listaKey.forEach(function (key) {
            idSeleccionados.forEach(function (e) {
                if (key == e) {
                    var td = document.createElement('td');
                    var txt = document.createTextNode(element[key]);
                    if (element[key] == "0" && key != "id") {
                        txt = document.createTextNode("Femenino");
                    }
                    if (element[key] == "1" && key != "id") {
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
function agregarManejadorTr(tr) {
    if (tr) {
        tr.addEventListener('click', function (e) {
            var _a;
            var idSeleccionada = e.target.parentNode.dataset.id;
            var lista = JSON.parse((_a = localStorage.getItem('clientes')) !== null && _a !== void 0 ? _a : "[]");
            for (var i = 0; i < lista.length; i++) { //recorro la lista con un FOR para saber la posicion de la persona
                if (lista[i].id == idSeleccionada) {
                    cargarDatosAlFormulario(lista[i]);
                }
            }
        });
    }
}
function cargarDatosAlFormulario(aux) {
    var nombre = document.getElementById('inputNombre');
    var apellido = document.getElementById('inputApellido');
    var edad = document.getElementById('inputEdad');
    var id = document.getElementById('inputId');
    var sexo = document.getElementsByName('inputSexo');
    nombre.value = aux.nombre;
    apellido.value = aux.apellido;
    edad.value = aux.edad;
    id.value = aux.id;
    if (aux.sexo == "0") {
        sexo[0].checked = true;
    }
    else {
        sexo[1].checked = true;
    }
}
function eliminar() {
    var _a;
    var lista = JSON.parse((_a = localStorage.getItem('clientes')) !== null && _a !== void 0 ? _a : "[]");
    var id = document.getElementById('inputId');
    for (var i = 0; i < lista.length; i++) { //recorro la lista con un FOR para saber la posicion de la persona
        if (lista[i].id == id.value) {
            lista.splice(i, 1);
        }
    }
    localStorage.setItem('clientes', JSON.stringify(lista));
    console.log("ok");
    mostrar();
    limpiarFormulario();
}
function filtrarPorSexo() {
    var _a;
    var lista = JSON.parse((_a = localStorage.getItem('clientes')) !== null && _a !== void 0 ? _a : "[]");
    var select = document.getElementById('selectSexo');
    var promedio = document.getElementById('inputPromedio');
    var listaFemenino = Array();
    var listaMasculino = Array();
    var listaSeleccionado = Array();
    listaFemenino = lista.filter(function (item) { return item.sexo == "0"; });
    listaMasculino = lista.filter(function (item) { return item.sexo == "1"; });
    console.log(listaFemenino);
    select.value == "Femenino"
        ? listaSeleccionado = listaFemenino
        : listaSeleccionado = listaMasculino;
    var totalPrecios = listaSeleccionado.reduce(function (total, valor) {
        return total + valor.edad;
    }, 0);
    promedio.value = String(totalPrecios / listaSeleccionado.length);
}
function limpiarLocalStorage() {
    localStorage.clear();
    mostrar();
    limpiarFormulario();
}
function limpiarFormulario() {
    var nombre = document.getElementById('inputNombre');
    var apellido = document.getElementById('inputApellido');
    var edad = document.getElementById('inputEdad');
    var id = document.getElementById('inputId');
    nombre.value = "";
    apellido.value = "";
    edad.value = "";
    id.value = "";
}
function calcularPromedio() {
    var _a;
    var lista = JSON.parse((_a = localStorage.getItem('clientes')) !== null && _a !== void 0 ? _a : "[]");
    var promedio = document.getElementById('inputPromedio');
    var listaAux = lista.reduce(function (total, valor) {
        return total + valor.edad;
    }, 0);
    promedio.value = String(listaAux / lista.length);
}
