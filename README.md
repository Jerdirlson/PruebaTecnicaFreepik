Primero necesitamos ejecutar el script de la base de datos, esta en MYSQL.
El script se encuentra en la raiz del proyecto.

Para correr el proyecto se necesita docker.


Cuando nos situemos en la carpeta del front.

sudo docker build -t frontend-tecnica .

sudo docker run -it -p 8080:8080 frontend-tecnica

El docker va a correr el proyecto en el puerto 8080.



Cuando nos situemos en la carpeta del backend.

sudo docker build -t backend-tecnica .


sudo docker run --network="host" -it -p 8081:8081 backend-tecnica

Las credenciales son las siguientes.

Email: prueba@gmail.com
Password: prueba

El proyecto consta de una autenticación con token y sesión activa de JWT.
Tambien esta integrado en su totalidad con websockets io.
Tambien integra patrones de diseño como Singleton y Facades.

Muchas gracias.
