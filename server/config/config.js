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
const db_prod = 'mongodb+srv://hdoz:n6sCs9i934H7jUz2@hdozsec08-qqush.mongodb.net/cafe?retryWrites=true&w=majority';
process.env.DB_URL = (process.env.NODE_ENV === 'dev') ? db_local : db_prod;
