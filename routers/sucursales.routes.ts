import express, { Request, Response, NextFunction } from "express";
import { Connection } from "../middlewares/classes/connection.js";
import { validateJWT } from "../middlewares/tokenValidation.js";
export const sucursales = express.Router();

let con: Connection;

let connection: any;

//connection DB

sucursales.use((req: Request, res: Response, next: NextFunction) => {
  try {
    con = new Connection(
      process.env.DB_HOST,
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD
    );

    connection = con.connection;

    next();
  } catch (error) {
    res.sendStatus(500);

    res.send(error);
  }
});

sucursales.get("/cantidad", validateJWT, async (req: Request, res: Response) => {
  if (req.body != false) {
    try {
      connection.query(
        `SELECT * 
        FROM Sucursal_Automovil E
        JOIN Sucursal C ON E.ID_Sucursal =C.ID_Sucursal`,
        (err: any, data: any, fils: any) => {
          console.log(err);
          console.log(fils);
          res.send(data);
        }
      );
    } catch (error) {
      res.status(500).send("Ha habido un error...");
    }
  }
});