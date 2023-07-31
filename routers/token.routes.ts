import { SignJWT } from "jose";
import dotenv from "dotenv";
import express, { Router } from "express";

//Configuration
dotenv.config({ path: "../" });

//Create Server
export const token: Router = express.Router();

token.get("/", async (req, res) => {
  let jsons = req.body;
  var msj: any;
  const encoder = new TextEncoder();
  const jwtconstructor = new SignJWT( jsons );
  const jwt = await jwtconstructor
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("30m")
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
  res.send(`toma tu token compa : ${jwt}  tienes 30 minutos de uso `);
});
