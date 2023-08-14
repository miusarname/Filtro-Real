import express, { Request, Response, NextFunction } from 'express';
import { MongoClient } from 'mongodb';
import { validateJWT } from '../middlewares/tokenValidation.js';
import { con } from '../db/atlas.js';
import { Costumers } from '../storage/customers.js';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export const clientes = express.Router();

let db: any;
let connection: any;

clientes.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    connection = await con;
    db = connection.db(process.env.DB_NAME);
    next();
  } catch (error) {
    res.sendStatus(500);
    res.send(error);
  }
});

clientes.get('/', validateJWT, async (req: Request, res: Response) => {
  if (req.body !== false) {
    try {
      const clienteCollection = db.collection('Cliente');
      const data = await clienteCollection.find({}).toArray();
      res.send(data);
    } catch (error) {
      res.status(500).send('Ha habido un error...');
    }
  }
});

clientes.get('/:DNI', validateJWT, async (req: Request, res: Response) => {
  if (req.body !== false) {
    try {
      const data = plainToClass(Costumers, req.params, {
        excludeExtraneousValues: true,
      });
      await validate(data);
      const clienteCollection = db.collection('Cliente');
      const result = await clienteCollection.findOne({ DNI: data.Id });
      res.send(result);
    } catch (err) {
      res.status(500).send(JSON.stringify(err));
    }
  }
});

// Otras rutas

clientes.get('/age/:age', validateJWT, async (req: Request, res: Response) => {
  if (req.body !== false) {
    try {
      const age = parseInt(req.params.age);
      const clienteCollection = db.collection('Cliente');
      const data = await clienteCollection.find({ Edad: age }).toArray();
      res.send(data);
    } catch (error) {
      res.status(500).send('Ha habido un error...');
    }
  }
});


