"use strict";
var Manejadora = /** @class */ (function () {
    function Manejadora() {
    }
    Manejadora.prototype.handleEvent = function (e) {
        var lista;
        var proximoId;
        var agregar = document.getElementById('btnAgregar');
        agregar.addEventListener("click", function () {
            alta();
        });
        function alta() {
            var nuevo = agregarDatos();
            if (nuevo) {
                proximoId = Number(obtenerId());
                lista = obtenerLista();
                lista.push(nuevo);
                console.log(lista);
                proximoId++;
                guardarDatos();
                limpiarFormulario();
            }
            else {
                alert("error");
            }
        }
        function agregarDatos() {
            var nombre = document.getElementById('inputNombre');
            var apellido = document.getElementById('inputApellido');
            var edad = document.getElementById('inputEdad');
            var sexo = document.getElementsByName('inputSexo');
            var esMasculino = sexo[1].checked;
            var nuevo;
            proximoId = obtenerId();
            if (esMasculino) {
                nuevo = new Cliente(proximoId, nombre.value, apellido.value, Number(edad.value), Sexo.Masculino);
            }
            else {
                nuevo = new Cliente(proximoId, nombre.value, apellido.value, Number(edad.value), Sexo.Femenino);
            }
            return nuevo;
        }
        function obtenerId() {
            var aux = localStorage.getItem('nextId');
            return aux ? JSON.parse(aux) : 0;
        }
        function obtenerLista() {
            var lista = localStorage.getItem('clientes');
            return lista ? JSON.parse(lista) : [];
        }
        function guardarDatos() {
            localStorage.setItem('clientes', JSON.stringify(lista));
            localStorage.setItem('nextId', proximoId);
        }
    };
    return Manejadora;
}());
window.addEventListener("load", new Manejadora);
