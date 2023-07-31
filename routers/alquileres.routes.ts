import express, { Request, Response, NextFunction } from "express";
import { Connection } from "../middlewares/classes/connection.js";
import { validateJWT } from "../middlewares/tokenValidation.js";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Propieties } from "../storage/rentals.js";

export const alquieres = express.Router();

let con: Connection;
let connection: any;

//connection DB
alquieres.use((req: Request, res: Response, next: NextFunction) => {
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

alquieres.get("/", validateJWT, async (req: Request, res: Response) => {
  if (req.body != false) {
    try {
      connection.query(
        `SELECT * 
        FROM Alquiler E
        JOIN Automovil D ON E.ID_Automovil = D.ID_Automovil
        JOIN Cliente C ON E.ID_Cliente =C.ID_Cliente WHERE E.Estado = "Activo"`,
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

alquieres.get("/:id", async (req, res) => {
  if (req.body != false) {
    try {
      var data = plainToClass(Propieties, req.params, {
        excludeExtraneousValues: true,
      });
      console.log(data);
      req.body = data;
      await validate(data);
      try {
        connection.query(
          `SELECT * 
          FROM Alquiler E
          JOIN Automovil D ON E.ID_Automovil = D.ID_Automovil
          JOIN Cliente C ON E.ID_Cliente =C.ID_Cliente WHERE E.Estado = "Activo" AND E.ID_Alquiler = ?`,
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

alquieres.get(
  "/costo/:id",
  validateJWT,
  async (req: Request, res: Response) => {
    if (req.body != false) {
      try {
        var data = plainToClass(Propieties, req.params, {
          excludeExtraneousValues: true,
        });
        console.log(data);
        req.body = data;
        await validate(data);
        try {
          connection.query(
            `SELECT Costo_Total FROM Alquiler WHERE ID_Alquiler = ?`,
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
  }
);

alquieres.get(
  "/details/fechaf",
  validateJWT,
  async (req: Request, res: Response) => {
    if (req.body != false) {
      try {
        try {
          connection.query(
            `SELECT * 
          FROM Alquiler E
          JOIN Automovil D ON E.ID_Automovil = D.ID_Automovil
          JOIN Cliente C ON E.ID_Cliente =C.ID_Cliente WHERE E.Fecha_Inicio = "2023-07-05"`,
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
  }
);
