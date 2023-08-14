import express, { Request, Response, NextFunction } from 'express';
import { MongoClient } from 'mongodb';
import { plainToClass } from 'class-transformer';
import { con } from '../db/atlas.js';
import { validateJWT } from '../middlewares/tokenValidation.js';
import { Propieties } from '../storage/rentals.js';
import { validate } from 'class-validator';

export const empleados = express.Router();

let db: any;
let connection: any;

empleados.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    connection = await con;
    db = connection.db(process.env.DB_NAME);
    next();
  } catch (error) {
    res.sendStatus(500);
    res.send(error);
  }
});

empleados.get('/', validateJWT, async (req: Request, res: Response) => {
  if (req.body !== false) {
    try {
      const empleadoCollection = db.collection('Empleado');
      const data = await empleadoCollection.find({ Cargo: 'Vendedor' }).toArray();
      res.send(data);
    } catch (error) {
      res.status(500).send('Ha habido un error...');
    }
  }
});

empleados.get('/gerenteoasistente', validateJWT, async (req: Request, res: Response) => {
  if (req.body !== false) {
    try {
      const empleadoCollection = db.collection('Empleado');
      const data = await empleadoCollection.find({
        $or: [{ Cargo: 'Gerente' }, { Cargo: 'Asistente' }],
      }).toArray();
      res.send(data);
    } catch (error) {
      res.status(500).send('Ha habido un error...');
    }
  }
});

empleados.get('/:id', validateJWT, async (req: Request, res: Response) => {
  if (req.body !== false) {
    try {
      const empleadoCollection = db.collection('Empleado');
      const data = await empleadoCollection.findOne({ ID_Empleado: req.params.id });
      res.send(data);
    } catch (error) {
      res.status(500).send('Ha habido un error...');
    }
  }
});


