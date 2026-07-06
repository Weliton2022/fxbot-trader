require("dotenv").config();

console.log("===== FXBOT CORE =====");
console.log("PAT carregado:", process.env.DERIV_API_TOKEN ? "SIM" : "NÃO");
console.log("APP ID carregado:", process.env.DERIV_APP_ID ? "SIM" : "NÃO");

console.log("Tamanho do PAT:", process.env.DERIV_API_TOKEN?.length || 0);
console.log("APP ID:", process.env.DERIV_APP_ID);