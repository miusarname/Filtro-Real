import express, { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { Connection } from "../middlewares/classes/connection.js";
import { validateJWT } from "../middlewares/tokenValidation.js";
import { Bookings } from "../storage/bookings.js";
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

reservas.get("/:DNI", async (req, res) => {
  if (req.body != false) {
    try {
      var data = plainToClass(Bookings, req.params, {
        excludeExtraneousValues: true,
      });
      console.log(data);
      req.body = data;
      await validate(data);
      try {
        connection.query(
          `SELECT * 
          FROM Reserva E
          JOIN Automovil D ON E.ID_Automovil = D.ID_Automovil
          JOIN Cliente C ON E.ID_Cliente =C.ID_Cliente WHERE C.DNI = ?`,
          [data.Id],
          (err: any, data: any, fils: any) => {
            console.log(err);
            console.log(fils);
            res.send(data);
          }
        );
      } catch (error) {
        res.status(500).send("Ha habido un error...");
      }
    } catch (err) {
      res.status(500).send(JSON.stringify(err));
    }
  }
});
