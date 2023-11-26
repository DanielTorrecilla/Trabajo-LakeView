const sujetoInicial = {
    nombre: 'David Choak',
    tipo: 'vivo',
    ubicacion: 'Desconocido',
    culpabilidad: 'delincuente',
    urlImagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/David_Koch_by_Gage_Skidmore.jpg/800px-David_Koch_by_Gage_Skidmore.jpg',
  };
  
  let sujetos = JSON.parse(localStorage.getItem('sujetos')) || [sujetoInicial];
  
  function renderizarListaSujetos() {
    const listaSujetos = document.getElementById('listaSujetos');
    listaSujetos.innerHTML = '';
  
    sujetos.forEach((sujeto, indice) => {
      const tarjeta = document.createElement('div');
      tarjeta.classList.add('tarjetaSujeto');
      tarjeta.style.border = sujeto.tipo === 'descargado' ? '2px solid green' : '2px solid red';
  
      const imagen = document.createElement('img');
      imagen.onerror = () => {
       
        imagen.src = 'https://cdn-icons-png.flaticon.com/512/57/57117.png'; 
      };
      imagen.src = sujeto.urlImagen; 
      tarjeta.appendChild(imagen);
  
      const nombre = document.createElement('p');
      nombre.style.color = getColorByGuilt(sujeto.culpabilidad);
      nombre.textContent = sujeto.nombre;
      tarjeta.appendChild(nombre);
  
      tarjeta.onclick = () => mostrarFormulario(indice);
  
      listaSujetos.appendChild(tarjeta);
    });
  }

document.getElementById('tipo').addEventListener('change', function () {
  const descargadoDesdeInput = document.getElementById('descargadoDesde');

 
  if (this.value === 'descargado') {
    
    descargadoDesdeInput.required = true;
  } else {
    
    descargadoDesdeInput.required = false;
  }
});


function mostrarFormulario(indice = null) {
    const contenedorFormulario = document.getElementById('formulario');
    const formularioVisible = contenedorFormulario.style.display === 'block';
    const listaSujetos = document.getElementById('listaSujetos');
  
    if (formularioVisible) {
      contenedorFormulario.style.display = 'none';
      listaSujetos.style.display = 'grid';
    } else {
      contenedorFormulario.style.display = 'block';
      listaSujetos.style.display = 'none';
    }
  
    const formulario = contenedorFormulario.querySelector('form');
    formulario.reset();
  
    if (indice !== null) {
      llenarCamposFormulario(formulario, sujetos[indice]);
    }
  
    formulario.onsubmit = (evento) => guardarSujeto(evento, indice);
  }
  
  function cancelarFormulario() {
    const contenedorFormulario = document.getElementById('formulario');
    const listaSujetos = document.getElementById('listaSujetos');
  
    contenedorFormulario.style.display = 'none';
    listaSujetos.style.display = 'grid';
  }
  
  
  function llenarCamposFormulario(formulario, sujeto) {
    for (const campo in sujeto) {
      const input = formulario.querySelector(`#${campo}`);
      if (input) {
        input.value = sujeto[campo] || '';
      }
    }
  }
  

  function cambiarVista() {
    const aplicacion = document.getElementById('aplicacion');
    const body = document.body;
  
    if (aplicacion.style.display === 'none' || aplicacion.style.display === '') {
      aplicacion.style.display = 'block';
      body.style.background = ''; 
    } else {
      aplicacion.style.display = 'none';
      body.style.background = 'url("https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")';
      body.style.backgroundSize = 'cover';
    }
  }
  
  
  function guardarSujeto(evento, indice = null) {
    evento.preventDefault();
    const formulario = evento.target;
  
    const nuevoSujeto = {};
    for (const campo of ['nombre', 'tipo', 'ubicacion', 'descargadoDesde', 'culpabilidad', 'urlImagen', 'comentarios']) {
      nuevoSujeto[campo] = formulario.querySelector(`#${campo}`).value;
    }
  
    if (!nuevoSujeto.nombre || !nuevoSujeto.tipo || !nuevoSujeto.ubicacion || !nuevoSujeto.culpabilidad) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
  
    const confirmacion = window.confirm('¿Estás seguro de que deseas guardar este sujeto?');
  
    if (confirmacion) {
      if (indice !== null) {
        sujetos[indice] = nuevoSujeto;
      } else {
        sujetos.push(nuevoSujeto);
      }
  
      formulario.reset();
      renderizarListaSujetos();
  
      const contenedorFormulario = document.getElementById('formulario');
      const listaSujetos = document.getElementById('listaSujetos');
  
      contenedorFormulario.style.display = 'none';
      listaSujetos.style.display = 'grid';
  
      localStorage.setItem('sujetos', JSON.stringify(sujetos));
    }
  }
  
  
  
  function getColorByGuilt(culpabilidad) {
    return culpabilidad === 'posible cooperador' ? 'green' : culpabilidad === 'cooperador' ? 'orange' : 'red';
  }
  
  renderizarListaSujetos();
  