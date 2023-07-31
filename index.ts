import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { clientes } from "./routers/clientes.routes.js";
import { token } from "./routers/token.routes.js";
import { autos } from "./routers/autos.routes.js";
import { reservas } from "./routers/reservas.routes.js";
import { alquieres } from "./routers/alquileres.routes.js";
import { empleados } from "./routers/empleados.routes.js";
import "reflect-metadata";

//config
dotenv.config();

//Instance server
const app: any = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));

//routes
app.use("/clientes", clientes);
app.use("/autos", autos);
app.use("/token", token);
app.use("/alquieres", alquieres);
app.use("/reservas/activas", reservas);
app.use("/empleados", empleados);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
