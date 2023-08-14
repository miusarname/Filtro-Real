import express, { Request, Response, NextFunction } from 'express';
import { MongoClient } from 'mongodb';
import { con } from '../db/atlas.js';
import { validateJWT } from '../middlewares/tokenValidation.js';

export const sucursales = express.Router();

let db: any;
let connection: any;

sucursales.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    connection = await con;
    db = connection.db(process.env.DB_NAME);
    next();
  } catch (error) {
    res.sendStatus(500);
    res.send(error);
  }
});

sucursales.get('/cantidad', validateJWT, async (req: Request, res: Response) => {
  if (req.body !== false) {
    try {
      const sucursalAutomovilCollection = db.collection('Sucursal_Automovil');
      const data = await sucursalAutomovilCollection
        .aggregate([
          {
            $lookup: {
              from: 'Sucursal',
              localField: 'ID_Sucursal',
              foreignField: 'ID_Sucursal',
              as: 'sucursal',
            },
          },
        ])
        .toArray();
      res.send(data);
    } catch (error) {
      res.status(500).send('Ha habido un error...');
    }
  }
});

// Ruta adicional
sucursales.get('/:id', validateJWT, async (req: Request, res: Response) => {
  if (req.body !== false) {
    try {
      const sucursalCollection = db.collection('Sucursal');
      const data = await sucursalCollection.findOne({ ID_Sucursal: req.params.id });
      res.send(data);
    } catch (error) {
      res.status(500).send('Ha habido un error...');
    }
  }
});

