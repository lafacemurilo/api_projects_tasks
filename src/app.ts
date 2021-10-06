import express from 'express';
import projects from './routes/projects';

const app = express();
let countReq = 0;
//middlers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {

  countReq++;
  console.log(`[${req.method}] ${req.url} || Quantidade de requisições: ${countReq}`);
  return next();
});

//connection database
/*(async function () {
  await database.connect();
})();*/

//routes
app.use('/', projects);

export = app;
