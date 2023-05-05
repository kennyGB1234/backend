
port = 5000;

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json());
const rutasUsuarios = require("./routes/rutas-usuarios");
app.use("/api/usuarios", rutasUsuarios);

const rutasCoches = require("./routes/rutas-coches");
app.use("/api/coches", rutasCoches);



app.use((req, res) => {

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
