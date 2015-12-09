Aprovechando el ejercicio anterior, vamos a ampliarlo usando los módulos fs y zlib, que implementan stream y events

* Ahora, en vez de usar una base de datos en código, vamos a guardar los usuarios en un fichero de texto llamado database.txt.
* En este fichero guardaremos los objetos de usuario, uno por cada línea. Para los saltos de línea usaremos "\n".
* En la clase User:
    * En el método save: 
        * Usaremos el método fs.createWriteStream en modo 'a' para crear un flujo de escritura hacia el fichero database.txt que apendizará los datos
        * Cuando los datos sean escritos, se emitirá un evento informando del resultado
    * En el método all:
        * Usaremos el método fs.createReadStream para crear un flujo de lectura hacia el fichero database.txt
        * Redirijiremos, con el método pipe, el flujo de datos obtenido hacia un flujo de escritura, la consola, con process.stdout
    * En el método compress:
        * Crear un nuevo método a la clase User llamado compress
        * En él crearemos un flujo de lectura, con fs.createReadStream, uno de escritura, con fs.createWriteStream, 
          y uno transform, con zlib.createGzip. El flujo de lectura apuntará a database.txt, y el de escritura a database.txt.gz
        * Se trata de comprimir el fichero database.txt en database.txt.gz mediante llamadas al método pipe
* Desde app.js llamaremos al método compress de la clase User y borraremos las llamadas a erase. El resto quedará igual

Ejecutar el fichero app.js desde consola: node app.js
          
