Este ejercicio esta propuesto para usar el módulo Express y algunos middlewares
Aprovechando el ejercicio anterior, vamos a:

* En la clase User:
    * Modificar el método all() para que lea el contenido del fichero database.txt y, una vez hecho, emita un evento con los 
      datos leídos formateados correctamente a JSON. (Ayuda: el modulo readline de Node.js puede ser de ayuda) 
* En el app.js:
    * Importar las librerías Express 4.x, body-parser v1.14.1 y compression v1.6.0
    * Crear una instancia de express e inyectarla en el http.createServer
    * Inyectar un middleware con bodyParser.json()
    * Inyectar un middleware con compression()
    * Crear un middleware de aplicación, que sirva para todos los endpoints, para que imprima en consola el método HTTP y 
      el endpoint de la petición. Además debe lanzar siguiente middleware de la pila
    * Crear un middleware de aplicación para el método GET y montarlo en el endpoint /users. La lógica que había en el 
      método 'GET' del fichero routes/users.js del ejercicio anterior, ponerla en este middleware. Modificar lo necesario 
      para que esto funcione. Además, escuchar el evento que emitirá el método all() de la clase User cuando haya leído todo 
    * Crear un middleware de aplicación para el método POST y montarlo en el endpoint /users. La lógica que había en el 
      método 'POST' del fichero routes/users.js del ejercicio anterior, ponerla en este middleware. Modificar lo necesario 
      para que esto funcione
* Borrar el directorio routes, con todo su contenido, y el fichero router.js, ya que no serán necesarios