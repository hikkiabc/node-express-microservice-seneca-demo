
// const Hapi = require('hapi');
// const Seneca = require('seneca');
// const SenecaWeb = require('seneca-web');

// const config = {
//   adapter: require('seneca-web-adapter-hapi'),
//   context: (() => {
//     const server = new Hapi.Server();
//     server.connection({
//       port: 3000
//     });

//     server.route({
//       path: '/routes',
//       method: 'get',
//       handler: (request, reply) => {
//         const routes = server.table()[0].table.map(route => {
//           return {
//             path: route.path,
//             method: route.method.toUpperCase(),
//             description: route.settings.description,
//             tags: route.settings.tags,
//             vhost: route.settings.vhost,
//             cors: route.settings.cors,
//             jsonp: route.settings.jsonp,
//           }
//         })
//         reply(routes)
//       }
//     });

//     return server;
//   })()
// };

// const seneca = Seneca()
//   .use(SenecaWeb, config)
//   .use('math')
//   .use('api')
//   .ready(() => {
//     const server = seneca.export('web/context')();
//     server.start(() => {
//       server.log('server started on: ' + server.info.uri);
//     });
//   });
var SenecaWeb = require('seneca-web')
var Express = require('express')
var Router = Express.Router
var context = new Router()

var senecaWebConfig = {
  context: context,
  adapter: require('seneca-web-adapter-express'),
  options: { parseBody: false } // so we can use body-parser
}

var app = Express()
  .use(require('body-parser').json())
  .use(context)
  .listen(3000)

var seneca = require('seneca')()
  .use(SenecaWeb, senecaWebConfig)
  .use('math')
  .use('api')
// .client({ type: 'tcp', pin: 'role:math' })3
seneca.act(
  'role:store,add:book', {
  data: {
    title: 'Action in Seneca',
    price: 9.99
  }
},
  console.log
)