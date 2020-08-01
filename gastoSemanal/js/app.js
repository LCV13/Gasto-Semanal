//Variables 
const presupuestoUsuario = prompt('¿Cual es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;




//Clases

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    //Metodo para ir restando al presupuesto actual

    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    }
}


//Clase de interfaz. Maneja todo lo relacionado al HTML
class Interfaz{
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        //Insertar al HTML
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;

    }

    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        divMensaje.appendChild(document.createTextNode(mensaje));

        //Insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //Quitar despues de 3 segundos
        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }
        //Insertar los gastos a la lista
        agregarGastoListado(nombre, cantidad){
            const gastosListado = document.querySelector('#gastos ul');

            //Crear Li
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';

            //Insertar el gasto
            li.innerHTML = `
                ${nombre}
                  <span class="badge badge-primary badge-pill">  $ ${cantidad} </span>
            `;

            //Insertar al HTML
            gastosListado.appendChild(li);
        }

        //Comprobar el presupuesto restante
        presupuestoRestante(cantidad){
            const restante = document.querySelector('span#restante');

            //Actualizamos el presupuesto restante
            const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
          
            restante.innerHTML = `${presupuestoRestanteUsuario}`;

            this.comprobarPresupuesto();
        }

        //cambia de color el presupuesto restante
        comprobarPresupuesto(){
            const presupuestoTotal = cantidadPresupuesto.presupuesto;
            const presupuestoRestante = cantidadPresupuesto.restante;

            //Comprobar el 25% del gasto
            if((presupuestoTotal / 4) >= presupuestoRestante){
                const restante = document.querySelector('.restante');
                restante.classList.remove('alert-success', 'alert-warning');
                restante.classList.add('alert-danger');
            }else if((presupuestoTotal / 2) >= presupuestoRestante){
                const restante = document.querySelector('.restante');
                restante.classList.remove('alert-success');
                restante.classList.add('alert-warning');
            }
        }
}




//Event LIsteners

document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        window.location.reload();
    }else{
        //Instanciar el presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);

        console.log(cantidadPresupuesto);

        //Instanciar la clase de interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }

});




formulario.addEventListener('submit', function(e){
    e.preventDefault();

    //Leer del formulario de gastos
    const nombreGasto = document.getElementById('gasto').value;
    const cantidadGasto = document.getElementById('cantidad').value;

    //Instanciar la interfaz
    const iu = new Interfaz();

    //Comprobar que los campos no esten vacios
    if(nombreGasto === '' || cantidadGasto === ''){
        //2parametros: mensaje y tipo
        iu.imprimirMensaje('Hubo un error', 'error');

    }else{
        //Inssertar en el HTML
        iu.imprimirMensaje('Correcto!', 'correcto');
        iu.agregarGastoListado(nombreGasto, cantidadGasto);
        iu.presupuestoRestante(cantidadGasto);
    }


});