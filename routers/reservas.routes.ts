import express, { Request, Response, NextFunction } from 'express';
import { MongoClient } from 'mongodb';
import { plainToClass } from 'class-transformer';
import { con } from '../db/atlas.js';
import { validateJWT } from '../middlewares/tokenValidation.js';
import { Bookings } from '../storage/bookings.js';
import { ErrorHandler } from "../storage/errorHandler.js";
import { validate } from 'class-validator';

export const reservas = express.Router();

let db: any;
let connection: any;

reservas.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    connection = await con;
    db = connection.db(process.env.DB_NAME);
    next();
  } catch (error) {
    res.sendStatus(500);
    res.send(error);
  }
});

reservas.get('/', validateJWT, async (req: Request, res: Response) => {
  if (req.body !== false) {
    try {
      const reservaCollection = db.collection('Reserva');
      const dataPendiente = await reservaCollection
        .aggregate([
          {
            $match: { Estado: 'Pendiente' },
          },
          {
            $lookup: {
              from: 'Automovil',
              localField: 'ID_Automovil',
              foreignField: 'ID_Automovil',
              as: 'automovil',
            },
          },
          {
            $lookup: {
              from: 'Cliente',
              localField: 'ID_Cliente',
              foreignField: 'ID_Cliente',
              as: 'cliente',
            },
          },
        ])
        .toArray();
      res.send(dataPendiente);
    } catch (error) {
      console.log(error.errInfo.details.schemaRulesNotSatisfied);
      let errorhandl=new ErrorHandler(error)
      res.send(errorhandl.handerErrorSucess);    }
  }
});

reservas.get('/:DNI', async (req, res) => {
  if (req.body !== false) {
    try {
      const bookingData = plainToClass(Bookings, req.params, {
        excludeExtraneousValues: true,
      });
      await validate(bookingData);
      const reservaCollection = db.collection('Reserva');
      const dataByDNI = await reservaCollection
        .aggregate([
          {
            $match: { 'cliente.DNI': bookingData.Id },
          },
          {
            $lookup: {
              from: 'Automovil',
              localField: 'ID_Automovil',
              foreignField: 'ID_Automovil',
              as: 'automovil',
            },
          },
          {
            $lookup: {
              from: 'Cliente',
              localField: 'ID_Cliente',
              foreignField: 'ID_Cliente',
              as: 'cliente',
            },
          },
        ])
        .toArray();
      res.send(dataByDNI);
    } catch (err) {
      console.log(err.errInfo.details.schemaRulesNotSatisfied);
      let errorhandl=new ErrorHandler(err)
      res.send(errorhandl.handerErrorSucess);    }
  }
});

// Ruta adicional
reservas.get('/details/:id', async (req, res) => {
  if (req.body !== false) {
    try {
      const reservaCollection = db.collection('Reserva');
      const dataDetails = await reservaCollection
        .aggregate([
          {
            $match: { ID_Reserva: req.params.id },
          },
          {
            $lookup: {
              from: 'Automovil',
              localField: 'ID_Automovil',
              foreignField: 'ID_Automovil',
              as: 'automovil',
            },
          },
          {
            $lookup: {
              from: 'Cliente',
              localField: 'ID_Cliente',
              foreignField: 'ID_Cliente',
              as: 'cliente',
            },
          },
        ])
        .toArray();
      res.send(dataDetails);
    } catch (err) {
      console.log(err.errInfo.details.schemaRulesNotSatisfied);
      let errorhandl=new ErrorHandler(err)
      res.send(errorhandl.handerErrorSucess);    }
  }
});
