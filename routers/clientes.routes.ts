import express, { Request, Response, NextFunction } from "express";
import { Connection } from "../middlewares/classes/connection.js";
import { validateJWT } from "../middlewares/tokenValidation.js";
import { Costumers } from "../storage/customers.js";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

export const clientes = express.Router();

let con: Connection;
let connection: any;

//connection DB
clientes.use((req: Request, res: Response, next: NextFunction) => {
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


clientes.get("/", validateJWT, async (req: Request, res: Response) => {
  if (req.body != false) {
    try {
      connection.query(
        `SELECT * FROM 	Cliente`,
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

clientes.get("/:DNI", validateJWT, async (req: Request, res: Response) => {
  if (req.body != false) {
    try {
      var data = plainToClass(Costumers, req.params, {
        excludeExtraneousValues: true,
      });
      console.log(data);
      req.body = data;
      await validate(data);
      try {
        connection.query(
          `SELECT * FROM Cliente WHERE DNI = ?`,
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
