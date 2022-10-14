//Server
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

//routes
import indexRoutes from '../routes/index.route';
import {
  notFoundErrorHandler,
  errorHandler,
} from '../middleware/apiErrorHandler';

//create express app
const app = express();

//import environment variables
dotenv.config();

app.use(cors());
//set json data limit to 50mb
app.use(
  express.json({
    limit: '50mb',
  }),
);

//urlencoded data parser
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
  }),
);

//set static folder location route
app.use('/scripts', express.static('node_modules/dat.gui/build/'));

//Routes
app.use('/', indexRoutes);

// Error Handler
app.use(notFoundErrorHandler);

app.use(errorHandler);

export default app;
