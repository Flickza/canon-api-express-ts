import app from './config/express';
import logger from './config/logger';
import mysql from 'mysql';

const PORT = process.env.PORT || 5000;
export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('mysql connected successfully.');
  app.listen(PORT, () => {
    logger.info(`Server running at ${PORT}.`);
  });
});

process.on('SIGINT', function () {
  console.log('Caught interrupt signal');
  process.kill(process.pid);
  process.exit();
});

process.on('beforeExit', function () {
  console.log('BeforeExit');
  process.exit();
});
