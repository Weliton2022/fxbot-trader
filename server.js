require("dotenv").config();

const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

// ==============================
// APP
// ==============================

const app = express();

console.log("");
console.log("1️⃣ server.js carregado.");

process.on("exit", (code) => {

    console.log("");
    console.log("==================================");
    console.log("🚨 PROCESS EXIT");
    console.log(`Code: ${code}`);
    console.log("==================================");
    console.log("");

});

process.on("beforeExit", (code) => {

    console.log("");
    console.log("==================================");
    console.log("⚠ BEFORE EXIT");
    console.log(`Code: ${code}`);
    console.log("==================================");
    console.log("");

});

process.on("uncaughtException", (err) => {

    console.log("");
    console.log("==================================");
    console.log("❌ UNCAUGHT EXCEPTION");
    console.log(err);
    console.log("==================================");
    console.log("");

});

process.on("unhandledRejection", (err) => {

    console.log("");
    console.log("==================================");
    console.log("❌ UNHANDLED REJECTION");
    console.log(err);
    console.log("==================================");
    console.log("");

});

// ==============================
// ROTAS
// ==============================

const dashboardRoutes = require("./routes/dashboardRoutes");
const dashboardApiRoutes = require("./routes/dashboardApiRoutes");
const historyApiRoutes = require("./routes/historyApiRoutes");
const sessionApiRoutes = require("./routes/sessionApiRoutes");
const analyticsApiRoutes = require("./routes/analyticsApiRoutes");
const performanceApiRoutes = require("./routes/performanceApiRoutes");
const intelligenceRoutes = require("./routes/intelligenceRoutes");
const riskManagerRoutes = require("./routes/riskManagerRoutes");
const platformApiRoutes = require("./routes/platformApiRoutes");
const testRoutes = require("./routes/testRoutes");

// ==============================
// VIEW ENGINE
// ==============================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layouts/main");

// ==============================
// MIDDLEWARES
// ==============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================
// ARQUIVOS PÚBLICOS
// ==============================

app.use(express.static(path.join(__dirname, "public")));

// ==============================
// ROTAS
// ==============================

app.use("/", dashboardRoutes);

// APIs
app.use("/api/dashboard", dashboardApiRoutes);
app.use("/api/history", historyApiRoutes);
app.use("/api/session", sessionApiRoutes);
app.use("/api/analytics", analyticsApiRoutes);
app.use("/api/performance", performanceApiRoutes);
app.use("/api/intelligence", intelligenceRoutes);
app.use("/api/risk", riskManagerRoutes);
app.use("/api/platform", platformApiRoutes);

app.use("/test", testRoutes);

// ==============================
// STARTUP
// ==============================

const startup = require("./bootstrap/startup");

// ==============================
// SERVIDOR
// ==============================

const PORT = process.env.PORT || 3000;

console.log("2️⃣ Antes do app.listen()");

app.listen(PORT, async () => {

    console.log("");
    console.log("======================================");
    console.log("🚀 FXBOT PLATFORM");
    console.log("======================================");
    console.log(`🌐 Servidor iniciado`);
    console.log(`📍 http://localhost:${PORT}`);
    console.log("======================================");
    console.log("");

    try {

        console.log("3️⃣ Antes do startup()");

        await startup();

        console.log("");
        console.log("4️⃣ Startup finalizado.");
        console.log("");

    } catch (err) {

        console.log("");
        console.log("❌ ERRO NO STARTUP");
        console.log("--------------------------------------");
        console.error(err);
        console.log("");

    }

});

console.log("5️⃣ Final do server.js");