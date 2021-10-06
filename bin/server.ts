import app from '../src/app';
import * as database from '../src/database';

require('dotenv/config');
const port = process.env.PORT || '3000';

(async function () {
  await database.connect();
})();

app.listen(port, function () {
  console.log(`app listenning on port ${port}`);
});

