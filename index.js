
port = 5000;
// index.js
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// const corsOptions = {
// 	origin: 'http://localhost:3000',
// 	optionsSuccessStatus: 200,
// };

app.use(cors());
app.use(express.json());
const rutasUsuarios = require("./routes/rutas-usuarios");
app.use("/api/usuarios", rutasUsuarios);

const rutasCoches = require("./routes/rutas-coches");
app.use("/api/coches", rutasCoches);



app.use((req, res) => {
  // Middleware que se ejecuta cuando el servidor no tiene la ruta que se ha enviado desde el cliente
  res.status(404);
  res.json({
    mensaje: "Información no encontrada",
  });
});


mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    app.listen(port, () => console.log(`Escuchando en el puerto: ${port}`));
  })
  .catch((error) => console.log(error));
