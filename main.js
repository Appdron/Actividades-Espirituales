
const principal = document.getElementById('principal');

const url = '/actividades.json';
fetch(url)
  .then(response => response.json())
  .then(data => {
    generarTabla(data);
  })
  .catch(error => {
    console.log('Error al importar datos', error);
  });

let datosTabla = []; // Para almacenar los datos de la tabla

function generarTabla(datos) {
  datosTabla = datos; // Guardamos los datos para luego filtrarlos
  const tabla = document.createElement('table');
  tabla.setAttribute('border', '1');
  tabla.setAttribute('id', 'tabla');
  const cabecera = document.createElement('thead');
  const filaCabecera = document.createElement('tr');
  
  const headers = ['Fecha', 'Actividad', 'Lugar', 'Sector', 'Pais'];
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    filaCabecera.appendChild(th);
    th.setAttribute('class', header);
  });
  
  cabecera.appendChild(filaCabecera);
  tabla.appendChild(cabecera);
  
  const cuerpo = document.createElement('tbody');
  datos.forEach(item => {
    const fila = document.createElement('tr');
    
    const celdas = [
      item.fecha,
      item.actividad,
      item.lugar,
      item.sector,
      item.pais
    ];
    
    celdas.forEach(celda => {
      const td = document.createElement('td');
      td.textContent = celda;
      td.setAttribute('id', 'td');
      fila.appendChild(td);
    });
    
    // Agregar la clase según el país
    if (item.pais === 'Bolivia') {
      fila.classList.add('bolivia');
    }
    else if (item.pais === 'Argentina' || item.pais === 'Brasil') {
      fila.classList.add('argentina');
    }
    else if (item.pais === 'Chile') {
      fila.classList.add('chile');
    }
    else if (item.pais === 'España') {
      fila.classList.add('españa')
    }
    else if (item.pais === 'Brazil' || item.pais === 'Brasil') {
      fila.classList.add('brazil');
    }
    
    cuerpo.appendChild(fila);
  });
  
  tabla.appendChild(cuerpo);
  principal.appendChild(tabla);
}

document.addEventListener('click', (e) => {
  switch (e.target.id) {
    case 'buscar':
    case 'lupa':
      console.log('estas en la lupa')
      contenedorCampo.style.display = 'flex'
      break;
    case 'td':
      //ocultar contenedor campo
      document.getElementById('contenedorCampo').style.display = 'none';
    document.getElementById('contenedorInformacion').style.display='none';

      break;
    case 'inf':
    case 'inf-Ico':
      console.log('crear un contenedor')
      document.getElementById('contenedorInformacion').style.display='flex';

      break;
      
    default:
      // Si se hace clic fuera del contenedor de búsqueda, ocultarlo
      if (e.target.id) {
        console.log('existe id: ' + e.target.id)
      }
      else if (e.target.className) {
        console.log('existe clase: ' + e.target.className)
      }
      else if (e.target.tagName) {
        console.log('existe Elemento' + e.target.tagName)
        
      }
  }
});

function CrearCampoBusqueda() {
  const contenedorCampo = document.createElement('div');
  const campoBusqueda = document.createElement('input');
  campoBusqueda.type = 'text';
  campoBusqueda.placeholder = 'Introduce tu Búsqueda';
  campoBusqueda.setAttribute('class', 'campoBusqueda');
  campoBusqueda.setAttribute('id', 'campoBusqueda');
  contenedorCampo.setAttribute('class', 'contenedorCampo');
  contenedorCampo.setAttribute('id', 'contenedorCampo');
  
  contenedorCampo.appendChild(campoBusqueda);
  document.body.appendChild(contenedorCampo);
  
  // Agregar el evento input para filtrar la tabla
  campoBusqueda.addEventListener('input', function() {
    filtrarTabla(campoBusqueda.value);
  });
  contenedorCampo.style.display = 'none';
}
CrearCampoBusqueda();

function filtrarTabla(busqueda) {
  // Filtrar los datos basados en el texto ingresado
  const tabla = document.getElementById('tabla');
  const filas = tabla.getElementsByTagName('tr');
  
  for (let i = 1; i < filas.length; i++) {
    const fila = filas[i];
    const celdas = fila.getElementsByTagName('td');
    
    let mostrarFila = false;
    // Recorrer todas las celdas de la fila y comprobar si alguna coincide con la búsqueda
    for (let j = 0; j < celdas.length; j++) {
      if (celdas[j].textContent.toLowerCase().includes(busqueda.toLowerCase())) {
        mostrarFila = true;
        break; // Si se encuentra una coincidencia, no hace falta seguir buscando en esta fila
      }
    }
    
    // Mostrar u ocultar la fila
    if (mostrarFila) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  }
}

function informacion() {
  const contenedorInformacion = document.createElement('div');
  const p = document.createElement('p');
  p.textContent = 'gocaocampero.gco@gmail.com';
  const h5 = document.createElement('h5');
  h5.textContent='70335083';
  contenedorInformacion.appendChild(p);
  contenedorInformacion.appendChild(h5);
  contenedorInformacion.setAttribute('class','contenedorInformacion');
  contenedorInformacion.setAttribute('id','contenedorInformacion');

  document.body.appendChild(contenedorInformacion);
  contenedorInformacion.style.display='none';
}
informacion();