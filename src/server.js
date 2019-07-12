require('dotenv/config');
const app = require('./app');

app.listen(process.env.NODE_PORT, () =>
  console.log(`\n API: "Cartoligas API"
 Running on port: ${process.env.NODE_PORT}
 Environment: ${process.env.NODE_ENV}`)
);
