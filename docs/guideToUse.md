# Guía de Uso - API Filtro

## Instalación y Configuración

**Nota**:Esta seccion la puedes saltar si ya la hiciste en el archivo "principal" 

1. Clona el repositorio de GitHub:

```bash
git clone https://github.com/miusarname/apifiltro.git
```

2. Dirígete al directorio del proyecto:

```bash
cd apifiltro
```

3. Instala las dependencias:

```bash
npm install
```

4. Crea el archivo .env con la configuración de la base de datos y el puerto:

```bash
PORT=3000
DB_NAME="nombre_de_tu_base_de_datos"
DB_USER="tu_usuario_de_mysql"
DB_PASSWORD="contraseña_de_tu_base_de_datos"
DB_HOST="localhost"
DB_PORT=3306
```

Reemplaza los valores entre comillas con los correspondientes a tu base de datos MySQL.

## Creación de la Base de Datos

Antes de usar el proyecto, asegúrate de que la base de datos esté configurada correctamente. Sigue los pasos a continuación:

1. Copia el código SQL que se encuentra en el archivo db/db_Creation.sql.

 ![Copia de codigo sql](../img/Copia%20de%20codigo%20sql.png)


2. Abre tu administrador de base de datos, como MySQL Workbench o PhpMyAdmin

 **En MySQLWorkbench**
 ![Seleccion de conexion](../img/Seleccion%20de%20conexion%20en%20MySQLWorkBench.png)

  **En phpMyAdmin**
  ![Seleccion de conexion en phpMyAdmin](../img/Abriendo%20phpmyadmin.png)

3. Pega el codigo

 **En MySQLWorkbench**
 ![Pegar el codigo en en MySQLWorkbench](../img/Pegar%20codigo%20sql.png)

 **En phpMyAdmin**
  ![Pegar el codigo en phpMyAdmin](../img/pegar%20codigo%20en%20phpMyAdmin.png)

4. Ejecuta el código SQL copiado en la interfaz del administrador para crear la base de datos y sus tablas.

 **En MySQLWorkbench**
 ![Ejecucion del sql](../img/Ejecucion%20del%20codigo.png)

**En phpMyAdmin**
  ![Ejecucion del sql en phpMyAdmin](../img/ejecutar%20sql%20phpMyAdmin.png)

## Obtener el Token de Acceso

Antes de acceder a las rutas protegidas, necesitas obtener un token de acceso. Para obtener el token, envía una petición GET a la siguiente ruta:

```bash
http://localhost:3000/token
```
 ![Solicitud del token](../img/Acceso%20a%20token.png)

**Nota**:Tambien existe un token de administrador que lo podemos pedir de la misma forma :

 ![Solicitud token Admon](../img/solictud%20token%20admon.png)

## Acceso a las Rutas

Una vez que tengas el token de acceso, debes incluirlo en los headers de tus peticiones a las rutas protegidas. Por ejemplo:

```javascript
headers: {
  Authorization: "Bearer tu_token_de_acceso"
}
```

o

 ![Se pega el token en los headers](../img/se%20pega%20el%20token.png)

 Ahora puedes acceder a las rutas especificadas en el token. Si el token tiene el rol de "administrador", tendrás acceso total.

  ![Accediendo a las rutas](../img/Accediendo%20a%20las%20rutas.png)

**NOTA**: Los token tiene una duracion de 30 minutos
