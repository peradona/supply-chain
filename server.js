// const express = require('express');
// const next = require('next');
//
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();
//
// app.prepare()
// .then(() => {
//   const server = express();
//   //
//   // server.get('/pictures/:address/show', (req, res) => {
//   //   return app.render(req, res, '/pictures/show', { address: req.params.address})
//   // });
//
//   server.get('*', (req, res) => {
//     // console.log(req);
//     return handle(req, res)
//   });
//
//   server.listen(3001, (err) => {
//     if (err) throw err
//     console.log('> Ready on http://localhost:3001')
//   })
// })
// .catch((ex) => {
//   console.error(ex.stack);
//   process.exit(1)
// })

const express = require('express');
const next = require('next');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
// const handle = app.getRequestHandler();
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  express()
      .use(handler) // <- this line is important
      .listen(3001)
})
    .catch((ex) => {
      console.error(ex.stack);
      process.exit(1)
    });