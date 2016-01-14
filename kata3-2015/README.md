Aprovechando el ejercicio anterior, vamos a ampliarlo usando el modulo http que implementa stream y events

Se pretende crear un servidor http. Para ello:

* Crear una carpeta y llamarla routes. Dentro, crear un fichero con nombre users.js.
    * Aquí vamos a crear la lógica de negocio
    * Crearemos dos funciones con nombres 'GET' y 'POST'
        * 'GET': recibe como parámetro una request y un response. Llamar a user.all para recuperar los datos de la
          base de datos y los devolveremos en la response
        * 'POST': recibe como parámetro una request y un response. Llamar a user.save con los datos que se reciben en la request.
          Capturar el evento de guardado y dependiendo del 
          resultado devolver en la respuesta un 500 o un 200 con un objeto de tipo:
          
            {
              "result": {
                "code": status.code,
                "info": status.info
            }
            
* Crear un fichero router.js con un método llamado match, que recibe como parámetros un pathname, un objeto http.IncomingMessage,
  y otro http.ServerResponse. El método comprobará si exite un fichero con el pathname como nombre y, de ser así, hacer un require() 
  del fichero y llamar al método que encaje con el request.method de la petición
* En app.js:
    * Usar el método http.createServer para crear una instancia de http.Server. Este método acepta un callback que recibe dos 
      parámetros: request y response
    * Parsear la url de la request para sacar el pathname
    * Escuchar por el puerto 9000
    * Quitar el resto
* La clase User quedará igual
