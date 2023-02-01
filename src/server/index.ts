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

connection.connect((err: any) => {
  if (err) throw err;
  console.log('mysql connected successfully.');
  app.listen(PORT, async () => {
    logger.info(`Server running at ${PORT}.`);
  });
});

process.on('SIGINT', function () {
  console.log('Caught interrupt signal');
  process.kill(process.pid);
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down...');
  process.exit(0);
});
process.on('beforeExit', async function () {
  console.log('BeforeExit');
  process.exit(0);
});
