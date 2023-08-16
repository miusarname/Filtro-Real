import express, { Request, Response, NextFunction } from "express";
import { MongoClient } from "mongodb";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Propieties } from "../storage/rentals.js";
import { validateJWT } from "../middlewares/tokenValidation.js";
import { ErrorHandler } from "../storage/errorHandler.js";
import { con } from "../db/atlas.js";

export const alquieres = express.Router();

let db: any;
let connection: any;

alquieres.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    connection = await con;
    db = connection.db(process.env.DB_NAME);
    next();
  } catch (error) {
    res.sendStatus(500);
    res.send(error);
  }
});

alquieres.get("/", validateJWT, async (req: Request, res: Response) => {
  if (req.body !== false) {
    try {
      const alquilerCollection = db.collection("Alquiler");
      const dataActivo = await alquilerCollection
        .aggregate([
          {
            $match: { Estado: "Activo" },
          },
          {
            $lookup: {
              from: "Automovil",
              localField: "ID_Automovil",
              foreignField: "ID_Automovil",
              as: "automovilData",
            },
          },
          {
            $lookup: {
              from: "Cliente",
              localField: "ID_Cliente",
              foreignField: "ID_Cliente",
              as: "clienteData",
            },
          },
        ])
        .toArray();
      res.send(dataActivo);
    } catch (error) {
      console.log(error.errInfo.details.schemaRulesNotSatisfied);
      let errorhandl=new ErrorHandler(error)
      res.send(errorhandl.handerErrorSucess);
    }
  }
});

alquieres.get("/:id", async (req, res) => {
  if (req.body !== false) {
    try {
      const propietiesData = plainToClass(Propieties, req.params, {
        excludeExtraneousValues: true,
      });
      await validate(propietiesData);
      const alquilerCollection = db.collection("Alquiler");
      const dataById = await alquilerCollection
        .aggregate([
          {
            $match: { Estado: "Activo", ID_Alquiler: propietiesData.Id },
          },
          {
            $lookup: {
              from: "Automovil",
              localField: "ID_Automovil",
              foreignField: "ID_Automovil",
              as: "automovilData",
            },
          },
          {
            $lookup: {
              from: "Cliente",
              localField: "ID_Cliente",
              foreignField: "ID_Cliente",
              as: "clienteData",
            },
          },
        ])
        .toArray();
      res.send(dataById);
    } catch (err) {
      console.log(err.errInfo.details.schemaRulesNotSatisfied);
      let errorhandl=new ErrorHandler(err)
      res.send(errorhandl.handerErrorSucess);
    }
  }
});

alquieres.get(
  "/costo/:id",
  validateJWT,
  async (req: Request, res: Response) => {
    if (req.body !== false) {
      try {
        const propietiesData = plainToClass(Propieties, req.params, {
          excludeExtraneousValues: true,
        });
        await validate(propietiesData);
        const alquilerCollection = db.collection("Alquiler");
        const result = await alquilerCollection.findOne(
          { ID_Alquiler: propietiesData.Id },
          { projection: { _id: 0, Costo_Total: 1 } }
        );
        res.send(result);
      } catch (err) {
        console.log(err.errInfo.details.schemaRulesNotSatisfied);
      let errorhandl=new ErrorHandler(err)
      res.send(errorhandl.handerErrorSucess);
      }
    }
  }
);

alquieres.get(
  "/details/fechaf",
  validateJWT,
  async (req: Request, res: Response) => {
    if (req.body !== false) {
      try {
        const alquilerCollection = db.collection("Alquiler");
        const dataFecha = await alquilerCollection
          .aggregate([
            {
              $match: { Fecha_Inicio: "2023-07-05" },
            },
            {
              $lookup: {
                from: "Automovil",
                localField: "ID_Automovil",
                foreignField: "ID_Automovil",
                as: "automovilData",
              },
            },
            {
              $lookup: {
                from: "Cliente",
                localField: "ID_Cliente",
                foreignField: "ID_Cliente",
                as: "clienteData",
              },
            },
          ])
          .toArray();
        res.send(dataFecha);
      } catch (err) {
        console.log(err.errInfo.details.schemaRulesNotSatisfied);
        let errorhandl=new ErrorHandler(err)
        res.send(errorhandl.handerErrorSucess);      }
    }
  }
);
