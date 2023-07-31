import dotenv from "dotenv";
import { jwtVerify } from "jose";
import express from "express";
import "reflect-metadata";
const validateJWT = express();

dotenv.config({ path: "../" });

validateJWT.use(async (req:any, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ status: 401, message: "Token no enviado" });
  try {
    const encoder = new TextEncoder();
    const jwtData = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );

    req.data = jwtData.payload
    var hasKey = (jwtData.payload[req.originalUrl] !== undefined && jwtData.payload[req.originalUrl] !== false && jwtData.payload[req.originalUrl] != 0 || jwtData.payload['admon'] !== undefined && jwtData.payload['admon'] == 1);
    if (hasKey) {
    }else{
      req.body = false
      res.status(403).send('No tienes permisos  🖕')
    }
    next();
  } catch (error) {
    res.status(498).json({ status: 401, message: "Token caducado o no valido" });
  }
});
export { validateJWT };
