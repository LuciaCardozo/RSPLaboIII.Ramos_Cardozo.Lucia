class Manejadora implements EventListenerObject {
    public handleEvent(e: Event): void {
        let lista: any;
        let proximoId: any;
        let agregar = <HTMLElement>document.getElementById('btnAgregar');
        agregar.addEventListener("click", () => {
            alta();
        });
        
        function alta() {
            let nuevo = agregarDatos();
            if (nuevo) {
                proximoId = Number(obtenerId());
                lista = obtenerLista();
                lista.push(nuevo);
                console.log(lista);
                proximoId++;
                guardarDatos();
                limpiarFormulario();
            } else {
                alert("error");
            }
        }

        function agregarDatos() {
            let nombre = <HTMLInputElement>document.getElementById('inputNombre');
            let apellido = <HTMLInputElement>document.getElementById('inputApellido');
            let edad = <HTMLInputElement>document.getElementById('inputEdad');
            let sexo = <any>document.getElementsByName('inputSexo');
            let esMasculino = sexo[1].checked;
            let nuevo;
            proximoId = obtenerId();
            if (esMasculino){
                nuevo = new Cliente(proximoId,nombre.value,apellido.value,
                    Number(edad.value),Sexo.Masculino);
            }else {
                nuevo = new Cliente(proximoId, nombre.value, apellido.value,
                    Number(edad.value),Sexo.Femenino);
            }
            return nuevo;
        }

        function obtenerId() {
            let aux = localStorage.getItem('nextId');
            return aux ? JSON.parse(aux) : 0;
        }

        function obtenerLista() {
            let lista = localStorage.getItem('clientes');
            return lista ? JSON.parse(lista) : [];
        }

        function guardarDatos() {
            localStorage.setItem('clientes', JSON.stringify(lista));
            localStorage.setItem('nextId', proximoId);
        }
    }
}

window.addEventListener("load", new Manejadora);


