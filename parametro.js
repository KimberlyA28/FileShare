// Obtén la URL actual
const urlActual = window.location.href;

// Crea un objeto URLSearchParams para manejar los parámetros de la URL
const parametros = new URLSearchParams(window.location.search);

// Obtiene el valor del parámetro 'kimberly'
let carpetaNombre = parametros.get('kimberly');

// Verifica si 'kimberly' está presente
if (!carpetaNombre) {
  // Si 'kimberly' no está presente, genera una cadena aleatoria
  carpetaNombre = generarCadenaAleatoria();
  
  // Establece el parámetro 'kimberly' en el objeto URLSearchParams
  parametros.set('kimberly', carpetaNombre);

  // Construye la URL con los parámetros actualizados
  const urlBase = urlActual.split('?')[0]; // Obtén la base de la URL sin parámetros
  const urlConParametro = `${urlBase}?${parametros.toString()}`; // Crea la URL con los parámetros

  // Redirige a la nueva URL con el parámetro 'kimberly'
  window.location.href = urlConParametro;
}

// Función para generar una cadena aleatoria
function generarCadenaAleatoria(longitud = 10) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';
    const caracteresLength = caracteres.length;
    for (let i = 0; i < longitud; i++) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
    }
    return resultado;
}

// Función para crear la carpeta
function crearCarpeta(carpetaNombre) {
    $.ajax({
        url: 'crearCarpeta.php',
        type: 'POST',
        data: { nombreCarpeta: carpetaNombre },
        success: function(response) {
            console.log('Carpeta creada con éxito:', response);
        },
        error: function(xhr, status, error) {
            console.error('Error al crear la carpeta:', error);
        }
    });
}

// Función para manejar el evento de envío del formulario
const Form = document.getElementById('form');
Form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fileInput = Form.querySelector('#archivo');
    const file = fileInput.files[0];
    if (file) {
        // Aquí puedes enviar el archivo al servidor para su procesamiento
        console.log('Subir archivo:', file.name);
        // Si deseas agregar la lógica de subida aquí, puedes usar la función `uploadFile` más abajo.
    } else {
        alert('Por favor, seleccione un archivo primero.');
    }
});

// Función para manejar el archivo seleccionado
function handleFile(file) {
    if (file) {
        console.log('Archivo seleccionado:', file.name);
        // Aquí puedes agregar la lógica para subir el archivo si lo deseas.
    }
}

// Zona de arrastre
const dropArea = document.getElementById('drop-area');
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('drag-over');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('drag-over');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    handleFile(file);
});

// Función para subir archivo (con barra de progreso)
// Descomentar y adaptar según tus necesidades
// function uploadFile(carpetaRuta, inputId) {
//   var archivoInput = document.getElementById(inputId);
//   var archivo = archivoInput.files[0];
//   var progressBar = document.getElementById('progressBar');

//   var formData = new FormData();
//   formData.append('archivo', archivo);

//   var xhr = new XMLHttpRequest();

//   xhr.upload.onprogress = function (event) {
//       if (event.lengthComputable) {
//           var percentComplete = (event.loaded / event.total) * 100;
//           progressBar.value = percentComplete;
//       }
//   };

//   xhr.onload = function () {
//       if (xhr.status === 200) {
//           console.log('Archivo subido con éxito');
//           // Puedes realizar acciones adicionales después de la carga aquí
//       } else {
//           console.error('Error al subir el archivo');
//       }
//   };

//   xhr.open('POST', 'upload.php', true);
//   xhr.send(formData);
// }