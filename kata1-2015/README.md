Este ejercicio esta propuesto para usar el módulo events

* Crear una clase User que servirá para gestionar un modelo de datos
* La base de datos se declarará en la propia clase commo un array de objetos. Cada objeto tendrá un usuario con name y occupation 
* La clase debe heredar de EventEmitter (Recordar que para heredar usamos util.inherits(Child, Parent);)
* La clase mínimo tendrá los métodos save, erase y all
    * El método save recibirá como parámetro un objeto, lo insertará en la base de datos y emitirá un evento anunciando el resultado de la operación
    * El método erase recibirá como parámetro un id, el cual validaremos, y emitirá un evento cuando haya borrado el registro requerido. En caso de error emitirá un evento con el error
    * El método all devolverá los todos los registros de la base de datos
* Se creara un fichero app.js
    * En él se instanciará la clase User
    * Se capturará el evento emitido al guardar y se le asociará un callback que imprima por consola: "saved: " + user.name + " (" + user.id + ")" 
    * Se capturará el evento emitido al borrar y se asociará un callback que imprima por consola: 
        * Si ha ido mal el borrado: "error on erase: " + error
        * Si ha ido bien el borrado: "erased: " + id
    * Se llamará al método save de la clase User dos veces con los datos:
           * { name: "Jane Doe", occupation: "manager" } la primera vez
           * { name: "John Jacob", occupation: "developer" } la segunda
    * Se llamará al método all, el cuál devolverá los dos usuarios creados
    * Se llamará al método erase de la clase User dos veces con los ids 1 y 20
    * Se llamará al método all, el cuál devolverá el primer usuario creado

Ejecutar el fichero app.js desde consola: node app.js
