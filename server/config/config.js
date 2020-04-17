// ====================== //
//       Enviroment       //
// ====================== //
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; 

// ====================== //
//         Puerto         //
// ====================== //
process.env.PORT = process.env.PORT || 3000;

// ====================== //
//           BD           //
// ====================== //
const db_local = 'mongodb://localhost:27019/cafe';
process.env.MONGO_URI = process.env.MONGO_URI || db_local;

// ====================== //
//       Expiración       //
// ====================== //
process.env.TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || 60 * 60 * 24 * 30;

// ====================== //
//          SEED          //
// ====================== //
process.env.SEED = process.env.SEED || 'EKuS_ImQEjpZfvYvUMNNfS0Av8JZTJQcZZjsjjGQRQE';

// ====================== //
//         Google         //
// ====================== //
process.env.CLIENT_ID = process.env.CLIENT_ID || '359497945607-r49b9c2vhsfa1ksm2k26p0p1ttv9qjn4.apps.googleusercontent.com';
