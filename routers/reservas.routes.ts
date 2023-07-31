import express, { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { Connection } from "../middlewares/classes/connection.js";
import { validateJWT } from "../middlewares/tokenValidation.js";
import { Propieties } from "../storage/rentals.js";
import { validate } from "class-validator";

export const reservas = express.Router();

let con: Connection;
let connection: any;

//connection DB
reservas.use((req: Request, res: Response, next: NextFunction) => {
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

reservas.get("/", validateJWT, async (req: Request, res: Response) => {
  if (req.body != false) {
    try {
      connection.query(
        `SELECT * 
        FROM Reserva E
        JOIN Automovil D ON E.ID_Automovil = D.ID_Automovil
        JOIN Cliente C ON E.ID_Cliente =C.ID_Cliente WHERE E.Estado = "Pendiente"`,
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
