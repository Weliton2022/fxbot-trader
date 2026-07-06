require("dotenv").config();

const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

// Rotas
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layouts/main");

// Arquivos públicos
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.use("/", dashboardRoutes);

// Porta
const PORT = process.env.PORT || 3000;

const startup = require("./bootstrap/startup");

app.listen(PORT, async () => {

    console.log(`🚀 FXBOT Trader iniciado na porta ${PORT}`);

    await startup();

});