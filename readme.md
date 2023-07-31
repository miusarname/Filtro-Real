# HAE de Contabilidad Empresarial

![Badge en Desarollo](https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green)<img src="https://img.shields.io/circleci/project/github/badges/shields/master" alt="build status">

<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /><img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" /><img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" /><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /><img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />

## Estado del Proyecto

Actualmente, el proyecto se encuentra en desarrollo

## Características

El proyecto de Express incluye las siguientes características:

- Crear y gestionar cuentas contables.
- Registrar transacciones financieras, especificando las cuentas involucradas y los montos correspondientes.
- Generar informes y balances para evaluar la salud financiera de la empresa.

## Requisitos previos

Para instalar y ejecutar el proyecto, se requieren los siguientes componentes:

- Node.js
- NPM

## Tecnologías Utilizadas

El proyecto hace uso de las siguientes tecnologías:

- Node.js
- Express
- MySQL
- JWT (JSON Web Tokens)

## Instalación

Para instalar el proyecto, sigue estos pasos:

1. Clona el repositorio:

```bash
git clone https://github.com/miusarname/Filtro-Real.git
```

2. Dirígete al directorio del proyecto:

```bash
cd Filtro-Real
```

3. Instala las dependencias:

```bash
npm install
```

4. Crea el archivo .env con la configuración de la base de datos y el puerto:

````bash
PORT=3000 o <puerto_donde_correra_tu_servidor>(Este puerto debe estar disponible, si te sale algo como esto :

```bash
node:events:492
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE: address already in use :::3005
    at Server.setupListenHandle [as _listen2] (node:net:1872:16)
    at listenInCluster (node:net:1920:12)
    at Server.listen (node:net:2008:7)
    at Function.listen (/home/apolt01-013/Desktop/carpetica/apifiltro/node_modules/express/lib/application.js:635:24)
    at file:///home/apolt01-013/Desktop/carpetica/apifiltro/controller/index.js:21:5
    at ModuleJob.run (node:internal/modules/esm/module_job:192:25)
    at async DefaultModuleLoader.import (node:internal/modules/esm/loader:228:24)
    at async loadESM (node:internal/process/esm_loader:40:7)
    at async handleMainPromise (node:internal/modules/run_main:66:12)
Emitted 'error' event on Server instance at:
    at emitErrorNT (node:net:1899:8)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
  code: 'EADDRINUSE',
  errno: -98,
  syscall: 'listen',
  address: '::',
  port: 3005
}

Node.js v20.5.0
```
Significa que el puerto esta ocupado y debes poner otro


DB_NAME="nombre_de_tu_base_de_datos"
DB_USER="tu_usuario_de_mysql"
DB_PASSWORD="contraseña_de_tu_base_de_datos"
DB_HOST="localhost"
DB_PORT=3306 o <puerto_de_tu_base_de_datos> (por ejemplo: 3306)
JWT_PRIVATE_KEY = <La_key_con_la_cual_desencripta_el_JWT> (Este campo es libre, lo quiera poner)
````

Reemplaza los valores entre comillas con los correspondientes a tu base de datos MySQL.

En mi caso quedo algo así :

```bash
PORT = 3002
DB_NAME="db_campus_alquiler"
DB_USER="campus"
DB_PASSWORD="campus2023"
DB_HOST="localhost"
DB_PORT=3306
JWT_PRIVATE_KEY = "OscarElPapu"
```

## Creación de la Base de Datos

Antes de usar el proyecto, asegúrate de que la base de datos esté configurada correctamente. Sigue los pasos a continuación:

1. Copia el código SQL que se encuentra en el archivo db/db_Creation.sql.

![Copia de codigo sql](./img/Copia%20de%20codigo%20sql.png)

2. Abre tu administrador de base de datos, como MySQL Workbench o PhpMyAdmin

**En MySQLWorkbench**
![Seleccion de conexion](./img/Seleccion%20de%20conexion%20en%20MySQLWorkBench.png)

**En phpMyAdmin**
![Seleccion de conexion en phpMyAdmin](./img/Abriendo%20phpmyadmin.png)

3. Pega el codigo

**En MySQLWorkbench**
![Pegar el codigo en en MySQLWorkbench](./img/Pegar%20codigo%20sql.png)

**En phpMyAdmin**
![Pegar el codigo en phpMyAdmin](./img/pegar%20codigo%20en%20phpMyAdmin.png)

4. Ejecuta el código SQL copiado en la interfaz del administrador para crear la base de datos y sus tablas.

**En MySQLWorkbench**
![Ejecucion del sql](./img/Ejecucion%20del%20codigo.png)

**En phpMyAdmin**
![Ejecucion del sql en phpMyAdmin](./img/ejecutar%20sql%20phpMyAdmin.png)

## Obtener el Token de Acceso

Antes de acceder a las rutas protegidas, necesitas obtener un token de acceso. Para obtener el token, envía una petición GET a la siguiente ruta:

```bash
http://localhost:<PORT>/token
```

![Solicitud del token](./img/Acceso%20a%20token.png)

**Nota**:Tambien existe un token de administrador que lo podemos pedir de la misma forma :

![Solicitud token Admon](./img/solictud%20token%20admon.png)

## Acceso a las Rutas

Una vez que tengas el token de acceso, debes incluirlo en los headers de tus peticiones a las rutas protegidas. Por ejemplo:

```javascript
headers: {
  Authorization: "Bearer tu_token_de_acceso";
}
```

o

![Se pega el token en los headers](./img/se%20pega%20el%20token.png)

Ahora puedes acceder a las rutas especificadas en el token. Si el token tiene el rol de "administrador", tendrás acceso total.

![Accediendo a las rutas](./img/Accediendo%20a%20las%20rutas.png)

**NOTA**: Los token tiene una duracion de 30 minutos

## Ejecución

Para ejecutar la aplicación, simplemente ejecuta el siguiente comando:

**Nota** :Primero en otra consola o terminal en la ruta de la aplicación deberas ejecutar esto :

```bash
npm run tsc
```

luego esto :

```bash
npm run dev
```

La aplicación se ejecutará en el puerto especificado en el archivo .env, por ejemplo, en este caso en el puerto 3000. Puedes acceder a ella en la siguiente URL:

http://localhost:<PORT>/

## El proyecto incluye las siguientes consultas:

### - Consulta 1: Mostrar todos los clientes registrados en la base de datos. Endpoint: /clientes (GET)

### - Consulta 2: Obtener todos los automóviles disponibles para alquiler. Endpoint: /autos (GET)

### - Consulta 3: Listar todos los alquileres activos junto con los datos de los clientes relacionados. Endpoint: /alquieres (GET)

### - Consulta 4: Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado. Endpoint: /reservas (GET)

### - Consulta 5: Obtener los detalles del alquiler con el ID_Alquiler específico. Endpoint: /alquieres/:id (GET)

#### Explicacion:

Esto /:id significa que aca es donde pondras el numero del alquier por ejemplo si el el numero del alquier es 1 entonces buscaremos

```bash
http://localhost:<PORT>/alquieres/1
```

### - Consulta 6: Listar los empleados con el cargo de "Vendedor" Endpoint: /empleados (GET)

### - Consulta 7: Mostrar la cantidad total de automóviles disponibles en cada sucursal. Endpoint: /sucursales/cantidad (GET)

### - Consulta 8: Obtener el costo total de un alquiler específico. Endpoint: /alquieres/costo/:id (GET)

#### Explicacion:

Esto /:id significa que aca es donde pondras el numero del alquier por ejemplo si el el numero del alquier es 1 entonces buscaremos

```bash
http://localhost:<PORT>/alquieres/costo/1
```

### - Consulta 9: Listar los clientes con el DNI específico. Endpoint: /clientes/:DNI (GET)

#### Explicacion:

Esto /:DNI significa que aca es donde pondras el numero del alquier por ejemplo si el el DNI es 1 entonces buscaremos

```bash
http://localhost:<PORT>/clientes/1
```

### - Consulta 10: Mostrar todos los automóviles con una capacidad mayor a 5 personas. Endpoint: /autos/elderly/5 (GET)

### - Consulta 11: Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'. Endpoint: /alquieres/details/fechaf (GET)

### - Consulta 12: Listar las reservas pendientes realizadas por un cliente específico. Endpoint: /alquieres/:DNI (GET)

#### Explicacion:

Esto /:DNI significa que aca es donde pondras el DNI del cliente por ejemplo si el el DNI es 1 entonces buscaremos

```bash
http://localhost:<PORT>/alquieres/1
```

### - Consulta 11: Mostrar los empleados con cargo de "Gerente" o "Asistente". Endpoint: /empleados/gerenteoasistente (GET)

## Contribuciones

¡Se agradecen las contribuciones! Si deseas contribuir al proyecto, puedes enviar una solicitud de extracción a través de GitHub.

## Licencia

El proyecto está bajo la licencia MIT.
