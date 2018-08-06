import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import router from './routes/route';

const app = express();

// const port = parseInt(process.env.PORT, 10) || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/api/v1', router);

app.all('*', (req, res) => res.status(404).send({
  status: 'error',
  messsage: 'Not found',
}));
// app.listen(port, () => console.log(`listening on ${port}`) );

export default app;
