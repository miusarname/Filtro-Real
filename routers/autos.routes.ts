import express, { Request, Response, NextFunction } from "express";
import { MongoClient } from "mongodb";
import { validateJWT } from "../middlewares/tokenValidation.js";
import { con } from "../db/atlas.js";
import { ErrorHandler } from "../storage/errorHandler.js";

export const autos = express.Router();

let db: any;
let connection: any;

autos.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    connection = await con;
    db = connection.db(process.env.DB_NAME);
    next();
  } catch (error) {
    res.sendStatus(500);
    res.send(error);
  }
});

autos.get("/", validateJWT, async (req: Request, res: Response) => {
  if (req.body !== false) {
    try {
      const automovilCollection = db.collection("Automovil");
      const data = await automovilCollection.find({}).toArray();
      res.send(data);
    } catch (error) {
      console.log(error.errInfo.details.schemaRulesNotSatisfied);
      let errorhandl = new ErrorHandler(error);
      res.send(errorhandl.handerErrorSucess);
    }
  }
});

autos.get("/elderly/5", validateJWT, async (req: Request, res: Response) => {
  if (req.body !== false) {
    try {
      const automovilCollection = db.collection("Automovil");
      const data = await automovilCollection
        .find({ Capacidad: { $gt: 5 } })
        .toArray();
      res.send(data);
    } catch (error) {
      console.log(error.errInfo.details.schemaRulesNotSatisfied);
      let errorhandl = new ErrorHandler(error);
      res.send(errorhandl.handerErrorSucess);
    }
  }
});

// Rutas adicionales
autos.get("/details/:id", validateJWT, async (req: Request, res: Response) => {
  if (req.body !== false) {
    try {
      const automovilCollection = db.collection("Automovil");
      const data = await automovilCollection.findOne({
        ID_Automovil: req.params.id,
      });
      res.send(data);
    } catch (error) {
      console.log(error.errInfo.details.schemaRulesNotSatisfied);
      let errorhandl = new ErrorHandler(error);
      res.send(errorhandl.handerErrorSucess);
    }
  }
});
